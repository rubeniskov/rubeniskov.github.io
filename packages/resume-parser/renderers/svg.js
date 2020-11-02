const json = require("./json");
const duplexer = require("duplexer2");
const svg = require("@rubeniskov/resume-transform-svg");

// 7.898,5 5.103
const getBBox = (elem) => {
    var props = { w: 0, h: 0, x2: 0, y2: 0, cx: 0, cy: 0, x: 0, y: 0, width: 0, height: 0 };
    try {
      props = elem.bbox();
    } catch (ex) {}

    if (elem.children && (elem = elem.children())) {
      return elem.reduce((props, elem) => {
        var cprops = getBBox(elem);
        return {
          w: Math.max(props.w, cprops.w),
          h: Math.max(props.h, cprops.h),
          width: Math.max(props.width, cprops.width),
          height: Math.max(props.height, cprops.height),
          x: Math.min(props.x, cprops.x),
          y: Math.min(props.y, cprops.y),
          x2: Math.max(props.x2, cprops.x2),
          y2: Math.max(props.y2, cprops.y2),
          cx: Math.max(props.cx, cprops.cx),
          cy: Math.max(props.cy, cprops.cy),
        };
      }, props);
    }
    return props;
  },
  drawGitHubIcon = (draw) =>
    draw.path(
      "M22.529,11.267c0,2.454-0.716,4.659-2.149,6.622c-1.434,1.962-3.284,3.316-5.552,4.07 c-0.266,0.047-0.457,0.014-0.578-0.103c-0.125-0.116-0.186-0.265-0.186-0.441V18.32c0-0.948-0.254-1.645-0.762-2.082 c0.557-0.06,1.058-0.146,1.504-0.266c0.443-0.117,0.904-0.306,1.379-0.574c0.476-0.26,0.87-0.584,1.186-0.973 c0.319-0.386,0.578-0.9,0.779-1.541c0.2-0.635,0.299-1.373,0.299-2.206c0-1.183-0.385-2.19-1.156-3.021 c0.36-0.888,0.321-1.884-0.117-2.99c-0.274-0.089-0.669-0.032-1.188,0.159c-0.52,0.197-0.968,0.41-1.351,0.646L14.08,5.824 c-0.908-0.252-1.848-0.384-2.816-0.384c-0.967,0-1.906,0.132-2.814,0.384C8.294,5.715,8.084,5.586,7.826,5.43 C7.565,5.271,7.156,5.084,6.6,4.865C6.041,4.644,5.625,4.578,5.338,4.667C4.909,5.773,4.876,6.77,5.236,7.657 c-0.772,0.831-1.159,1.839-1.159,3.021c0,0.833,0.1,1.564,0.301,2.199c0.2,0.637,0.456,1.149,0.77,1.541 c0.312,0.392,0.705,0.72,1.182,0.979c0.475,0.269,0.933,0.457,1.377,0.574c0.445,0.119,0.947,0.206,1.502,0.266 c-0.391,0.352-0.63,0.855-0.719,1.512c-0.204,0.096-0.424,0.17-0.658,0.217c-0.234,0.051-0.514,0.076-0.834,0.076 c-0.324,0-0.646-0.106-0.961-0.315c-0.318-0.21-0.592-0.52-0.816-0.917c-0.186-0.314-0.422-0.568-0.709-0.765 c-0.289-0.194-0.53-0.312-0.727-0.351l-0.293-0.044c-0.205,0-0.347,0.022-0.424,0.065c-0.08,0.044-0.104,0.1-0.074,0.17 c0.03,0.067,0.074,0.137,0.133,0.205c0.056,0.068,0.12,0.126,0.19,0.174l0.101,0.076c0.215,0.098,0.429,0.281,0.638,0.555 c0.21,0.274,0.363,0.523,0.463,0.748l0.146,0.339c0.125,0.373,0.342,0.673,0.643,0.901c0.304,0.229,0.631,0.379,0.984,0.441 c0.351,0.061,0.69,0.096,1.018,0.104c0.328,0.006,0.6-0.012,0.814-0.053l0.34-0.057c0,0.371,0.002,0.803,0.006,1.305 c0.004,0.497,0.006,0.761,0.006,0.79c0,0.177-0.062,0.325-0.19,0.441c-0.126,0.116-0.323,0.149-0.585,0.103 c-2.271-0.754-4.12-2.108-5.552-4.07C0.716,15.926,0,13.721,0,11.267c0-2.044,0.504-3.929,1.51-5.653 c1.009-1.729,2.375-3.093,4.102-4.101C7.336,0.505,9.221,0,11.264,0c2.045,0,3.93,0.505,5.654,1.513 c1.726,1.008,3.09,2.372,4.098,4.101C22.023,7.338,22.529,9.223,22.529,11.267z"
    ),
  drawCross = (draw, height = 100, width = 100, tickness = 20) => {
    var tt = tickness * 0.5,
      stx = height * 0.5,
      sty = width * 0.5;

    return draw.polygon(
      [
        [0, sty - tt],
        [stx - tt, sty - tt],
        [stx - tt, 0],
        [stx + tt, 0],
        [stx + tt, sty - tt],
        [width, sty - tt],
        [width, sty + tt],
        [stx + tt, sty + tt],
        [stx + tt, height],
        [stx - tt, height],
        [stx - tt, sty + tt],
        [0, sty + tt],
      ]
        .map((s) => s.join(","))
        .join(" ")
    );
  },
  drawHeader = (draw, title) => {
    const header = draw.group();
    drawCross(header, 25, 25, 5).fill(primaryColor).move(0, 2.5);
    header
      .text(title)
      .font({
        family: "Roboto-Thin",
        size: 25,
      })
      .move(40, 0);

    return header;
  },
  drawSection = (draw, title, cb) => {
    const gr = draw.group();
    drawHeader(gr, title);
    if (cb) {
      var ct = gr.group();
      (cb(ct) || ct).move(0, 50);
    }
    return gr;
  },
  drawLabel = (draw, text) => {
    var gr = draw.group();
    var label = gr
      .text(text)
      .font({
        family: "Roboto-Regular",
        size: 12,
      })
      .fill("#FFFFFF")
      .move(2, 2);
    var bbox = label.bbox();

    gr.rect(bbox.w + 10, bbox.h + 5).fill(primaryColor);
    gr.add(label);
    return gr;
  },
  drawListItem = (draw, icon, title, description) => {
    if (typeof icon === "string") {
      title = icon;
      description = title;
    }

    const item = draw.group();
    let pad = 0;

    if (icon) {
      item.add(icon.move(0, 5));
      pad = getBBox(icon).w + 10;
    }

    item
      .text(title)
      .font({
        family: "Roboto-Thin",
        size: description ? 15 : 18,
      })
      .move(pad, 0);

    if (description) {
      item
        .text(description)
        .font({
          family: "Roboto-Thin",
          size: 12,
        })
        .move(pad, 20);
    }

    return item;
  };

