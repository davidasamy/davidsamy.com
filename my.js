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


var tween1 = new TWEEN.Tween(camera.position).to({ x: `+${window.innerWidth / 10}` }, 1000).easing(TWEEN.Easing.Back.InOut);


let body = document.getElementsByTagName("body");
let pageX = 0.5;
let pageY = 0.5;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

var map = new THREE.TextureLoader().load("github.png");
var material = new THREE.SpriteMaterial({ map: map, color: 0xffffff });
const sprite = new THREE.Sprite(material);
sprite.scale.set(35, 35, 1)
sprite.position.x = window.innerWidth / 10;
sprite.position.z = -20


camera.position.set(0, 0, 40);


var size;
let loader = new FontLoader();
loader.load('myfont2.json', function (font) {
    const txt1 = new TextGeometry('WORK IN PROGRESS', {
        font: font,
        size: window.innerWidth / 833.3333,
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
    textMesh2.position.y -= window.innerWidth / 250
});
loader.load('myfont.json', function (font) {
    const txt1 = new TextGeometry('davidsamy.com', {
        font: font,
        size: window.innerWidth / 200,
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
    console.log(textMesh1.height);
    scene.add(textMesh1)
    animate();
});
var uptween;
var downtween;
loader.load('myfont2.json', function (font) {
    const txt1 = new TextGeometry('GitHub', {
        font: font,
        size: window.innerWidth / 150,
        height: 1,
        curveSegments: 50,
        bevelEnabled: true,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.6,
        bevelThickness: 0.2
    });
    txt1.center();
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0xffffff }), // front
        new THREE.MeshStandardMaterial({ color: 0x000000 }) // side
    ];
    var textMesh3 = new THREE.Mesh(txt1, materials);
    textMesh3.name = "myText3";
    textMesh3.position.x = window.innerWidth / 10;
    textMesh3.position.y = -5
    uptween = new TWEEN.Tween(textMesh3.position).to({ y: `+${10}` }, 2000).easing(TWEEN.Easing.Exponential.InOut
    );
    downtween = new TWEEN.Tween(textMesh3.position).to({ y: `-${10}` }, 2000).easing(TWEEN.Easing.Exponential.InOut
    );
    uptween.chain(downtween);
    downtween.chain(uptween);
    scene.add(textMesh3)
    animate();
});


document.body.addEventListener('mousemove', (event) => {
    pageX = event.pageX / window.innerWidth;
    pageY = event.pageY / window.innerHeight;
});


document.body.addEventListener('click', () => {
    if (camera.position.x < window.innerWidth / 10) {
        tween1.start();
        uptween.start();
        scene.add(sprite);
    }
    else if (camera.position.x < (window.innerWidth / 10) * 2) {
        tween1.start();
        scene.remove(sprite);
    }
    else {
        console.log('Error No More To Display')
    }
});

scene.background = new THREE.Color(0x333333);

var light = new THREE.AmbientLight(0xffffff);

scene.add(light);

var tween1 = new TWEEN.Tween(camera.position).to({ x: `+${window.innerWidth / 10}` }, 1000).easing(TWEEN.Easing.Back.InOut);


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
    if (camera.position.x == window.innerWidth / 10) {
        scene.getObjectByName("myText3").rotation.y = (pageX - 0.5) * 2;
        sprite.rotation.y = (pageX - 0.5) * 2;

    }
    //model.rotation.y = (pageX - 0.5) * 2;
    renderer.render(scene, camera);
}
