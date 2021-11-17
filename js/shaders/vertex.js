export default `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

uniform vec2 u_resolution;

out vec2 v_position;
 
// all shaders have a main function
void main() {
  vec2 zeroToOne = a_position / u_resolution;
  
  vec2 zeroToTwo = zeroToOne * 2.0;
  
  // gl_Position is a special variable a vertex shader is responsible for setting
  gl_Position = vec4(a_position * vec2(1, -1), 0, 1);
  v_position = vec2(a_position * vec2(1, -1));
}`;