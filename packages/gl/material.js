import glShader from "gl-shader";
import glShaderExtract from "gl-shader-extract";

const createMaterial = (gl, vert, frag, uniforms) => {
  const shader = glShader(gl, vert, frag);
  const { program } = shader;
  const shaderUniforms = glShaderExtract.uniforms(gl, program);

  const bindUniforms = (extra) => {
    for (let { name } of shaderUniforms) {
      let value = extra[name] || uniforms[name];
      shader.uniforms[name] = value.bind ? value.bind() : value;
    }
  };

  const bind = (extra) => {
    shader.bind();
    bindUniforms(extra);
  };

  return {
    shader,
    bind,
  };
};

export default createMaterial;
