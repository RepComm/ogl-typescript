import {R as Renderer, a as Camera, T as Transform, b as Texture, P as Program, G as Geometry, M as Mesh} from "./GLTFSkin.e3c4699d.js";
const vertex = `
            precision highp float;
            precision highp int;

            attribute vec2 uv;
            attribute vec3 position;

            // Add instanced attributes just like any attribute
            attribute vec3 offset;
            attribute vec3 random;

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform float uTime;

            varying vec2 vUv;
            varying vec3 vNormal;

            void rotate2d(inout vec2 v, float a){
                mat2 m = mat2(cos(a), -sin(a), sin(a),  cos(a));
                v = m * v;
            }

            void main() {
                vUv = uv;
                
                // copy position so that we can modify the instances
                vec3 pos = position;
                
                // scale first
                pos *= 0.9 + random.y * 0.2;
                
                // rotate around y axis
                rotate2d(pos.xz, random.x * 6.28 + 4.0 * uTime * (random.y - 0.5));
                
                // rotate around x axis just to add some extra variation
                rotate2d(pos.zy, random.z * 0.5 * sin(uTime * random.x + random.z * 3.14));
                
                pos += offset;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);;
            }
        `;
const fragment = `
            precision highp float;
            precision highp int;

            uniform float uTime;
            uniform sampler2D tMap;

            varying vec2 vUv;

            void main() {
                vec3 tex = texture2D(tMap, vUv).rgb;
                
                gl_FragColor.rgb = tex;
                gl_FragColor.a = 1.0;
            }
        `;
const renderer = new Renderer({dpr: 2});
const gl = renderer.gl;
document.body.appendChild(gl.canvas);
gl.clearColor(1, 1, 1, 1);
const camera = new Camera(gl, {fov: 15});
camera.position.z = 15;
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.perspective({aspect: gl.canvas.width / gl.canvas.height});
}
window.addEventListener("resize", resize, false);
resize();
const scene = new Transform();
const texture = new Texture(gl);
const img = new Image();
img.onload = () => texture.image = img;
img.src = "../../assets/acorn.jpg";
const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uTime: {value: 0},
    tMap: {value: texture}
  }
});
let mesh;
loadModel();
async function loadModel() {
  const data = await (await fetch(`../../assets/acorn.json`)).json();
  const num = 20;
  let offset = new Float32Array(num * 3);
  let random = new Float32Array(num * 3);
  for (let i = 0; i < num; i++) {
    offset.set([Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1], i * 3);
    random.set([Math.random(), Math.random(), Math.random()], i * 3);
  }
  const geometry = new Geometry(gl, {
    position: {size: 3, data: new Float32Array(data.position)},
    uv: {size: 2, data: new Float32Array(data.uv)},
    normal: {size: 3, data: new Float32Array(data.normal)},
    offset: {instanced: 1, size: 3, data: offset},
    random: {instanced: 1, size: 3, data: random}
  });
  mesh = new Mesh(gl, {geometry, program});
  mesh.setParent(scene);
}
requestAnimationFrame(update);
function update(t) {
  requestAnimationFrame(update);
  if (mesh)
    mesh.rotation.y -= 5e-3;
  program.uniforms.uTime.value = t * 1e-3;
  renderer.render({scene, camera});
}
document.getElementsByClassName("Info")[0].innerHTML = "Instancing. Model by Google Poly";
document.title = "OGL \u2022 Instancing";
