export const urlResolve = (...args) => args.join("/").replace(/\/+/, "/");

export const excludeItems = (arr, ex) => arr.filter((v) => !ex.includes(v));
