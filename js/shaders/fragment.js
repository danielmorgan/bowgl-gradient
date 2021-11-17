export default `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

uniform float u_time;

in vec2 v_position;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  float r = sin(v_position.x - u_time / 500.0) + cos(v_position.y - u_time / 200.0) * 0.5 + 0.5;
  float g = sin(v_position.y - u_time / 650.0) + cos(v_position.x - u_time / 350.0) * 0.5 + 0.5;
  float b = sin(1.0 - u_time / 1000.0) * 0.5 + 0.5;
  outColor = vec4(clamp(r, 0.2, 1.0), clamp(g, 0.5, 0.9), clamp(b, 0.5, 1.0), 1.0);
}`;