#pragma glslify: PI = require('glsl-pi') 

attribute vec3 positions;
attribute vec2 uvs;
attribute vec3 normals;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform float time;

varying vec2 texCoord;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  float angle = time * 0.001 + 10.0 * (uvs.x + uvs.y);
  vec3 displacement = normals * cos(angle);
  vUv = uvs;
  vPosition = positions + displacement;
  vNormal = vec3(vUv.x, vUv.y, 1.0);
  texCoord = vec2(1.0, 1.0) * (positions.y/ 5.0);
  // vec3 displacement = vec3(0.0,1.0, 0.0) * cos(time * 100.0 + uv.x * PI);
  gl_Position = projection * view * model * vec4(vPosition, 1.0);
}
