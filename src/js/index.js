import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import 'promise-polyfill/src/polyfill';
import * as WEBGL from 'three/examples/jsm/WebGL.js';
import FireSfx from '../static/audio/fire_compressed.mp3';
import Image from '../static/images/es6.png';
import '../sass/style.scss';
console.log(FireSfx);
console.log(Image);

// Test for WebGl compatiablity within browser

// these need to be accessed inside more than one function so we'll declare them
let container;
let camera;
let renderer;
let scene;
let mesh;
// const rotateTween = new TWEEN.Tween({x: 0, y: 0});
function init() {
  // Get a reference to the container element that will hold our scene
  container = document.querySelector('#three-container');

  // create a Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);
  // set up the options for a perspective camera
  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set(0, 0, 10);

  // create a geometry
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

  // create a purple Standard material
  const material = new THREE.MeshStandardMaterial({ color: 0x800080 });

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh(geometry, material);

  // add the mesh to the scene object
  scene.add(mesh);

  // Create a directional light
  const light = new THREE.DirectionalLight(0xffffff, 5.0);

  // move the light back and up a bit
  light.position.set(10, 10, 10);

  // remember to add the light to the scene
  scene.add(light);

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  // add the automatically created <canvas> element to the page
  container.appendChild(renderer.domElement);

  // start the animation loop
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {
  // increase the mesh's rotation each frame
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

// render, or 'draw a still image', of the scene
function render() {
  renderer.render(scene, camera);
}

// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
function onWindowResize() {
  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);
}

/* https://threejs.org/docs/#manual/en/introduction/WebGL-compatibility-check */
if (WEBGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  window.addEventListener('resize', onWindowResize);
  init();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}
