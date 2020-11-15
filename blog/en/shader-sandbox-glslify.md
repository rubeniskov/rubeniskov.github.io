```glsl
precision mediump float;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 st = gl_FragCoord.xy/resolution;

	gl_FragColor = vec4(vec3(snoise2(5.0 * st + time * 0.1)), 1.0);
}
```
