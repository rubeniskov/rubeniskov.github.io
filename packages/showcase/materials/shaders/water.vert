#pragma glslify: PI = require('glsl-pi') 
#pragma glslify: rotate = require(glsl-rotate)
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)

attribute vec3 positions;
attribute vec2 uvs;
attribute vec3 normals;
attribute vec3 barycentric;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform float time;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vBarycentric;
varying vec3 vViewPosition;

void main() {
  // float travel = view[3][2];
  // float n = cnoise2(vec2(view[3][2] * 0.001 + uvs.x, uvs.y) * 10.0);
  float n = cnoise2(vec2(time * 0.00001 + uvs.x, uvs.y) * 10.0);
  // float amplitude = 2.0;
  vec3 displacement = normals * n * 10.0;
  vec3 newPosition = positions + displacement;
  // newPosition.y += travel;

  vec4 mPosition = model * vec4( newPosition, 1.0 );
  vec4 mvPosition = view * mPosition;
  
  vUv = uvs;
  vPosition = newPosition; 
  vNormal = normals;
  vBarycentric = barycentric;
  vViewPosition = -mPosition.xyz;

  mat4 fixedView = mat4(
    1, 0, 0, 0, 
    0, 1, 0, 0, 
    0, 0, 1, 0, 
    0, -20, 0, 1
  );
  // gl_Position = projection * fixedView * mPosition;
  // gl_Position = projection * view * mPosition;
  gl_Position = projection * view * mPosition;
}


// vNormal = normalize(vec3(-amplitude * frequency * cos(angle), 0.0, 1.0));
  // vNormal = vBarycentric;
  // vNormal = normalize(cos(angle) * vec3(
  //   barycentric.x * uvs.x - barycentric.x * uvs.y,
  //   barycentric.y * uvs.x - barycentric.y * uvs.y,
  //   barycentric.z * uvs.x - barycentric.z * uvs.y
  // ));

  // vNormal = normalize(cos(angle) * vec3(
  //   barycentric.x * uvs.x - barycentric.x * uvs.y,
  //   barycentric.y * uvs.x - barycentric.y * uvs.y,
  //   barycentric.z * uvs.x - barycentric.z * uvs.y
  // ));

  // vNormal = rotate(normals, vec3(barycentric.x, barycentric.y ,  barycentric.z), 2. / (sin(angle) + 2.));
  // vNormal = normalize(rotate(normals, vec3(1.0, 1.0, 0.1), 2. / (sin(angle) + 2.)));
  // vNormal = normalize(vecamplitude * frequency * (2. / (cos(angle) + 2.)));
  // vNormal = normalize(barycentric * vec3(-amplitude * frequency * cos(angle), -amplitude * frequency * sin(angle), 1.0));
