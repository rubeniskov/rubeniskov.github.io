const JSONStream = require("JSONStream");
const through = require("through2");
const Duplex = require("readable-stream/duplex");

class JSONTransform extends Duplex {
  constructor(opts = { paths: [] }) {
    super({ readableObjectMode: true });
    this._writing = false;
    this._piping = false;
    this._outbound = through.obj();
    this._flows = opts.paths.map((path, idx, arr) => {
      let transform = JSONStream.parse(path);
      transform.pipe(this._outbound, { end: false });
      transform.path = path;

      process.nextTick(() => {
        this.emit("path", transform);
      });

      return transform;
    });

    // this.once('finish', function () { console.log('YEAH') });
  }

  pipe(dest, opts) {
    console.log("PIPE");
    this._piping = true;
    super.pipe(dest, opts);
  }

  _write(buf, enc, next) {
    if (!this._writing && !this._piping) {
      this._piping = true;
      this.resume();
    }

    this._flows.reduce(
      (done, stream, idx) => () => {
        if (stream.write(buf)) {
          return done();
        }
        stream.once("drain", done);
      },
      next
    )();
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
}

module.exports = (opts) => new JSONTransform(opts);
