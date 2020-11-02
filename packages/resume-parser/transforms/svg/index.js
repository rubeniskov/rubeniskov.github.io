const Readable = require("readable-stream/readable");
const SVG = require("svg.js");
const window = require("svgdom")
  .setFontDir(__dirname + "/fonts")
  .setFontFamilyMappings({
    "Roboto-Bold": "Roboto-Bold.ttf",
    "Roboto-Thin": "Roboto-Thin.ttf",
    "Roboto-Regular": "Roboto-Regular.ttf",
  })
  .preloadFonts();

const document = window.document;

class SVGTransform extends Readable {
  constructor(fn) {
    super();

    fn && fn((this._draw = SVG(window)(document.documentElement)));

    // this.once('finish', () => {
    //     console.log('yeah');
    // });
  }

  _read(n) {}

  commit() {
    this.push(this._draw.svg());
  }
}

module.exports = (opts) => new SVGTransform(opts);

//
//
// require('fs').createReadStream('../../index.json').pipe(module.exports()).on('data', data => {
//     console.log(data);
// });

// const window   = require('svgdom')
// const SVG      = require('svg.js')(window)
// const document = window.document
//
// // create svg.js instance
// const draw = SVG(document.documentElement)
//
// // use svg.js as normal
// draw.rect(100,100).fill('yellow').move(50,50)
//
// // get your svg as string
// console.log(draw.svg())
// // or
// // console.log(draw.node.outerHtml);
