import createMaterial from "../utils/createMaterial";
import glslify from "glslify";

const createBasicMaterial = (gl, uniforms, attributes) =>
  createMaterial(
    gl,
    glslify("./shaders/basic.vert"),
    glslify("./shaders/basic.frag"),
    uniforms,
    attributes
  );

export default createBasicMaterial;
