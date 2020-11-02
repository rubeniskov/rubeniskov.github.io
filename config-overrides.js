const webpack = require("webpack");
const { getBlogPosts, mapRouteLocations } = require("./scripts/getBlogPosts");
const RenderStaticRouter = require("@rubeniskov/webpack-render-static-routes-plugin");
const createSitemap = require("./scripts/createSitemap");
const updateManifest = require("./scripts/updateManifest");

// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const override = (config, env) => {
  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    loader: "ify-loader",
  });

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.MANIFEST_URL": `"/manifest.json"`,
    })
  );

  const posts = getBlogPosts();

  updateManifest(posts);

  if (env === "production") {
    const locations = [
      "/about-me",
      ...posts.map(({ url }) => url.split(".").slice(0, -1).join(".")),
    ];

    config.plugins.push(
      new RenderStaticRouter({
        locations: locations,
      })
    );

    createSitemap("public", locations);
  }
  return config;
};

module.exports = override;
