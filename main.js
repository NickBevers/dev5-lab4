import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Defining variables
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
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

// Setting up the camera & renderer
camera.position.set( 0, 0, 5 );

const animate = () => {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

animate();