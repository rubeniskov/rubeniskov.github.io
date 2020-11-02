import createModel from "../utils/createModel";

// const material = {
//   vert: `
//   attribute vec3 position;
//   uniform mat4 projection;
//   uniform mat4 view;
//   void main() {
//     gl_Position = projection * view * vec4(position, 1.0);
//   }`,
//   frag: `
//   precision highp float;
//   uniform float t;
//   void main() {
//     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//   }`,
// };

const createModelBunny = (gl, material) => {
  return createModel(gl, require("bunny"), material);
};

export default createModelBunny;
