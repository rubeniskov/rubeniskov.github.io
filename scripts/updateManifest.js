const fs = require("fs");
const path = require("path");

const updateManifest = (posts, { publicdir = "public", cwd = process.cwd() } = {}) => {
  const manifest = path.resolve(cwd, publicdir, "manifest.json");
  fs.writeFileSync(
    manifest,
    JSON.stringify(
      {
        ...require(manifest),
        blog: {
          posts,
        },
      },
      null,
      4
    ),
    { encoding: "utf8" }
  );
};

module.exports = updateManifest;
