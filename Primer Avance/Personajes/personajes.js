import * as THREE from '../libs/three.module.js'
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';
import { OrbitControls } from '../libs/controls/OrbitControls.js';

let renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null, prueba = [], LEVEL = [];


let SHADOW_MAP_WIDTH = 4096, SHADOW_MAP_HEIGHT = 4096;

let directionalLight = null, spotLight = null, ambientLight = null;

function main()
{
    const canvas = document.getElementById("webglcanvas");

    createScene(canvas);

    update();
}

function update() 
{
    requestAnimationFrame(function() { update(); });

    renderer.render( scene, camera );

    orbitControls.update();
}

function createScene(canvas) 
{
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    renderer.setSize(canvas.width, canvas.height);

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color (255, 255, 255 );

    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(-3, 6, 20);

    orbitControls = new OrbitControls(camera, renderer.domElement);
        
    directionalLight = new THREE.DirectionalLight( 0xaaaaaa, 1);

    directionalLight.position.set(.5, 1, -3);
    directionalLight.target.position.set(0,0,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    spotLight = new THREE.SpotLight (0xaaaaaa);
    spotLight.position.set(6, 8, 15);
    spotLight.target.position.set(-2, 0, -2);
    scene.add(spotLight);

    spotLight.castShadow = true;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow. camera.far = 200;
    spotLight.shadow.camera.fov = 45;
    
    spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    ambientLight = new THREE.AmbientLight ( 0x444444, 0.8);
    scene.add(ambientLight);
    

    const gltfLoadpacman= new GLTFLoader();
    var pm = new THREE.Object3D();
    gltfLoadpacman.load('../models/pac_man.gltf', (gltf, el) => {
        pm  = gltf.scene;
        pm.name = 'pacman';
        pm.position.set(-4,0,0)
        pm.scale.set(.6, .6, .6)
    scene.add(pm)});

    const gltfLoaderred = new GLTFLoader();
    var renered = new THREE.Object3D();
    gltfLoaderred.load('../models/Fred.gltf', (gltf, el) => {
        renered  = gltf.scene;
        renered.name = 'fred';
        renered.position.set(1,-5,-2)
        renered.rotation.y = 4.65;
    scene.add(renered)});
    

    const gltfLoaderyellow= new GLTFLoader();
    var benjamarillo = new THREE.Object3D();
    gltfLoaderyellow.load('../models/Fyellowgltf.gltf', (gltf, el) => {
        benjamarillo  = gltf.scene;
        benjamarillo.name = 'famarillo';
        benjamarillo.position.set(1,-1,-2)
        benjamarillo.rotation.y = 4.65;
    scene.add(benjamarillo)});

    const gltfLoaderblue= new GLTFLoader();
    var mikeblue = new THREE.Object3D();
    gltfLoaderblue.load('../models/Fblue.gltf', (gltf, el) => {
        mikeblue  = gltf.scene;
        mikeblue.name = 'fblue';
        mikeblue.position.set(4,-1,-2)
        mikeblue.rotation.y = 4.65;
    scene.add(mikeblue)});

    const gltfLoadergreen= new GLTFLoader();
    var octaviogreen = new THREE.Object3D();
    gltfLoadergreen.load('../models/Fgreen.gltf', (gltf, el) => {
        octaviogreen  = gltf.scene;
        octaviogreen.name = 'fgreen';
        octaviogreen.position.set(4,-5,-2)
        octaviogreen.rotation.y = 4.65;
    scene.add(octaviogreen)});

}
main();