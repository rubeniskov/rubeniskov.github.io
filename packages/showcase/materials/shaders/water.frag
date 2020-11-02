#extension GL_OES_standard_derivatives : require
// precision highp float;
precision mediump float;

#pragma glslify: wireframe = require(./wireframe)
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)


// uniform sampler2D texture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vBarycentric;
varying vec3 vViewPosition;

void main() {
  // const float LOG2 = 1.442695;
  // const float density = 0.01125;
  // float z = gl_FragCoord.z / gl_FragCoord.w;
  // float fogFactor = 1.0 - clamp(exp2(-density * density * z * z * LOG2), 0.0, 1.0);

  // float diff = max(dot(norm,lightDir) * 0.5 + 0.5, 0.0);

  // gl_FragColor = vec4(mix(vNormal.xyz, vec3(1.0,1.0,1.0), fogFactor), 1.0);

  // gl_FragColor = texture2D(texture, vUv);

  // vec3 bary = vec3(vBarycentric.x, vBarycentric.y, 1.0 - vBarycentric.x - vBarycentric.y);
  // float d = min(min(bary.x, bary.y), bary.z);
  // float edge = 1.0 - aastep(0.01, d);
  
  // https://en.wikipedia.org/wiki/Directional_derivative
  vec3 normal  = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));
  // gl_FragCoord.xyz
  // float edge = wireframe(vBarycentric, 0.01);
  vec3 lightdir = vec3(0.5, 0.5, 1.0);
  vec3 color = dot(normal, lightdir) * vec3(0.11, 0.28, 0.65);
  // vec3 color = vec3(normalize(vBarycentric * vPosition));
  
  // gl_FragColor = vec4(mix(color, vec3(0.0, 0.0, 0.0), edge), 1.0);

  // gl_FragColor = vec4(vec3(cnoise2(vUv * 100.0)), 1.0);
  gl_FragColor = vec4(color, 1.0);
}
