const htmlWebpackPlugin = require("html-webpack-plugin");
const { parse } = require("node-html-parser");

const processIndex = async (compiler, compilation, locations, source) => {
  const resolvedLocations = await (typeof locations === "function" ? locations(source) : locations);
  const { RawSource } =
    (compiler.webpack && compiler.webpack.sources) || require("webpack-sources");

  const ast = parse(source);

  // Inject static content
  ast
    .querySelector("body")
    .appendChild("<noscript>You need to enable JavaScript to run this app.</noscript>");

  resolvedLocations.forEach((location) => {
    const filename = `${location}.html`;
    compilation.emitAsset(filename, new RawSource(ast.toString()));
  });
};

const getHtmlWebpackPluginHook = (compilation) =>
  compilation.hooks.htmlWebpackPluginAfterHtmlProcessing ||
  htmlWebpackPlugin.getHooks(compilation).beforeEmit;

class RenderStaticRoutes {
  constructor(options) {
    const { locations = [], test = /\.html(\?.*)?$/i, parallel = true } = { ...options };

    this.options = {
      test,
      locations,
      sitemap: true,
      parallel,
    };
  }

  apply(compiler) {
    const { locations } = this.options;
    const pluginName = this.constructor.name;
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // Hook html index to get as a template for processing
      getHtmlWebpackPluginHook(compilation).tapAsync(pluginName, (htmlPluginData, callback) => {
        processIndex(compiler, compilation, locations, htmlPluginData.html).then(
          () => {
            callback(null, htmlPluginData);
          },
          (err) => {
            compilation.errors.push(err);
          }
        );
      });
    });
  }
}

module.exports = RenderStaticRoutes;

/*
references:
https://www.digitalocean.com/community/tutorials/react-react-router-ssr
https://github.com/qimingweng/static-render-webpack-plugin/blob/master/index.js
https://www.npmjs.com/package/eval
https://medium.com/@foxhound87/server-side-rendering-with-react-router-we-must-react-ep-04-ad03b6b9e05d
https://github.com/webpack-contrib/html-minimizer-webpack-plugin/blob/master/src/index.js
https://github.com/ElemeFE/page-skeleton-webpack-plugin
*/
