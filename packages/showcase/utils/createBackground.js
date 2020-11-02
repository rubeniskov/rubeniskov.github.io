import glVignetteBackground from "gl-vignette-background";

const createBackground = (gl) => {
  const background = glVignetteBackground(gl);

  const draw = () => {
    var width = gl.drawingBufferWidth;
    var height = gl.drawingBufferHeight;

    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 1);

    // set some flags before drawing
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    // setup some fancy style (optional)
    var radius = Math.max(width, height) * 1.05;
    background.style({
      // xy scale
      scale: [(1 / width) * radius, (1 / height) * radius],
      // aspect ratio for vignette
      aspect: 1,
      // radial gradient colors A->B
      color1: [1, 1, 1],
      color2: [0.5, 0.5, 0.5],
      // smoothstep low/high input
      smoothing: [-0.5, 1.0],
      // % opacity of noise grain (0 -> disabled)
      noiseAlpha: 0.35,
      // whether or not the noise is monochromatic
      coloredNoise: true,
      // offset the vignette
      offset: [-0.05, -0.15],
    });
    background.draw();
  };

  return {
    draw,
  };
};

export default createBackground;
