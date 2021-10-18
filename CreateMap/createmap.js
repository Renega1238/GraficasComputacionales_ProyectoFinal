import * as THREE from "../libs/three.js/r131/three.module.js"
import { FlyControls } from "./FlyControls.js"

let str = " W x0.05 y1 z3 a0; W x8.05,y1,z3 a23&";
let coord = [];
let x = 0, y = 0, z = 0, a = 0; 
let state = 0; 

// Definimos variables a usar
let renderer = null, scene = null, camera = null;
let wall = null, wallGroup = null, ewallGroup = null;

// Variables para controlador
let controls, container;

const duration = 5000; // ms
let currentTime = Date.now();

function main() 
{
    const canvas = document.getElementById("webglcanvas");
    createScene(canvas);
    update();

}

function animate() 
{
    const now = Date.now();
    const deltat = now - currentTime;
    currentTime = now;
    const fract = deltat / duration;
    const angle = Math.PI * 2 * fract;

}

function update()
{
    requestAnimationFrame(function() { update(); });
    
    const delta = .02;
    controls.update(delta);

    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    animate();
}

// Aquí sucede todo
function createScene(canvas)
{   
    // Controles para el FlyControls
    container = document.createElement( 'div' );
    //document.body.appendChild( container );
    document.getElementById("move").appendChild( container );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );



    // Creamos el render
    //renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set ViewPort
    renderer.setSize(canvas.width, canvas.height);
    
    // Creamos la escena principal
    scene = new THREE.Scene();

    // Fondo
    //scene.background = new THREE.Color( 0.2, 0.2, 0.2 );

    // Debemos de añadir la camara para poder ver -.-
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 10;
    scene.add(camera);

    // Añadimos la dirección de la luz
    const light = new THREE.DirectionalLight( 0xffffff, 1.0);

    // Posicionamos la luz por fuera de la escena
    // La luz debe de estar apuntando al objeto
    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    scene.add(light);

    // Ilumina todos los objetos de manera pareja
    const ambientLight = new THREE.AmbientLight(0xffccaa, 0.2);
    scene.add(ambientLight);

    // Cargamos la textura de nuestros objetos y mapeamos el material a la variable material
    const textureUrl = "../img/ash_uvgrid01.jpg";
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });
    let geometry = null;

    getCoord(str);
    
    wallGroup = new THREE.Object3D;
    coord.forEach( (w) =>
    {
        //ewallGroup = new THREE.Object3D;
        geometry = new THREE.BoxGeometry(8,5,1);
        wall = new THREE.Mesh(geometry, material);
        wall.position.set(w.x, w.y, w.z);
        //ewallGroup.add(wall);
        wall.rotation.y = w.a;
        //wallGroup.add(wall);
        wallGroup.add(wall);
    });
    
    scene.add(wallGroup);
    // El handler para el mouse
    //addMouseHandler(canvas, shoulderGroup);
    //addMouseHandler(canvas, wallGroup);

    // Controles para FlyControls
    controls = new FlyControls( camera, renderer.domElement );

				controls.movementSpeed = 2500;
				controls.domElement = container;
				controls.rollSpeed = Math.PI / 6;
				controls.autoForward = false;
				controls.dragToLook = false;

}

function getCoord(str)
{
    let i = 0; 
    while(str[i] != null)
    {
         switch(state)
         {
             case 0: 
                
                if(str[i] == " " || str[i] == "\n")
                {
                    i++;
                }
                else if(str[i] == "W")
                {
                    
                    i++; 

                    state = 1; 

                }

                break;
            
            // Cuando encontramos una W
            case 1: 

                if(str[i] == " " || str[i] == "\n")
                {
                    i++;

                } // Fin de muro
                else if(str[i] == ";")
                {

                    i++;

                    state = 0; 

                }
                else if(str[i] == "x")
                {

                    i++;

                    state = 2;
                    
                }
                else if(str[i] == "y")
                {
                    
                    i++; 

                    state = 3; 

                }
                else if(str[i] == "z")
                {
                  
                    i++; 

                    state = 4; 

                }
                else if(str[i] == "a")
                {

                    i++; 

                    state = 5;

                }

                break;
            
            // Coord en X 
            case 2: 
                
                if(str[i] == " " || str[i] == "\n" || str[i] == "," || str[i] == null || str[i] == "&" || str[i] == ";")
                {
                    i++;

                    state = 1; 

                }
                else if(str[i] != " " && str[i] != "\n" && str[i] != "," && str[i] != null && str[i] != "&" && str[i] != ";")
                {
                    x += str[i++];
                }

                break;
            
            // Coord en Y 
            case 3: 
               
                if(str[i] == " " || str[i] == "\n" || str[i] == "," || str[i] == null || str[i] == "&" || str[i] == ";")
                {
                    i++;

                    state = 1; 

                }
                else if(str[i] != " " && str[i] != "\n" && str[i] != "," && str[i] != null && str[i] != "&" && str[i] != ";")
                {
                    y += str[i++];
                }

                break;

            // Coord en Z
            case 4: 

                if(str[i] == " " || str[i] == "\n" || str[i] == "," || str[i] == null || str[i] == "&" || str[i] == ";")
                {
                    
                    i++;

                    state = 1; 
                    //break;
                    
                }
                else if(str[i] != " " && str[i] != "\n" && str[i] != "," && str[i] != null && str[i] != "&" && str[i] != ";")
                {
                    z += str[i++]; 
                }
                
                break;
            
            case 5:

                if(str[i] == " " || str[i] == "\n" || str[i] == "," || str[i] == null || str[i] == "&" || str[i] == ";")
                {
                    i++;

                    x = parseFloat(x);
                    y = parseFloat(y);
                    z = parseFloat(z);
                    a = parseFloat(a);

                    //state = 5; 
                    coord.push({x: x, y: y, z: z, a: a});

                    x = 0; 
                    y = 0; 
                    z = 0; 
                    a = 0;

                    state = 0; 

                }
                else if(str[i] != " " && str[i] != "\n" && str[i] != "," && str[i] != null && str[i] != "&" && str[i] != ";")
                {
                    a += str[i++];
                }

                break;

         } 
    }
}

// Main
main();