import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'; // FBX үшін керек
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 1. Сцена, Камера және Аспан (Кеңістік сезімі)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Көгілдір аспан түсі
scene.fog = new THREE.Fog(0x87ceeb, 100, 2000); // 100-ден 2000 метрге дейін жұмсақ тұман

// Камераны алыстатып, көру шегін (2000) үлкейттік
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 30, 80); // Камераны жоғары көтеріп (30) және артқа шегердік (80)

// 2. Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace; // Түстерді шынайы көрсету
document.body.appendChild(renderer.domElement);

// 3. Басқару құралы (Ортаны айналдыру үшін)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0); // Ортаға бағыттау

// 4. Жарықтандыру (Нағыз далаға ұқсату)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(20, 40, 30);
scene.add(directionalLight);

// 5. Карта мен Кейіпкерді жүктеу

// а) Картаны жүктеу (cap.glb)
const gltfLoader = new GLTFLoader();
const tileSize = 20; // Бір шөп плиткасының өлшемі
const gridCount = 10; // 10x10 плитка (жалпы 100 плитка)

gltfLoader.load('./assets/cap.glb', (gltf) => {
    const baseMap = gltf.scene;
    baseMap.scale.set(tileSize, tileSize, tileSize); // Плитканы үлкейту

    // Плиткаларды 10x10 тор түрінде орналастыру (кең карта)
    for (let i = 0; i < gridCount; i++) {
        for (let j = 0; j < gridCount; j++) {
            const modelClone = baseMap.clone(); // Негізгі модельді көшіру
            
            // Координаттарды есептеп, плиткаларды орналастыру
            const posX = (i - gridCount / 2) * tileSize;
            const posZ = (j - gridCount / 2) * tileSize;
            modelClone.position.set(posX, 0, posZ);
            
            scene.add(modelClone);
        }
    }
    
    console.log(`Кең карта дайын! ${gridCount * gridCount} плитка қосылды.`);
});

// б) Кейіпкерді жүктеу (player2.fbx)
const fbxLoader = new FBXLoader();
let player; // Кейіпкерді басқару үшін айнымалы

fbxLoader.load(
    './assets/player2.fbx', 
    (object) => {
        player = object;
        
        // Кейіпкер мен Карта арасындағы өлшемді реттеу ( Scale-ді 10 есе кішірейттік )
        player.scale.set(0.005, 0.005, 0.005); 
        
        // Кейіпкерді картаның ортасына, шөптің үстіне қою
        player.position.set(0, 0, 0); 
        
        scene.add(player);
        console.log("FBX Кейіпкер жүктелді!");
    }, 
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% жүктелді');
    }, 
    (error) => {
        console.error("FBX жүктеу қатесі:", error);
    }
);

// 6. Анимация (Жаңарту)
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Басқаруды жаңарту
    renderer.render(scene, camera);
}

// Экран өлшемі өзгергенде түзету
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

