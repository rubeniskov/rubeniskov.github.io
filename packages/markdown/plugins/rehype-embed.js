/* eslint-disable default-case */
var visit = require("unist-util-visit");

module.exports = attacher;

function attacher(options) {
  function transformer(tree) {
    visit(tree, "element", visitor);
  }
  function visitor(node, index, parent) {
    if (node.tagName !== "a") {
      return;
    }
    const regexp = /https?:\/\/(?:w{3}\.)?(youtube)\.com\/watch\?v=([\w]+)/;
    const [, platform, id] = regexp.exec(node.properties.href) || [];

    if (!id) return;

    switch (platform) {
      case "youtube":
        parent.tagName = "div";
        parent.properties = {
          style: "position:relative;padding-top:56%;width:100%;",
        };

        node.tagName = "iframe";
        node.properties = {
          width: "100%",
          height: "100%",
          style: "position:absolute;top:0;left:0;right:0;bottom:0;",
          allowfullscreen: true,
          frameborder: 0,
          src: `https://www.youtube.com/embed/${id}`,
        };
    }
  }
  return transformer;
}