const primaryColor = "#c68445";
module.exports = () => {
  // const viewport 2480, 3508
  const jsonStream = json(),
    svgStream = svg((draw) => {
      // A4 300PPI
      draw.viewbox(0, 0, 2480 * 0.5, 3508 * 0.5);

      jsonStream.on("path", (stream) => {
        switch (stream.path) {
          case "personal_info": {
            stream.on("data", (data) => {
              // console.error(data.social_network);
              draw.rect(2480, 50).fill(primaryColor);
              draw
                .text(data.social_network.linkedin.url)
                .font({
                  family: "Roboto-Thin",
                  size: 25,
                })
                .move(50, 0)
                .fill("#FFF");
              draw
                .text(data.social_network.github.url)
                .font({
                  family: "Roboto-Thin",
                  size: 25,
                })
                .move(350, 0)
                .fill("#FFF");
              draw
                .text(data.social_network.twitter.username)
                .font({
                  family: "Roboto-Thin",
                  size: 25,
                })
                .move(550, 0)
                .fill("#FFF");
              drawGitHubIcon(draw).fill("#FFF");

              drawSection(draw, "Personal Information", (draw) => {
                let idx = 0;
                drawListItem(draw, null, data.nationality).move(0, idx++ * 35);
                drawListItem(draw, null, data.contact.email).move(0, idx++ * 35);
              }).move(550, 100);
            });
            break;
          }
          case "academic_experience.*": {
            drawSection(draw, "Academic Experience", (draw) => {
              let idx = 0;
              stream.on("data", (data) => {
                drawListItem(
                  draw,
                  drawLabel(draw, data.type.substring(0, 3)),
                  data.name,
                  data.institution
                ).move(0, idx++ * 35);
              });
            }).move(0, 100);
            break;
          }
          case "work_experience.*": {
            drawSection(draw, "Work Experience", (draw) => {
              let idx = 0;
              stream.on("data", (data) => {
                var desc = data.description;
                var sdiv = 150;
                var divs = Math.ceil(desc.length / sdiv);

                draw
                  .text((add) => {
                    for (let i = 0; i < divs; i += sdiv) {
                      add
                        .tspan(desc.substring(i * sdiv, i * sdiv + sdiv))
                        .newLine()
                        .dy(20);
                    }
                  })
                  .font({
                    family: "Roboto-Thin",
                    size: 12,
                  })
                  .move((idx % 3) * 400, ~~(idx / 3) * 500);
                idx++;
              });
            }).move(0, 1200);
            break;
          }
          case "awards.*": {
            drawSection(draw, "Awards", (draw) => {
              let idx = 0;
              stream.on("data", (data) => {
                // drawListItem(draw, drawLabel(draw, data.type.substring(0, 3)), data.name, data.institution).move(0, idx++ * 35);
              });
            }).move(0, 550);
            break;
          }
          default:
        }
      });
    });

  jsonStream.on("finish", () => svgStream.commit());

  return duplexer(jsonStream, svgStream);
};

// require('fs').createReadStream(__dirname + '/../index.json').pipe(require('').exports()).on('data', data => {
//     console.log(data.toString());
// });
