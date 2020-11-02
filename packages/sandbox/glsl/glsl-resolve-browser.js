import get from "./get";

export const urlJoin = (...args) => args.join("/").replace(/\/+/, "/");

const defaultExts = [
  ".glsl",
  ".vert",
  ".frag",
  ".geom",
  ".vs",
  ".fs",
  ".gs",
  ".vsh",
  ".fsh",
  ".gsh",
  ".vshader",
  ".fshader",
  ".gshader",
];

const formatUrl = (base, ...args) => new URL(args.join("/").replace(/\/+/, "/"), base);
const matchExt = (pkgName, exts) => new RegExp(`(${exts.join("|")})$`).test(pkgName);

const parseOptions = (opts) => ({
  url: "https://unpkg.com/",
  // url: "https://cdn.jsdelivr.net/npm/",
  get: get,
  exts: defaultExts,
  type: "HEAD",
  ...opts,
});

const resolve = (pkgName, opts, done) => {
  const { url, get, exts, type } = parseOptions(opts);
  let i = 0 - matchExt(pkgName, exts);
  const next = () => {
    if (i < exts.length) {
      const urlPath = formatUrl(url, pkgName + (exts[i++] || "")) + "";
      get(urlPath, { type }, (err) => {
        if (err && /^404/.test(err.message)) {
          next();
        } else {
          done(null, urlPath);
        }
      });
    } else {
      done(new Error(`${pkgName} Not found`));
    }
  };

  next();
};

resolve.sync = (pkgName, opts) => {
  const { url, get, exts, type } = parseOptions(opts);
  let i = 0 - matchExt(pkgName, exts);
  do {
    try {
      const urlPath = formatUrl(url, pkgName + (exts[i++] || "")) + "";
      get(urlPath, { type });
      return urlPath;
    } catch (err) {
      if (!/^404/.test(err.message)) {
        throw new Error(`${pkgName} Not found`);
      }
    }
  } while (i < exts.length);
};

export default resolve;

export const sync = resolve.sync;

export const createCachedResolver = (cache = {}) => {
  return (pkgName, opts, done) => {
    if (cache[pkgName]) {
      if (!done) {
        return cache[pkgName];
      }
      done(null, cache[pkgName]);
    }

    if (!done) {
      cache[pkgName] = resolve(pkgName, opts);
      return cache[pkgName];
    }

    resolve(pkgName, opts, (err, resolved) => {
      if (err) return done(err);
      cache[pkgName] = resolved;
      done(null, resolved);
    });
  };
};

/**
 * TODO LIST
 * - Check firts package.json to determine if the pacakge exists
 * - Cache with compression lmza https://github.com/LZMA-JS/LZMA-JS
 */
