import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export function loadPlayer(scene) {
    const loader = new FBXLoader();
    loader.load('./assets/player2.fbx', (object) => {
        const player = object;
        // Кейіпкер картаға сәйкес болуы үшін кішірейтеміз
        player.scale.set(0.008, 0.008, 0.008); 
        player.position.set(0, 0, 5); 
        scene.add(player);
        console.log("Кейіпкер сәтті жүктелді!");
    }, undefined, (error) => {
        console.error("Кейіпкер жүктеу қатесі:", error);
    });
}

