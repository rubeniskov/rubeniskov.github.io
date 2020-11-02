export const fragment = `
precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy/resolution.xy;

  vec3 col = 0.5 + 0.5 * cos(time+uv.xyx+vec3(0,2,4));
  gl_FragColor = vec4(col,1.0);
}
`;

export const vertex = `
precision mediump float;
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0, 1);
}`;
