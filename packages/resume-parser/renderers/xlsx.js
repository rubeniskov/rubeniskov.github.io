const xlsx = require("@rubeniskov/resume-transform-xlsx");
const nationalities = { ES: "Spanish" };

const transformHyperLink = (value) => ({ text: value, hyperlink: value });
const transformRange = (value) => (value && value.join && value.join(" - ")) || value;

const transformArray = (value) => (value && value.join && value.join("\n")) || value;
const transformList = (value) =>
  value && value.join && value.map((value) => `- ${value}`).join("\n");
const transformObject = (value) =>
  transformArray(Object.keys(value || {}).map((key) => `${key}-> ${value[key]}`));

const transformStyle = (sheet, rowIndex, columns) => {
  var row = sheet.getRow(rowIndex);

  row.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: rowIndex === 1 ? "FF3B3D39" : rowIndex % 2 === 0 ? "FFFFFFFF" : "FFE8AA68",
    },
  };

  row.font = {
    name: "Helvetica",
    color: {
      argb: rowIndex === 1 ? "FFEFEFEF" : "FF383936",
    },
    family: 4,
  };

  row.alignment = {
    vertical: "top",
    wrapText: true,
  };

  if (rowIndex === 1) {
    columns.map(
      (column, index) =>
        index % 2 === 0 &&
        (row.getCell(index + 1).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "FF4C4E50",
          },
        })
    );
  }
};

const sheets = [
  {
    name: "Personal Information",
    key: "personal_info",
    transform: transformStyle,
    columns: [
      {
        header: "FULL NAME",
        key: "full_name",
        width: 25,
        transform: (value, rowIndex, colIndex, rowData) =>
          `${rowData.fisrt_name} ${rowData.last_name} (${rowData.nickname})`,
      },
      {
        header: "NATIONALITY",
        key: "nationality",
        width: 15,
        transform: (value, rowIndex, colIndex, rowData) => nationalities[value],
      },
      {
        header: "WEBSITE",
        key: "website",
        width: 40,
        transform: transformHyperLink,
      },
      {
        header: "CONTACT",
        key: "contact",
        width: 40,
        transform: transformObject,
      },
      {
        header: "BIO",
        key: "bio",
        width: 80,
      },
    ],
  },
  {
    name: "Academic Experience",
    key: "academic_experience.*",
    transform: transformStyle,
    columns: [
      {
        header: "TYPE",
        key: "type",
        width: 15,
      },
      {
        header: "DATES",
        key: "dates",
        width: 12,
        transform: transformRange,
      },
      {
        header: "NAME",
        key: "name",
        width: 50,
      },
      {
        header: "INSTITUTION",
        key: "institution",
        width: 30,
      },
      {
        header: "WEBSITE",
        key: "website",
        width: 40,
      },
    ],
  },
  {
    name: "Work Experience",
    key: "work_experience.*",
    transform: transformStyle,
    height: 100,
    columns: [
      {
        header: "COMPANY",
        key: "company",
        width: 20,
      },
      {
        header: "SECTOR",
        key: "sector",
        width: 20,
      },
      {
        header: "LOCATION",
        key: "location",
        width: 15,
      },
      {
        header: "WEBSITE",
        key: "website",
        width: 35,
      },
      {
        header: "DATES",
        key: "dates",
        width: 12,
        transform: transformRange,
      },
      {
        header: "OCCUPATION",
        key: "occupation",
        width: 15,
        transform: transformList,
      },
      {
        header: "TASKS",
        key: "tasks",
        width: 40,
        transform: transformList,
      },
      {
        header: "DESCRIPTION",
        key: "description",
        width: 100,
      },
    ],
  },
  {
    name: "Projects",
    key: "projects.*",
    transform: transformStyle,
    columns: [
      {
        header: "NAME",
        key: "name",
        width: 30,
      },
      {
        header: "DATES",
        key: "dates",
        width: 12,
        transform: transformRange,
      },
      {
        header: "WEBSITE",
        key: "website",
        width: 40,
      },
      {
        header: "CONTRIBUTORS",
        key: "contributors",
        width: 40,
        transform: transformList,
      },
      {
        header: "TECHNOLOGIES",
        key: "technologies",
        width: 40,
        transform: transformList,
      },
      {
        header: "DESCRIPTION",
        key: "description",
        width: 100,
      },
    ],
  },
  {
    name: "Recomendations",
    key: "recomendations.*",
    transform: transformStyle,
    columns: [
      {
        header: "WRITER",
        key: "writer",
        width: 30,
      },
      {
        header: "OCCUPATION",
        key: "occupation",
        width: 40,
      },
      {
        header: "CONTACT",
        key: "contact",
        width: 60,
        transform: (value) => ({ text: value[0], hyperlink: value[0] }),
      },
      {
        header: "DATE",
        key: "date",
        width: 16,
      },
      {
        header: "RECOMENDATION",
        key: "recomendation",
        width: 100,
      },
    ],
  },
  {
    name: "Awards",
    key: "awards.*",
    transform: transformStyle,
    columns: [
      {
        header: "NAME",
        key: "name",
        width: 30,
      },
      {
        header: "DATE",
        key: "date",
        width: 8,
      },
      {
        header: "WEBSITE",
        key: "website",
        width: 60,
        transform: transformHyperLink,
      },
      {
        header: "DESCRIPTION",
        key: "description",
        width: 100,
      },
    ],
  },
];

module.exports = () => {
  return xlsx({ sheets });
};
