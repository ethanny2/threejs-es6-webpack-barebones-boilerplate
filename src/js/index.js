import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as Stats from "stats.js";
import "promise-polyfill/src/polyfill";
/* 
  Do not use/import the SPE node_module as it doesn't properly work without three in the global scope
*/
import SPE from "shader-particle-engine";

/* 
  Importing static assets for use in your .js file
*/
import fireSfx from "../static/audio/fire_compressed.mp3";
import modelTexture from "../static/images/grass-texture.jpg";
import particleTexture from "../static/images/lightning-texture.png";
import dragonModel from "../static/models/dragon/dracoDragon.gltf";

/* 
  Adding your style files and html files to webpacks dependency graph so it can be
  parsed by loaders 
*/
import "../sass/style.scss";
import "../static/html/index.html";

// To enable caching across all loaders that use FileLoader
THREE.Cache.enabled = true;

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
let emitter, particleGroup;
let audioElem;
let manager;
const duration = 8000;
let cubeRotateTweenA;
// Used in cubeRotateTweenA to perform a full rotation from 0.
const rotateCoords = new THREE.Vector3(Math.PI, Math.PI, Math.PI);
const clock = new THREE.Clock();
// path to draco decoding files; necessary to use DracoLoader
const dracoDecodePath = "./js/vendor/draco/";

function init() {
  // Create stats for performance monitoring
  stats = new Stats();
  stats.showPanel(0, 1, 2);
  document.getElementById("stats").appendChild(stats.dom);

  // Setup loading manager and callbacks it uses to control loading screen
  manager = new THREE.LoadingManager();
  manager.onLoad = function() {
    const loadingScreen = document.getElementById("loader-wrap");
    loadingScreen.classList.add("fade-out");
    loadingScreen.addEventListener("transitionend", onTransitionEnd);
  };
  manager.onError = function(url) {
    console.log("There was an error loading " + url);
  };

  // Get a reference to the container element that will hold our scene
  container = document.querySelector("#three-container");
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  // create the cube mesh
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0x800080 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Create a directional light
  const light = new THREE.DirectionalLight(0xffffff, 3.0);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Add helper grid
  var gridHelper = new THREE.GridHelper(20, 20);
  gridHelper.position.set(0, -2, 0);
  scene.add(gridHelper);

  // Add helper axis
  var axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Load in a texture for the dragon model
  texture = new THREE.TextureLoader().load(modelTexture);
  // these settings are needed to correctly apply a texture to a .gLTF model
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Set up gltf loader with the manager to track model loading
  loader = new GLTFLoader(manager);
  dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(dracoDecodePath);
  loader.setDRACOLoader(dracoLoader);

  // Load the dracoCompressed .gLTF model
  loader.load(
    dragonModel,
    function(gltf) {
      // apply texture loaded via traverse()
      gltf.scene.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          //child.material is an instance of MeshStandardMaterial
          child.material.map = texture;
          child.material.metalness = 1;
        }
      });
      // resize and move model, face dragon toward screen
      gltf.scene.scale.set(0.08, 0.08, 0.08);
      gltf.scene.rotation.set(0, Math.PI / 2, 0);
      gltf.scene.position.set(3, -0.5, 0);
      scene.add(gltf.scene);
    },
    // called while loading is progressing
    function(xhr) {
      if (xhr.lengthComputable) {
        console.log("percent: " + (xhr.loaded / xhr.total) * 100);
      }
    },
    // called when loading has errors
    function(error) {
      console.log("An error occured loading gltf model: " + error);
    }
  );

  // Initialize the rotation tween from 0deg to 360deg
  cubeRotateTweenA = new TWEEN.Tween(mesh.rotation)
    .to(rotateCoords, duration)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(() => {
      /* 
        Not needed to implement;
        three.js renderer will look at all Object3D instances and their properties before
        rendering,you don't need to use an explicit onUpdate callback to increment the rotation.
      */
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

  // set up orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  // start the fire audio clip and loop
  audioElem = createSound();
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
  // Update tween in order to see rotation animation
  // OR just increment the rotation manually
  TWEEN.update();
  /*
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  */
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
      value: new THREE.TextureLoader().load(particleTexture)
    },
    blending: THREE.AdditiveBlending,
    fog: true,
    maxParticleCount: 10000
  });
  emitter = new SPE.Emitter({
    maxAge: {
      value: 2
    },
    position: {
      value: new THREE.Vector3(-3, 0, 0),
      spread: new THREE.Vector3(0, 3, 0)
    },
    acceleration: {
      value: new THREE.Vector3(0, -10, 0),
      spread: new THREE.Vector3(10, 0, 10)
    },
    velocity: {
      value: new THREE.Vector3(0, 25, 0),
      spread: new THREE.Vector3(5, 7.5, 10)
    },
    color: {
      value: [new THREE.Color(0xfd2525), new THREE.Color(0xff3f0b)]
    },
    wiggle: {
      spread: 3
    },
    size: {
      value: 1
    },
    particleCount: 2000
  });
  particleGroup.addEmitter(emitter);
  scene.add(particleGroup.mesh);
}
function createSound() {
  let elem = new Audio(fireSfx);
  elem.loop = true;
  return elem;
}
function toggleSound() {
  if (audioElem.paused) {
    audioElem.play();
  } else {
    audioElem.pause();
  }
}

function onTransitionEnd(event) {
  event.target.remove();
}

/* https://threejs.org/docs/#manual/en/introduction/WebGL-compatibility-check */
if (WEBGL.isWebGLAvailable()) {
  window.addEventListener("resize", onWindowResize);
  document.getElementById("audioBtn").addEventListener("click", toggleSound);
  init();
  initParticles();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("three-container").appendChild(warning);
}
