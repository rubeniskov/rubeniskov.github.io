float aastep (float threshold, float dist) {
  float afwidth = fwidth(dist) * 0.5;
  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
}

// Wireframe using vec3 barycentric coordinate
float wireframe(vec3 bary, float threshold) {
  float d = min(min(bary.x, bary.y), bary.z);
  return 1.0 - aastep(threshold, d);
}

// Wireframe using encoded vec2 barycentric coordinate
float wireframe(vec2 bary, float threshold) {
  return wireframe(vec3(bary.x, bary.y, 1.0 - bary.x - bary.y), threshold);
}

#pragma glslify: export(wireframe)
