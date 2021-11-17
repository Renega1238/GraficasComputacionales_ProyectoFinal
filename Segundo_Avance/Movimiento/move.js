import * as THREE from '../libs/three.module.js'
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';
//import { OrbitControls } from '../libs/controls/OrbitControls.js';
import { FirstPersonControls } from '../libs/controls/FirstPersonControls.js';

let cameraControllsFirstPerson = null, renderer = null, scene = null,pm = null, cameraFollow=null, cameraBBox=null, camera = null, group = null, objectList = [], orbitControls = null, prueba = [], LEVEL = [];


let SHADOW_MAP_WIDTH = 4096, SHADOW_MAP_HEIGHT = 4096;

let directionalLight = null, spotLight = null, ambientLight = null;

var clock = new THREE.Clock();
function main()
{
    const canvas = document.getElementById("webglcanvas");

    createScene(canvas);

    update();
}




function createScene(canvas) 
{
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    
    renderer.setSize(canvas.width, canvas.height);
    
    renderer.shadowMap.enabled = true;
    
    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color (255, 255, 255 );
    
    const material1 = new THREE.MeshBasicMaterial( {color: 0xf00000} );
    const cameraGroup = new THREE.Object3D;

    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 100 );
    camera.position.set(1, 0, 30);
    cameraGroup.add(camera);

    const cameraBox = new THREE.BoxGeometry(2,2,2);
    cameraFollow = new THREE.Mesh( cameraBox, material1 );
    cameraFollow.position.copy(camera.position);
    scene.add(cameraFollow);

    // cameraBBox = new THREE.BoxHelper(cameraFollow,0x00ff00);
    // cameraBBox.update();
    // cameraBBox.visible = true;
    // scene.add(cameraBBox);

    cameraControllsFirstPerson = new FirstPersonControls(camera);
    cameraControllsFirstPerson.lookSpeed = .2;
    cameraControllsFirstPerson.movementSpeed = 10;
    cameraControllsFirstPerson.lookVertical = false;

    //orbitControls = new OrbitControls(camera, renderer.domElement);
        
    // Luz direccional
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
    
    /* 
    * Cargamos a nuestro heroe
    * Cargamos el modelo 
    *   Le damos la escena / nombre / coordenadas / escala
    */
    const gltfLoadpacman= new GLTFLoader();
    pm = new THREE.Object3D();
    gltfLoadpacman.load('../models/pac_man.gltf', (gltf, el) => {
        pm  = gltf.scene;
        pm.name = 'pacman';
        pm.position.set(-4,0,0)
        pm.scale.set(.6, .6, .6)
        pm.rotation.y =2.9;
    scene.add(pm)});

    // Cargamos a los villanos, cada uno representa a un fantasma
    
    const geometry = new THREE.PlaneGeometry( 40, 40 );
    const material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.set(0,-5,-10 )
    plane.rotation.x = Math.PI / 2;
    scene.add( plane );

    const geometry1 = new THREE.BoxGeometry( 1, 6, 1 );
    const cube = new THREE.Mesh( geometry1, material1 );

    // cubeBBox = new THREE.BoxHelper(cube,0x00ff00);
    // cubeBBox.update();
    // cubeBBox.visible = false;

    scene.add( cube );
    // scene.add( cubeBBox );

}

function update() 
{
    
    var delta = clock.getDelta();

    requestAnimationFrame(function() { update(); });

    renderer.render( scene, camera );

    cameraControllsFirstPerson.update(delta);
    cameraFollow.position.copy(camera.position);
    // console.log(cameraFollow.position);
    // console.log(camera.position);
    let cameraBox = new THREE.Box3().setFromObject(cameraFollow) ;
    let pmBox = new THREE.Box3().setFromObject(pm);
    cameraBox.intersectsBox(pmBox) ? pm.visible=false : pm.visible=true;
    //orbitControls.update();
}

main();