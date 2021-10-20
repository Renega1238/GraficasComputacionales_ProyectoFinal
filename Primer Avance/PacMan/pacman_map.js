import * as THREE from '../libs/three.module.js'
import { OrbitControls } from '../libs/controls/OrbitControls.js';
import { OBJLoader } from '../libs/loaders/OBJLoader.js';
import { MTLLoader } from '../libs/loaders/MTLLoader.js';

let renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null, prueba = [], LEVEL = [];

let directionalLight = null, spotLight = null, ambientLight = null;

let SHADOW_MAP_WIDTH = 4096, SHADOW_MAP_HEIGHT = 4096;

let textureMap = null;
let materials = {};
let wallmap = "../images/Wall.jpeg";

function main()
{
    const canvas = document.getElementById("webglcanvas");

    createScene(canvas);

    const mapa = createMap(scene, LEVEL);

    update();
}

function update() 
{
    requestAnimationFrame(function() { update(); });
    
    // Render the scene
    renderer.render( scene, camera );


    // Update the camera controller
    orbitControls.update();
}

function createMaterials()
{

    //Para el Sol
    textureMap = new THREE.TextureLoader().load(wallmap);
    materials["wall"] = new THREE.MeshPhongMaterial({map: textureMap});

}

function createScene(canvas) 
{
    createMaterials();

    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    renderer.setSize(canvas.width, canvas.height);

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color (255, 255, 255 );

    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, -5, 20);

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
    
}

LEVEL = ['WWWWWWWWWWW','W..W...W..W','W.WWWPWWW.W','W..W...W..W','W.P..W..P.W','W..W...W..W','W.WWWPWWW.W','W..W...W..W','W.WWW.WWW.W','W..P.P.P..W','WWWWWWWWWWW'
];

//function createScene(canvas)
function createMap(scene, levelDefinition) {
    var map = {};
    map.bottom = -(levelDefinition.length - 1);
    map.top = 0;
    map.left = 0;
    map.right = 0;


    var x, y;
    for (var row = 0; row < levelDefinition.length; row++) {
        // Set the coordinates of the map so that they match the
        // coordinate system for objects.
        y = -row;

        map[y] = {};

        // Get the length of the longest row in the level definition.
        var length = Math.floor(levelDefinition[row].length / 2);
        //map.right = Math.max(map.right, length - 1);
        map.right = Math.max(map.right, length);

        // Skip every second element, which is just a space for readability.
        for (var column = 0; column < levelDefinition[row].length; column ++) {
            x = column;

            var cell = levelDefinition[row][column];
            var object = null;

            if (cell === 'W') {
                object = createWall();
            } else if (cell === '.') {
                object = createDot();
            }else if (cell === 'P') {
                object = createPower();
            }
            if (object !== null) {
                object.position.set(x, y, 0);
                map[y][x] = object;
                scene.add(object);
            }
        }
    }

    map.centerX = (map.left + map.right) / 2;
    map.centerY = (map.bottom + map.top) / 2;

    return map;
};



function createWall() {
    var wallGeometry = new THREE.BoxGeometry(1, 1, 2);
    var wall = new THREE.Mesh(wallGeometry, materials["wall"]);
    return wall;
  
};

function createDot() {
    var dotGeometry = new THREE.SphereGeometry( .2, 20, 20);
    var dotMaterial = new THREE.MeshPhongMaterial({ color: "yellow"}); // Paech color
    var dot = new THREE.Mesh(dotGeometry, dotMaterial);
    return dot;

};

function createPower() {
    var formGeometry = new THREE.SphereGeometry( .3, 20, 20 );
    var formMaterial = new THREE.MeshPhongMaterial({ color: "orange" }); // Paech color
    var form = new THREE.Mesh(formGeometry, formMaterial);
    return form;

};


main();