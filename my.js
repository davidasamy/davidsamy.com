import {
    GLTFLoader
} from "./GLTFLoader.js";
import {
    FontLoader
} from "./FontLoader.js";
import {
    TextGeometry
} from "./TextGeometry.js";
import {
    OrbitControls
} from "./OrbitControls.js";
import {
    TWEEN
} from "./tween.module.min.js"
import {
    Sprite
} from "./three.module.js";
//import { ImageLoader } from "./ImageLoader.js";
var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
const move_segment = window.innerWidth / 10 + 200
var current_slide = 1;
let intween = false;
var forward = new TWEEN.Tween(camera.position).to({
    x: `+${move_segment}`
}, 1500).easing(TWEEN.Easing.Back.InOut);
var backward = new TWEEN.Tween(camera.position).to({
    x: `-${move_segment}`
}, 1500).easing(TWEEN.Easing.Back.InOut);
forward.onComplete(function() {
    intween = false
})
backward.onComplete(function() {
    intween = false
})

let body = document.getElementsByTagName("body");
let pageX = 0.5;
let pageY = 0.5;
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


var map = new THREE.TextureLoader().load("github.png");
var material = new THREE.SpriteMaterial({
    map: map,
    color: 0xffffff
});
const github = new THREE.Sprite(material);
github.scale.set(35, 35, 1)
github.position.x = move_segment;
github.position.z = -20
scene.add(github);

var map = new THREE.TextureLoader().load("twitter.png");
var material = new THREE.SpriteMaterial({
    map: map,
    color: 0xffffff
});
const twitter = new THREE.Sprite(material);
twitter.scale.set(40, 40, 1)
twitter.position.x = 2 * (move_segment);
twitter.position.z = -20
twitter.position.y = 0
scene.add(twitter);

camera.position.set(0, 0, 40);


var size;
let loader = new FontLoader();
loader.load('myfont2.json', function(font) {
    const txt1 = new TextGeometry('WELCOME TO MY SITE', {
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
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        }), // front
        new THREE.MeshStandardMaterial({
            color: 0x777777
        }) // side
    ];
    var textMesh2 = new THREE.Mesh(txt1, materials);
    textMesh2.name = "myText1";
    scene.add(textMesh2)
    textMesh2.position.y -= window.innerWidth / 250
});
loader.load('myfont.json', function(font) {
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
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        }), // front
        new THREE.MeshStandardMaterial({
            color: 0x777777
        }) // side
    ];
    var textMesh1 = new THREE.Mesh(txt1, materials);
    textMesh1.name = "myText";
    scene.add(textMesh1)
    animate();
});
var uptween;
var downtween;
loader.load('myfont2.json', function(font) {
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
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        }), // front
        new THREE.MeshStandardMaterial({
            color: 0x000000
        }) // side
    ];
    var textMesh3 = new THREE.Mesh(txt1, materials);
    textMesh3.name = "myText3";
    textMesh3.position.x = move_segment;
    textMesh3.position.y = -5
    uptween = new TWEEN.Tween(textMesh3.position).to({
        y: `+${10}`
    }, 2000).easing(TWEEN.Easing.Exponential.InOut);
    downtween = new TWEEN.Tween(textMesh3.position).to({
        y: `-${10}`
    }, 2000).easing(TWEEN.Easing.Exponential.InOut);
    uptween.chain(downtween);
    downtween.chain(uptween);
    scene.add(textMesh3)
});
var uptween2;
var downtween2;
loader.load('myfont2.json', function(font) {
    const txt1 = new TextGeometry('Twitter', {
        font: font,
        size: window.innerWidth / 150,
        height: window.innerWidth / 750,
        curveSegments: 50,
        bevelEnabled: true,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.6,
        bevelThickness: 0.2
    });
    txt1.center();
    const materials = [
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        }), // front
        new THREE.MeshStandardMaterial({
            color: 0x1373ad
        }) // side
    ];
    var textMesh4 = new THREE.Mesh(txt1, materials);
    textMesh4.name = "myText4";
    textMesh4.position.x = 2 * (move_segment);
    textMesh4.position.y = -5
    uptween2 = new TWEEN.Tween(textMesh4.position).to({
        y: `+${10}`
    }, 2000).easing(TWEEN.Easing.Exponential.InOut);
    downtween2 = new TWEEN.Tween(textMesh4.position).to({
        y: `-${10}`
    }, 2000).easing(TWEEN.Easing.Exponential.InOut);
    uptween2.chain(downtween2);
    downtween2.chain(uptween2);
    scene.add(textMesh4)
    animate();
});


document.body.addEventListener('mousemove', (event) => {
    pageX = event.pageX / window.innerWidth;
    pageY = event.pageY / window.innerHeight;
});


function next() {
    if (current_slide == 1 && intween == false) {
        forward.start();
        uptween.start();
        intween = true;
        current_slide++;
    } else if (current_slide == 2 && intween == false) {
        forward.start();
        intween = true;
        current_slide++;
        uptween2.start()
    } else {
        console.log('Error No More To Display')
    }
}

function previous() {
    if (current_slide == 1) {
        console.log('Error No More To Display')
    } else if (current_slide == 2 && intween == false) {
        backward.start();
        intween = true;
        current_slide--;
    } else if (intween == false) {
        backward.start();
        intween = true;
        current_slide--;
    }
}
document.getElementById("rightarr").addEventListener('click', next);
document.getElementById("leftarr").addEventListener('click', previous);

scene.background = new THREE.Color(0x333333);

var light = new THREE.AmbientLight(0xffffff);

scene.add(light);

var tween1 = new TWEEN.Tween(camera.position).to({
    x: `+${window.innerWidth / 10}`
}, 1000).easing(TWEEN.Easing.Back.InOut);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function clickOnSprite(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObject(github, true);
    if (intersects.length == 1 && current_slide == 2) {
        console.log("clicked github");
        window.open("https://github.com/davidasamy", "_blank");
    }
    intersects = raycaster.intersectObject(twitter, true);
    if (intersects.length == 1 && current_slide == 3) {
        console.log("clicked twitter");
        window.open("https://twitter.com/davidsamy_", "_blank");
    }
}

document.addEventListener("click", clickOnSprite)

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
    if (current_slide == 2) {
        scene.getObjectByName("myText3").rotation.y = (pageX - 0.5) * 2;
    }
    if (current_slide == 3) {
        scene.getObjectByName("myText4").rotation.y = (pageX - 0.5) * 2;
    }
    //model.rotation.y = (pageX - 0.5) * 2;
    renderer.render(scene, camera);
}