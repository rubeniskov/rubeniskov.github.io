const json = require("@rubeniskov/resume-transform-json");

const paths = [
  "personal_info",
  "academic_experience.*",
  "work_experience.*",
  "projects.*",
  "recomendations.*",
  "awards.*",
];

module.exports = (opts) => json({ paths });
