import canvasFit from "canvas-fit";
import createRegl from "regl/dist/regl.unchecked";
// import createRegl from "regl/dist/regl.js";
import glslify from "./glslify";
import * as defaults from "./defaults";

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

const getShaderError = (gl, source, vertext) => {
  var shader = gl.createShader(vertext ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // Check for any compilation error
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return gl.getShaderInfoLog(shader);
  }

  return null;
};

const setup = (canvas, opts) => {
  const { onError, attributes, uniforms, ...restOps } = { ...opts };
  const regl = createRegl(canvas);
  const resizer = canvasFit(canvas);
  const gl = regl._gl;
  const glsl = glslify(opts);

  return (fragment) => {
    const draw = ({ frag = defaults.fragment, vert = defaults.vertex } = {}) => {
      const err = getShaderError(gl, frag);
      if (err && onError) {
        return onError(new Error(err));
      }
      const drawTriangle = regl({
        ...restOps,
        frag,
        vert,
        attributes: {
          position: regl.buffer([
            [-1, -1],
            [-1, 4],
            [4, -1],
            // [-2, -2],
            // [4, -2],
            // [4, 4],
          ]),
          ...attributes,
        },
        uniforms: {
          time: regl.prop("time"),
          resolution: regl.prop("resolution"),
          ...uniforms,
        },
        count: 3,
      });

      regl.frame(({ time }) => {
        regl.clear({
          color: [0, 0, 0, 0],
          depth: 1,
        });

        drawTriangle({
          time,
          resolution: [gl.drawingBufferWidth, gl.drawingBufferHeight],
        });
      });
    };

    glsl(fragment, (err, frag) => {
      if (err) {
        if (onError) {
          return onError(err);
        }
        throw err;
      }
      draw({ frag });
    });

    attachResize(resizer);
    return () => {
      detachResize(resizer);
      regl.destroy();
    };
  };
};

export default setup;
