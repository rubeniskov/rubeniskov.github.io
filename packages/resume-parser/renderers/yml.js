const ymlParser = require("yaml-js");

module.exports = () => {
  console.log("yeah");
  return ymlParser.dump();
};
