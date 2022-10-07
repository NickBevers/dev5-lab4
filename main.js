import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


// Defining variables
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderConfig({ type: 'js' });
dracoLoader.setDecoderPath( '/node_modules/three/examples/js/libs/draco/' );
loader.setDRACOLoader(dracoLoader);

const logoTexture = [
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/donuttello-logo.png') }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
];


//Loading the model and adding it to the scene
const loadDonut = (position = [0, 0, 0], scale = [1, 1, 1], colors = false) => {
    // Load the donut model
    loader.load(
        "/donut_compressed.glb",

        ( gltf ) => {
            const root = gltf.scene;
            if (colors) {
                root.traverse( ( child ) => {
                    if ( child.isMesh ) { child.material.color.set(0xffffff * Math.random()) }
                });
            }
            root.scale.set(...scale);
            root.position.set(...position);
            scene.add( root );
        },

        ( xhr ) => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },

        ( error ) => {
            console.log( 'An error happened' );
            console.error( error );
        }
    );

    // Load the donut logo
    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const cube = new THREE.Mesh( cubeGeometry, logoTexture );
    cube.position.set(0, 0.068, -0.045);
    cube.rotation.set(2.007, 3.14, 3.14);
    cube.scale.set(0.05, 0.03, 0.001);
    scene.add( cube );
}


// Setting up the lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
ambientLight.position.set(2, 2, 5);
scene.add(ambientLight);


// Setting up the camera
camera.position.set( 0, 0, 0.5 );
controls.update();
controls.autoRotate = true;


// Setting up the renderer
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
document.body.appendChild( renderer.domElement );
renderer.render( scene, camera );


// Animating the scene
const animate = () => {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

// Calling the functions
loadDonut();
animate();
for(let i = 0; i < 10; i++) { loadDonut([Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1], [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5], true) };