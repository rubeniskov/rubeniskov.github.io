const through = require("through2");
const ymlParser = require("yaml-js");

module.exports = () => {
  return through((chunk, enc, done) => {
    done(null, JSON.stringify(ymlParser.load(chunk)));
  });
};
