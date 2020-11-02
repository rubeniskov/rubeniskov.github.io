import glslifyDeps from "./glslify-deps";
const glslifyBundle = require("glslify-bundle");

const glslify = (opts) => {
  const depper = glslifyDeps(opts);
  return (source, cb) => {
    depper.inline(source, (err, deps) => {
      if (err) return cb(err);
      cb(null, String(glslifyBundle(deps)));
    });
  };
};

export default glslify;
