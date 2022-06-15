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


//var tween1 = new TWEEN.Tween(camera.position).to({ z: '+1000' }, 10000).easing(TWEEN.Easing.Elastic.Out);
var tween1 = new TWEEN.Tween(camera.position).to({ x: `+${window.innerWidth / 10}` }, 1000).easing(TWEEN.Easing.Back.InOut);
//var tween3 = new TWEEN.Tween(camera.position).to({ z: '-1000' }, 10000).easing(TWEEN.Easing.Quadratic.Out);
//tween1.chain((tween2).chain(tween3));

let body = document.getElementsByTagName("body");
let pageX = 0.5;
let pageY = 0.5;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/*const geometry = new THREE.PlaneGeometry( 20000, 20000 );
let material = new THREE.MeshBasicMaterial( {color: 0x444444, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.position.x = 40;
plane.position.y = -10;
plane.rotation.x = Math.PI / 2;
console.log(plane.position)
scene.add( plane );*/

camera.position.set(0, 0, 40);

function getsize(object) {
    let boundingBox = new THREE.Box3().setFromObject(object);
    return boundingBox.getSize();
}

let model;
let loader = new GLTFLoader();
/*
loader.load(
    'scene.gltf',
    function (gltf) {
        // gltf.scene.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         const m = (child as THREE.Mesh)
        //         m.receiveShadow = true
        //         m.castShadow = true
        //     }
        //     if (((child as THREE.Light)).isLight) {
        //         const l = (child as THREE.Light)
        //         l.castShadow = true
        //         l.shadow.bias = -.003
        //         l.shadow.mapSize.width = 2048
        //         l.shadow.mapSize.height = 2048
        //     }
        // })
        model = gltf.scene
        console.log(model.position);
        model.position.z = 1030
        scene.add(model)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)*/

var size;
loader = new FontLoader();
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
        size: window.innerWidth / 200/*5*/,
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
loader.load('myfont2.json', function (font) {
    const txt1 = new TextGeometry('GitHub', {
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
    var textMesh3 = new THREE.Mesh(txt1, materials);
    textMesh3.name = "myText3";
    textMesh3.position.x = window.innerWidth / 10;
    scene.add(textMesh3)
    animate();
});


document.body.addEventListener('mousemove', (event) => {
    pageX = event.pageX / window.innerWidth;
    pageY = event.pageY / window.innerHeight;
});


document.body.addEventListener('click', () => {
    if (camera.position.z < 100) {
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
    scene.getObjectByName("myText3").rotation.x = (pageY - 0.5) * 2;
    //model.rotation.y = (pageX - 0.5) * 2;
    renderer.render(scene, camera);
}
