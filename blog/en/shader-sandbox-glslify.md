# Shading with glslify in browser

```glsl
precision mediump float;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution;

	gl_FragColor = vec4(vec3(snoise2(5.0 * uv + time * 0.5)), 1.0);
}
```

```glsl
precision mediump float;
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d) 

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution;

	gl_FragColor = vec4(vec3(cnoise2(5.0 * uv + time * 0.5)), 1.0);
}
```

```glsl
precision mediump float;
#pragma glslify: pnoise2 = require(glsl-noise/periodic/2d) 

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution;

	gl_FragColor = vec4(vec3(pnoise2(5.0 * uv + time, vec2(2.0, 3.0))), 1.0);
}
```

```glsl
precision mediump float;
#pragma glslify: voronoi2 = require(glsl-voronoi-noise/2d)

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution;

	gl_FragColor = vec4(vec3(voronoi2(5.0 * uv + time * 0.5)), 1.0);
}
```

```glsl
precision mediump float;
#pragma glslify: voronoi3 = require('glsl-voronoi-noise/3d') 

uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = gl_FragCoord.xy/resolution;

	gl_FragColor = vec4(voronoi3(vec3(5.0 * uv, time)), 1.0);
}
```
