import createMaterial from "../utils/createMaterial";
import glslify from "glslify";

const createWaterMaterial = (gl, uniforms, attributes) =>
  createMaterial(
    gl,
    glslify("./shaders/water.vert"),
    glslify("./shaders/water.frag"),
    uniforms,
    attributes
  );

export default createWaterMaterial;
