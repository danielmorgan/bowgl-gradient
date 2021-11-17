import vertexShaderSource from './shaders/vertex.js';
import fragmentShaderSource from './shaders/fragment.js';
import { createShader, createProgram } from './shaders.js';

/**** Elements ****/
const debug = document.getElementById('debug');
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2');


/**** Shaders ****/
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);


/**** Vertex data ****/
const aPositionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
gl.enableVertexAttribArray(aPositionAttributeLocation);
gl.vertexAttribPointer(aPositionAttributeLocation, 2, gl.FLOAT, false, 0, 0);


/**** Canvas setup ****/
gl.useProgram(program);
gl.bindVertexArray(vao);

const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);


/**** Render loop ****/
(function render() {
    requestAnimationFrame((t) => {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(timeUniformLocation, t);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // debug.textContent = t;

        render();
    })
})();



/**** Toggle mask ****/
let toggled = false;
canvas.style.clipPath = 'url(#my-clip-path)';
document.getElementById('toggle').addEventListener('click', (e) => {
    if (!toggled) {
        canvas.style.clipPath = 'url(#my-clip-path)';
    } else {
        canvas.style.clipPath = null;
    }

    toggled = !toggled;
});
