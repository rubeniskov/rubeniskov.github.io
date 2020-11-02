const glob = require("glob/sync");
const fs = require("fs");
const path = require("path");

const getBlogPostsFiles = ({ pattern = "blog/**/*.md", ...restOptions } = {}) => {
  return glob(pattern, {
    ...restOptions,
  });
};

const mapRouteLocations = (locations) => {
  return locations.map((v) => v.split(".").slice(0, -1).join("."));
};

const getBlogPosts = (publicdir = "public", cwd = process.cwd()) => {
  const files = getBlogPostsFiles({
    cwd: path.resolve(cwd, publicdir),
  });
  return files.map((filename) => {
    const absolute = path.resolve(cwd, publicdir, filename);
    const { mtime, birthtime } = fs.statSync(absolute);
    const content = fs.readFileSync(absolute, { encoding: "utf8" });
    const title = content.split(/\n+/).filter(Boolean)[0];

    return {
      username: "rubeniskov",
      created: new Date(birthtime).getTime(),
      modified: new Date(mtime).getTime(),
      title: /^#\s+([a-z0-9\s]+)/i.test(title)
        ? title.replace(/^#\s+/, "")
        : path.basename(filename, ".md").replace(/[-_]/g, " "),
      words: (content.match(/[\w]+/g) || []).length,
      url: "/" + filename.split(".").slice(0, -1).join("."),
    };
  });
};

module.exports = {
  getBlogPosts,
  mapRouteLocations,
  getBlogPostsFiles,
};
