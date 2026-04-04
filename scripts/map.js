import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadMap(scene) {
    const loader = new GLTFLoader();
    loader.load('./assets/cap.glb', (gltf) => {
        const map = gltf.scene;
        // Картаны нық көрінуі үшін үлкейтеміз
        map.scale.set(15, 15, 15); 
        map.position.set(0, 0, 0);
        scene.add(map);
        console.log("Карта сәтті жүктелді!");
    }, undefined, (error) => {
        console.error("Карта жүктеу қатесі:", error);
    });
}

