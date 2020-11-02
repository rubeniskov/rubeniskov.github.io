// @ts-check
import createContext from "gl-context";
import glReset from "gl-reset";
import glExtension from "gl-extension";
import canvasFit from "canvas-fit";
import createShell from "./utils/createShell";
import createBackground from "./utils/createBackground";
import createCamera from "perspective-camera";
import createOrbitControls from "orbit-controls";
import createTexture from "gl-texture2d";
import lena from "lena";

import createModelBunny from "./models/createModelBunny";
import createModelTerrain from "./models/createModelTerrain";
import createBasicMaterial from "./materials/basic";
import createWaterMaterial from "./materials/water";

const attachResize = (fn) => {
  if (global.addEventListener) {
    global.addEventListener("resize", fn, false);
  }
};

const detachResize = (fn) => {
  if (global.removeEventListener) {
    global.removeEventListener("resize", fn);
  }
};

const setup = createShell({ init: false });

const createShowcase = (canvas) => {
  const gl = createContext(canvas);
  glExtension(gl, "oes_standard_derivatives");

  const shell = setup(gl);
  const resizer = canvasFit(canvas);

  var width = gl.drawingBufferWidth;
  var height = gl.drawingBufferHeight;

  const camera = createCamera({
    fov: Math.PI / 4,
    near: 0.1,
    far: 1000,
    viewport: [0, 0, width, height],
  });

  const texture = createTexture(gl, lena);
  const material = createBasicMaterial(gl, {
    ...camera,
    texture,
  });
  const waterMaterial = createWaterMaterial(gl, camera);

  const controls = createOrbitControls({
    phi: Math.PI / 3,
    theta: Math.PI / 4,
    distance: 50,
  });

  const updateViewport = (evt) => {
    resizer(evt);
    camera.viewport = [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight];
  };

  const attach = () => {
    attachResize(updateViewport);
    shell.attach();
  };

  const detach = () => {
    detachResize(updateViewport);
    shell.detach();
    glReset(gl);
  };

  const setOptions = () => {};

  // camera.translate([0.0, 20, 200]);

  shell.add({
    draw: () => {
      controls.update();
      controls.copyInto(camera.position, camera.direction, camera.up);
      camera.update();
      // camera.translate([0.0, 0, -1]);
      // camera.update();
      // console.log(camera.view);
    },
  });

  shell.add(createBackground(gl));

  shell.add(createModelTerrain(gl, waterMaterial));
  // shell.add(createModelBunny(gl, material));

  attach();

  return {
    ...shell,
    attach,
    detach,
    setOptions,
  };
};

export default createShowcase;
