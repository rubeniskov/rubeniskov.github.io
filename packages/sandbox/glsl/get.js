const makeRequest = () => {
  if (global.XMLHttpRequest) {
    // Mozilla, Safari, ...
    return new global.XMLHttpRequest();
  } else if (global.ActiveXObject) {
    // IE
    try {
      return new global.ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        return new global.ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }
  throw new Error("Giving up :( Cannot create an XMLHTTP instance");
};

const get = (url, opts, cb) => {
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }

  const { type = "GET", async = !!cb } = { ...opts };

  let xhr = makeRequest();

  xhr.open(type, url, async);
  xhr.setRequestHeader("Cache-Control", "no-cache");

  if (!async) {
    xhr.send();
    if (xhr.status < 400) {
      return xhr.responseText;
    } else {
      throw new Error(`${xhr.status} - ${xhr.statusText}`);
    }
  }

  xhr.onload = () => {
    if (xhr.status < 400) {
      cb(null, xhr.responseText);
    } else {
      cb(new Error(`${xhr.status} - ${xhr.statusText}`));
    }
  };
  xhr.onerror = () => cb(new Error(`${xhr.status} - ${xhr.statusText}`));
  xhr.send();
};

get.sync = (url, opts) => get(url, { async: false, ...opts });

export default get;
