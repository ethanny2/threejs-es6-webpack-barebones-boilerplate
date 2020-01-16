import * as THREE from "three";
//global.THREE = require("three");
const path = require("path");
import TWEEN from "@tweenjs/tween.js";
import "promise-polyfill/src/polyfill";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as Stats from "stats.js";
import { SPE } from "./vendor/SPE.js";
//Importing static assets for use
// import FireSfx from "../static/audio/fire_compressed.mp3";
import brushMetalTexture from "../static/images/grass-texture.jpg";
import flameTexture from "../static/images/flames.jpg";
import dragonModel from "../static/models/dracoDragon.gltf";
import "../sass/style.scss";
import "../static/html/index.html";

//To enable caching across all loaders that use FileLoader, set
THREE.Cache.enabled = true;

/*Threejs Vars */
// these need to be accessed inside more than one function so we'll declare them
let container;
let camera;
let renderer;
let scene;
let mesh;
let stats;
let controls;
let loader;
let dracoLoader;
let texture;
let loadedModel;
//Shader Particle Engine Variables
let emitter, particleGroup;

/* TweenjS vars */
//const easing = TWEEN.Easing.Quadratic.Out;
const duration = 8000;
let cubeRotateTweenA;
//Used in cubeRotateTweenA to perform a full rotation from 0.
const rotateCoords = new THREE.Vector3(Math.PI, Math.PI, Math.PI);
const clock = new THREE.Clock();
const dracoDecodePath = "./js/vendor/draco/";
function init() {
  stats = new Stats();
  // 0: fps, 1: ms, 2: mb
  stats.showPanel(0, 1, 2);
  document.getElementById("stats").appendChild(stats.dom);

  // Get a reference to the container element that will hold our scene
  container = document.querySelector("#three-container");

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
  // scene.add(mesh);
  console.log(mesh.rotation);
  // Create a directional light
  const light = new THREE.DirectionalLight(0xffffff, 3.0);

  // move the light back and up a bit
  light.position.set(10, 10, 10);

  /*Add helper grid */
  var gridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.set(0, -2, 0);
  scene.add(gridHelper);

  /* Add helper axis*/
  var axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  /*Load in metallic texture */
  texture = new THREE.TextureLoader().load(brushMetalTexture);
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  /* Add in draco compressed dragon .gltf model*/
  // loader = new GLTFLoader();
  // dracoLoader = new DRACOLoader();
  // dracoLoader.setDecoderPath(dracoDecodePath);
  // // dracoLoader.preload();
  // loader.setDRACOLoader(dracoLoader);
  // console.log(dragonModel);
  // console.log(Image);
  // loader.load(
  //   dragonModel,
  //   function(gltf) {
  //     loadedModel = gltf.scene;
  //     // console.log(loadedModel);
  //     loadedModel.traverse(function(child) {
  //       if (child instanceof THREE.Mesh) {
  //         //create a global var to reference later when changing textures
  //         //apply texture
  //         child.material.map = texture;
  //         child.material.metalness = 1;
  //         child.material.needsUpdate = true;
  //         child.material.map.needsUpdate = true;
  //       }
  //     });
  //     gltf.scene.scale.set(0.08, 0.08, 0.08);
  //     gltf.scene.rotation.set(0, Math.PI / 2, 0);
  //     gltf.scene.position.set(3, -0.5, 0);
  //     scene.add(gltf.scene);
  //   },
  //   // called while loading is progressing
  //   function(xhr) {
  //     if (xhr.lengthComputable) {
  //       console.log("percent: " + (xhr.loaded / xhr.total) * 100);
  //     }
  //   },
  //   // called when loading has errors
  //   function(error) {
  //     console.log("An error happened");
  //   }
  // );
  /*Apply new texture */
  // console.log(loadedModel);
  // loadedModel.traverse(function(child) {
  //   if (child instanceof THREE.Mesh) {
  //     //create a global var to reference later when changing textures
  //     //apply texture

  //     child.material.map = texture;
  //     child.material.needsUpdate = true;
  //     child.material.map.needsUpdate = true;
  //   }
  // });

  // remember to add the light to the scene
  scene.add(light);

  //Initialize the rotation tween from 0deg to 360deg
  cubeRotateTweenA = new TWEEN.Tween(mesh.rotation)
    .to(rotateCoords, duration)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(obj => {
      //Not needed!
      // three.js renderer will look at the object's properties before
      //rendering,you don't need to use an explicit onUpdate callback.
    });
  // Start the tween
  cubeRotateTweenA.start();
  cubeRotateTweenA.repeat(Infinity);
  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);

  // add the automatically created <canvas> element to the page
  container.appendChild(renderer.domElement);
  //Set up orbit controls
  controls = new OrbitControls(camera, renderer.domElement);

  // start the animation loop
  renderer.setAnimationLoop(() => {
    stats.begin();
    update();
    render();
    stats.end();
  });
}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {
  // increase the mesh's rotation each frame
  // mesh.rotation.z += 0.01;
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
  //Update tween in order to see animation
  TWEEN.update();
  particleGroup.tick(clock.getDelta());
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

// Create particle group and emitter
function initParticles() {
  particleGroup = new SPE.Group({
    texture: {
      value: THREE.ImageUtils.loadTexture(flameTexture)
    }
  });
  emitter = new SPE.Emitter({
    maxAge: {
      value: 2
    },
    position: {
      value: new THREE.Vector3(0, 0, 0),
      spread: new THREE.Vector3(0, 0, 0)
    },
    acceleration: {
      value: new THREE.Vector3(0, -10, 0),
      spread: new THREE.Vector3(10, 0, 10)
    },
    velocity: {
      value: new THREE.Vector3(0, 25, 0),
      spread: new THREE.Vector3(10, 7.5, 10)
    },
    color: {
      value: [new THREE.Color("orange"), new THREE.Color("red")]
    },
    size: {
      value: 1
    },
    particleCount: 2000
  });
  particleGroup.addEmitter(emitter);
  scene.add(particleGroup.mesh);
}

/* https://threejs.org/docs/#manual/en/introduction/WebGL-compatibility-check */
if (WEBGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  window.addEventListener("resize", onWindowResize);
  init();
  initParticles();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("three-container").appendChild(warning);
}
