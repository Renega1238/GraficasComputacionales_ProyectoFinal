import * as THREE from '../libs/three.module.js'
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';
import { FirstPersonControls } from '../libs/controls/FirstPersonControls.js';

let cameraControllsFirstPerson = null, renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null, prueba = [], LEVEL = [];
let directionalLight = null, spotLight = null, ambientLight = null;

let SHADOW_MAP_WIDTH = 4096, SHADOW_MAP_HEIGHT = 4096;

let textureMap = null;
let materials = {};
let wallmap = "../images/Wall.jpeg";

var clock = new THREE.Clock();


function main()
{
    const canvas = document.getElementById("webglcanvas");

    createScene(canvas);

    const mapa = createMap(scene, LEVEL);

    update();
}

function update() 
{
    var delta = clock.getDelta();
    
    requestAnimationFrame(function() { update(); });
    
    // renderizar a partir de la camara
    renderer.render( scene, camera );


    //Actualiza el control de la camara
    cameraControllsFirstPerson.update(delta);
}

function createMaterials()
{
    //Para cargar el material de las paredes se hace un map 
    textureMap = new THREE.TextureLoader().load(wallmap);
    //Se guarda el material "wall" en el arreglo
    materials["wall"] = new THREE.MeshPhongMaterial({map: textureMap});

}
function createScene(canvas) 
{
    //Se crean los materiales
    createMaterials();
    
    //Se crea el renderer asignandose al canvas del documento html y con sus parametros
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    renderer.setSize(canvas.width, canvas.height);

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    //Se asigna un fondo a la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color (255, 255, 255 );
    //Se crea la camara
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, -5, 20);

    cameraControllsFirstPerson = new FirstPersonControls(camera);
    cameraControllsFirstPerson.lookSpeed = .1;
    cameraControllsFirstPerson.movementSpeed = 10;

      
    /* 
    * Luz direccional
    * Esta luz se posiciona en un plano infinitamente lejano y ilumina hacia una dirección
    */
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

    // Ambient Light ilumina todos los elementos de la escena de manera pareja
    ambientLight = new THREE.AmbientLight ( 0x444444, 0.8);
    scene.add(ambientLight);
    
}

LEVEL = [
'WWWWWWWWWWWWWWWWWWWWWWWWWWWW',
'W............WW............W',
'W.WWWW.WWWWW.WW.WWWWW.WWWW.W',
'WPWWWW.WWWWW.WW.WWWWW.WWWWPW',
'W.WWWW.WWWWW.WW.WWWWW.WWWW.W',
'W..........................W',
'W.WWWW.WW.WWWWWWWW.WW.WWWW.W',
'W.WWWW.WW.WWWWWWWW.WW.WWWW.W',
'W......WW....WW....WW......W',
'WWWWWW.WWWW  WW  WWWW.WWWWWW',
'WWWWWW.WWWW  WW  WWWW.WWWWWW',
'WWWWWW.WW          WW.WWWWWW',
'WWWWWW.WW WWWWWWWW WW.WWWWWW',
'WWWWWW.WW W      W WW.WWWWWW',
'      .   W      W   .      ',
'WWWWWW.WW W      W WW.WWWWWW',
'WWWWWW.WW WWWWWWWW WW.WWWWWW',
'WWWWWW.WW          WW.WWWWWW',
'WWWWWW.WW WWWWWWWW WW.WWWWWW',
'WWWWWW.WW WWWWWWWW WW.WWWWWW',
'W............WW............W',
'W.WWWW.WWWW..WW..WWWW.WWWW.W',
'W.WWWW.WWWW..WW..WWWW.WWWW.W',
'WP..WW................WW..PW',
'WWW.WW.WW.WWWWWWWW.WW.WW.WWW',
'WWW.WW.WW.WWWWWWWW.WW.WW.WWW',
'W......WW....WW....WW......W',
'W.WWWWWWWWWW.WW.WWWWWWWWWW.W',
'W.WWWWWWWWWW.WW.WWWWWWWWWW.W',
'W..........................W',
'WWWWWWWWWWWWWWWWWWWWWWWWWWWW',
];

function createMap(scene, levelDefinition) {
    var map = {};
    map.bottom = -(levelDefinition.length - 1);
    map.top = 0;
    map.left = 0;
    map.right = 0;


    // Se puede leer el mapa como una arreglo de arreglos
    // [ [] , [] ] 
    var x, y, z;
    for (var row = 0; row < levelDefinition.length; row++) {
        /* 
        Se asignan las coordenadas del mapa para que concuerden con
        el sistema de coordenadas para objetos
        */
        z = -row;

        map[z] = {};

        // Se obtiene la longitud de la fila más larga de la definicion del mapa
        var length = Math.floor(levelDefinition[row].length / 2);
        //map.right = Math.max(map.right, length - 1);
        map.right = Math.max(map.right, length);

        // Salta cada segundo elemento, el cual solo es para mejorar la lectura
        for (var column = 0; column < levelDefinition[row].length; column ++) {
            x = column;

            var cell = levelDefinition[row][column];
            var object = null;

            // Cada W representa un muro
            if (cell === 'W') {
                object = createWall();
            // Cada punto representa un punto 
            } else if (cell === '.') {
                object = createDot();
            // Cada P representa un powerUp
            }else if (cell === 'P') {
                object = createPower();
            }
            if (object !== null) {
                //Se guarda el nuevo objeto al arreglo de mapa
                object.position.set(x, 0, z);
                map[z][x] = object;
                scene.add(object);
            }
        }
    }

    // Despues de crear el mapa se establece el centro del mapa
    map.centerX = (map.left + map.right) / 2;
    map.centerY = (map.bottom + map.top) / 2;

    return map;
};


// Funciones auxiliares
// Creamos el Muro 
function createWall() {
    var wallGeometry = new THREE.BoxGeometry(1, 2, 1);
    var wall = new THREE.Mesh(wallGeometry, materials["wall"]);
    return wall;
  
};

// Creamos el punto 
function createDot() {
    var dotGeometry = new THREE.SphereGeometry( .2, 20, 20);
    var dotMaterial = new THREE.MeshPhongMaterial({ color: "yellow"}); // Paech color
    var dot = new THREE.Mesh(dotGeometry, dotMaterial);
    return dot;

};

// Creamos el powerUP
function createPower() {
    var formGeometry = new THREE.SphereGeometry( .3, 20, 20 );
    var formMaterial = new THREE.MeshPhongMaterial({ color: "orange" }); // Paech color
    var form = new THREE.Mesh(formGeometry, formMaterial);
    return form;

};


main();