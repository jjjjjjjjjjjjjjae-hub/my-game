import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

// 1. Сахнаны құру
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0a0a0); // Сұр түсті аспан (қара экран болмауы үшін)
scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

// 2. Камера
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(100, 200, 300);

// 3. Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Жарық (Модель көрінуі үшін міндетті)
const hemiLight = new THREE.HemisphereLight(0xffxfff, 0x444444, 5);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(0, 200, 100);
scene.add(dirLight);

// 5. Жер (Тор көз)
const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

// 6. FBX Модельді жүктеу
const loader = new FBXLoader();
// ЕСКЕРТУ: assets/ алдында "/" болмауы керек!
loader.load('assets/player2.fbx', (object) => {
    object.scale.set(0.5, 0.5, 0.5); // Модель тым үлкен болса кішірейту
    scene.add(object);
    console.log("Модель жүктелді!");
}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% жүктелді');
}, (error) => {
    console.error('Қате шықты:', error);
});

// 7. Анимация
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Терезе өлшемі өзгергенде бейімделу
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

