import {R as Renderer, a as Camera, T as Transform, b as Texture, P as Program, C as Color, M as Mesh} from "./GLTFSkin.e3c4699d.js";
import {P as Plane} from "./Plane.7e1c7186.js";
const vertex = `
            precision highp float;
            precision highp int;

            attribute vec2 uv;
            attribute vec3 position;

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            varying vec2 vUv;
            varying vec4 vMVPos;

            void main() {
                vUv = uv;
                vec3 pos = position;
                float dist = pow(length(vUv - 0.5), 2.0) - 0.25;
                pos.z += dist * 0.5;
                vMVPos = modelViewMatrix * vec4(pos, 1.0);
                gl_Position = projectionMatrix * vMVPos;
            }
        `;
const fragment = `
            precision highp float;
            precision highp int;

            uniform sampler2D tMap;
            uniform vec3 uColor;

            varying vec2 vUv;
            varying vec4 vMVPos;

            void main() {
                float alpha = texture2D(tMap, vUv).g;
                
                vec3 color = uColor + vMVPos.xzy * 0.05;
                
                float dist = length(vMVPos);
                float fog = smoothstep(5.0, 10.0, dist);
                color = mix(color, vec3(1.0), fog);
                
                gl_FragColor.rgb = color;
                gl_FragColor.a = alpha;
                if (alpha < 0.01) discard;
            }
        `;
const renderer = new Renderer({dpr: 2});
const gl = renderer.gl;
document.body.appendChild(gl.canvas);
gl.clearColor(1, 1, 1, 1);
const camera = new Camera(gl, {fov: 35});
camera.position.set(0, 0, 7);
camera.rotation.z = -0.3;
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.perspective({aspect: gl.canvas.width / gl.canvas.height});
}
window.addEventListener("resize", resize, false);
resize();
const scene = new Transform();
const geometry = new Plane(gl, {
  widthSegments: 10,
  heightSegments: 10
});
const texture = new Texture(gl);
const img = new Image();
img.onload = () => texture.image = img;
img.src = "../../assets/leaf.jpg";
const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    tMap: {value: texture},
    uColor: {value: new Color("#ffc219")}
  },
  transparent: true,
  cullFace: null
});
const meshes = [];
for (let i = 0; i < 50; i++) {
  const mesh = new Mesh(gl, {geometry, program});
  mesh.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3);
  mesh.rotation.set(0, (Math.random() - 0.5) * 6.28, (Math.random() - 0.5) * 6.28);
  mesh.scale.set(Math.random() * 0.5 + 0.2);
  mesh.speed = Math.random() * 1.5 + 0.2;
  mesh.setParent(scene);
  meshes.push(mesh);
}
requestAnimationFrame(update);
function update(t) {
  requestAnimationFrame(update);
  meshes.forEach((mesh) => {
    mesh.rotation.y += 0.05;
    mesh.rotation.z += 0.05;
    if (mesh.position.y < -3)
      mesh.position.y += 6;
  });
  scene.rotation.y += 0.015;
  renderer.render({scene, camera});
}
document.getElementsByClassName("Info")[0].innerHTML = "Sort Transparency";
document.title = "OGL \u2022 Sort Transparency";
