import "./style.css";
import * as THREE from "three";

// Defining variables
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Setting up the camera & renderer
camera.position.set( 0, 0, 5 );

const animate = () => {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

animate();