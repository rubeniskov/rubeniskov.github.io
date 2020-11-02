const sitemap = require("sitemap");
const fs = require("fs");
const path = require("path");
module.exports = (
  publicdir,
  locations = [],
  { cwd = process.cwd(), hostname, ...restOptions } = {}
) => {
  const { homepage } = require(path.resolve(cwd, "package.json"));
  const stream = new sitemap.SitemapStream({
    ...restOptions,
    hostname: hostname || homepage,
  });

  stream.pipe(fs.createWriteStream(path.resolve(publicdir, "sitemap.xml")));

  locations.forEach((location) => {
    stream.write(location);
  });

  stream.end();

  return stream;
};
