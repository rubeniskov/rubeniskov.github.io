precision highp float;

uniform sampler2D texture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 texCoord;

void main() {
  // const float LOG2 = 1.442695;
  // const float density = 0.01125;
  // float z = gl_FragCoord.z / gl_FragCoord.w;
  // float fogFactor = 1.0 - clamp(exp2(-density * density * z * z * LOG2), 0.0, 1.0);

  // float diff = max(dot(norm,lightDir) * 0.5 + 0.5, 0.0);

  // gl_FragColor = vec4(mix(vNormal.xyz, vec3(1.0,1.0,1.0), fogFactor), 1.0);

  // gl_FragColor = texture2D(texture, vUv);

  gl_FragColor = vec4(vNormal, 1.0);
  // gl_FragColor = vec4(vUv, 0.0, 1.0);
  // gl_FragColor = vec4(texCoord, 0.0, 1.0);
  // gl_FragColor = vec4(1.0,0.0,0.0,0.5);
}
