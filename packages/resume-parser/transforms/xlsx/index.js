var Duplex = require("readable-stream").Duplex;
var through = require("through2");
var Excel = require("exceljs");
var JSONStream = require("JSONStream");

class XLSXTransform extends Duplex {
  constructor(options = { sheets: [] }) {
    super();
    var self = this;

    this._inbound = through();
    this._outbound = through();
    this._writing = false;
    this._piping = false;
    this._workbook = new Excel.stream.xlsx.WorkbookWriter({
      useStyles: true,
      stream: this._outbound,
    });

    options.sheets
      .map((sheet) => {
        var rowIndex = 1;
        var worksheet = this._workbook.addWorksheet(sheet.name);

        worksheet.rowCount = 0;
        worksheet.columns = sheet.columns;

        if (sheet.transform) sheet.transform(worksheet, rowIndex++, sheet.columns);

        return this._inbound.pipe(JSONStream.parse(`${sheet.key}`)).pipe(
          through.obj(
            (row, enc, done) => {
              worksheet.addRow(
                sheet.columns.map((column, index) =>
                  column.transform
                    ? column.transform(row[column.key], rowIndex, index, row)
                    : row[column.key]
                )
              );
              if (sheet.transform) sheet.transform(worksheet, rowIndex++, sheet.columns);
              done();
            },
            (done) => {
              worksheet.commit();
              done();
            }
          )
        );
      })
      .map((stream, index, streams) =>
        stream.on("finish", () => {
          if (--streams.length === 0) {
            this._workbook.commit();
          }
        })
      );

    this.once("finish", () => {
      this._inbound.end();
    });
  }
  pipe(...args) {
    this._piping = true;
    super.pipe(...args);
  }

  _read(n) {
    var row;
    var self = this;
    var buf,
      read = 0;
    var s = this._outbound;
    while ((row = s.read()) !== null) {
      this.push(row);
      read++;
    }
    if (read === 0) {
      s.once("readable", function () {
        self._read(n);
      });
    }
  }

  _write(buf, enc, next) {
    if (!this._writing && !this._piping) {
      this._piping = true;
      this.resume();
    }
    return this._inbound._write(buf, enc, next);
  }
}

module.exports = (opts) => new XLSXTransform(opts);
