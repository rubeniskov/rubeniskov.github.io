const createCacheBackend = (check, fallback, creator) => (check() ? creator : fallback);

const createMemoryCache = () => {
  const cache = {};
  return {
    set: (key, value) => {
      cache[key] = value;
    },
    get: (key) => cache[key],
    remove: (key) => {
      delete cache[key];
    },
    clear: () =>
      Object.keys(cache).forEach((key) => {
        delete cache[key];
      }),
  };
};

const createLocalStorageCache = createCacheBackend(
  () => global.localStorage,
  createMemoryCache,
  (opts) => {
    const { prefix = "" } = { ...opts };
    const cache = global.localStorage;
    return {
      set: (key, value) => {
        cache.setItem(`${prefix}${key}`, value);
      },
      get: (key) => cache.getItem(`${prefix}${key}`),
      remove: (key) => {
        cache.removeItem(`${prefix}${key}`);
      },
      clear: () => {
        cache.clear();
      },
    };
  }
);

export const wrapCache = (async, sync = async.sync) => {
  console.log("wrapCache");
  return (cache) => {
    const _cache = cache || createLocalStorageCache();
    return (key, ...args) => {
      let done;
      const cached = _cache.get(key);
      if (typeof args[args.length - 1] === "function") {
        done = args.pop();
      }

      if (cached) {
        if (!done) {
          return cached;
        }
        process.nextTick(() => done(null, cached));
      } else {
        if (!done) {
          const result = sync(key, ...args);
          _cache.set(key, result);
          return result;
        }

        async(key, ...args, (err, result) => {
          if (err) return done(err);
          _cache.set(key, result, done);
        });
      }
    };
  };
};
