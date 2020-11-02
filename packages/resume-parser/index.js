import callbackStrem from "callback-stream";
import toStream from "to-stream";

import jsonTransform from "@rubeniskov/resume-transform-json";
import ymlTransform from "@rubeniskov/resume-transform-yml";

import jsonRenderer from "./renderers/json";
import ymlRenderer from "./renderers/yml";
// import svgRenderer from "./renderers/svg";
import xlsxRenderer from "./renderers/xlsx";
import mdRenderer from "./renderers/md";

const transforms = {
  json: jsonTransform,
  yml: ymlTransform,
};

const renderers = {
  json: jsonRenderer,
  yml: ymlRenderer,
  // svg: svgRenderer,
  xlsx: xlsxRenderer,
  md: mdRenderer,
};

/**
 * @typedef {"md" | "json" | "yml" | "xlsx"} ResumeOutputFormat
 */

/**
 * @typedef {"json" | "yml"} ResumeInputFormat
 */

/**
 *
 * @param {Buffer|string} data
 * @param {ResumeFormat} iformat
 * @param {ResumeFormat} oformat
 */
const resumeReader = (data, iformat, oformat, cb) => {
  const transform = transforms[iformat];
  const renderer = renderers[oformat];
  console.log(iformat, oformat);
  if (!transform) {
    throw new TypeError(`Unable to resolve input format "${iformat}"`);
  }

  if (!renderer) {
    throw new TypeError(`Unable to resolve output format "${oformat}"`);
  }

  const source = toStream(data).pipe(transform()).pipe(renderer());

  if (typeof cb === "function") {
    source.pipe(callbackStrem((error, data) => cb(error, data[0])));
  }
  return source;
};

export default resumeReader;
