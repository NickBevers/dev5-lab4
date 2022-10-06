import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Defining variables
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });
const loader = new GLTFLoader();


// Loading the model and adding it to the scene
loader.load(
    "donut.glb",

    ( gltf ) => {
        const root = gltf.scene;
        root.traverse( function ( child ) {
            if ( child.isMesh ) {child.material.color.set( 0xffffff * Math.random() );}
        });

        root.scale.set(1, 1, 1);
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


// Setting up the lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
ambientLight.position.set(2, 2, 5);
scene.add(ambientLight);


// Setting up the camera & renderer
camera.position.set( 0, 0, 0.5 );
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
document.body.appendChild( renderer.domElement );
renderer.render( scene, camera );

const animate = () => {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

animate();