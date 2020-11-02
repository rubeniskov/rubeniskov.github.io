import glMesh from "gl-mesh";
import mat4 from "gl-mat4";

const createModel = (gl, geometry, material) => {
  const mesh = glMesh(gl, geometry);
  const model = mat4.create();

  const bind = (time) => {
    material.bind({ time, model });
    mesh.bind(material.shader);
  };

  const draw = (time) => {
    bind(time);
    mesh.draw();
    mesh.unbind();
  };

  return Object.entries(mat4).reduce(
    (prev, [name, fn]) =>
      /^(rotate|translate|scale)/.test(name)
        ? { ...prev, [name]: fn.bind(null, model, model) }
        : prev,
    {
      bind,
      draw,
      unbind: mesh.unbind.bind(mesh),
      dispose: mesh.dispose.bind(mesh),
    }
  );
};

export default createModel;
