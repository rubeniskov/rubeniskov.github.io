/* eslint-disable */
import Depper from 'glslify-deps/depper'
import { wrapCache } from './utils'
import glslResolve from './glsl-resolve-browser'
import get from './get'

class DepperBrowser extends Depper {
  constructor(opts) {
    super({
      ...opts,
      async: true,
      readFile: wrapCache(get)(),
      resolve: wrapCache(glslResolve)(),
      transformRequire: (filename, done) => {
        console.log('transformRequire', filename, done);
      }
    })
  }

  inline(source, done) {
    this._deps = [];
    this._i = 0;
    return super.inline(source, null, done);
  }

  getTransformsForFile(filename, done) {
    console.log(filename);
    // this.readFile('')
    done(null, []);
    return [];
  }
}


const depper = (opts) => {
  return new DepperBrowser(opts);
}
export default depper
