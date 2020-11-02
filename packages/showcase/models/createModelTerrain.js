import createModel from "../utils/createModel";
import createPlane from "primitive-plane";
import glBarycentric from "../utils/gl-barycentric";

const createModelTerrain = (gl, material) => {
  const plane = glBarycentric(createPlane(500, 500, 25, 25), { edge: true });
  const model = createModel(gl, plane, material);
  model.rotateX(Math.PI * 0.5);
  return model;
};

export default createModelTerrain;
