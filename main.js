import "./style.css";
import * as THREE from "three";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
let cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const animate = () => {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}

animate();