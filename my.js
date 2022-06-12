import { GLTFLoader } from "./GLTFLoader.js";
import { FontLoader } from "./FontLoader.js";
import { TextGeometry } from "./TextGeometry.js";
import { OrbitControls } from "./OrbitControls.js";
import { TWEEN } from "./tween.module.min.js"
//import { ImageLoader } from "./ImageLoader.js";
var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);


var tween1 = new TWEEN.Tween(camera.position).to({z: '+100'}, 1000).easing(TWEEN.Easing.Quadratic.In);
var tween2 = new TWEEN.Tween(camera.position).to({x: '+100'}, 500);
var tween3 = new TWEEN.Tween(camera.position).to({z: '-100'}, 1000).easing(TWEEN.Easing.Quadratic.Out);
tween1.chain((tween2).chain(tween3));

let body = document.getElementsByTagName("body");
let pageX = 0.5;
let pageY = 0.5;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


camera.position.set(0,0,40);




let loader = new GLTFLoader();

loader.load(
// resource URL
'scene.gltf',
// called when the resource is loaded
function ( gltf ) {

    scene.add( gltf.scene );

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

},
// called while loading is progressing
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

    console.log( 'An error happened' );

}
);

loader = new FontLoader();
loader.load('myfont2.json', function (font) {
    const txt1 = new TextGeometry('WORK IN PROGRESS', {
        font: font,
        size: 1.2,
        height: 0.5,
        curveSegments: 50,
        bevelEnabled: false,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.3,
        bevelThickness: 0.2
    });
    txt1.center();
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0xffffff }), // front
        new THREE.MeshStandardMaterial({ color: 0x777777 }) // side
    ];
    var textMesh2 = new THREE.Mesh(txt1, materials);
    textMesh2.name = "myText1";
    scene.add(textMesh2)
    textMesh2.position.y -= 4
});
loader.load('myfont.json', function (font) {
    const txt1 = new TextGeometry('davidsamy.com', {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 50,
        bevelEnabled: true,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.3,
        bevelThickness: 0.2
    });
    txt1.center();
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0xffffff }), // front
        new THREE.MeshStandardMaterial({ color: 0x777777 }) // side
    ];
    var textMesh1 = new THREE.Mesh(txt1, materials);
    textMesh1.name = "myText";
    scene.add(textMesh1)
    animate();
});


document.body.addEventListener('mousemove', (event) => {
    pageX = event.pageX / window.innerWidth;
    pageY = event.pageY / window.innerHeight;
});


document.body.addEventListener('click', () => {
    if (camera.position.x < 100) {
        tween1.start();
    }
    else {
        console.log('Error No More To Display')
    }
});

scene.background = new THREE.Color(0x222222);
// scene.background = new THREE.TextureLoader().load( "background.jpg" );
//  var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
var light = new THREE.AmbientLight(0xffffff);

scene.add(light);



function animate() {
    requestAnimationFrame(animate);
    TWEEN.update()
    render();
}

function render() {
scene.getObjectByName("myText").rotation.x = (pageY - 0.5) * 2;
scene.getObjectByName("myText").rotation.y = (pageX - 0.5) * 2;
scene.getObjectByName("myText1").rotation.x = (pageY - 0.5) * 2;
scene.getObjectByName("myText1").rotation.y = (pageX - 0.5) * 2;
renderer.render(scene, camera);
}
