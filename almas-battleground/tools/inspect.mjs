import fs from 'node:fs';
import * as THREE from '../vendor/three.module.js';
import {GLTFLoader} from '../vendor/loaders/GLTFLoader.js';
globalThis.self=globalThis;globalThis.createImageBitmap=async()=>({width:1,height:1,close(){}});globalThis.ProgressEvent=class{};
for(const file of ['forest-mobile','soldier-mobile']){
 const b=fs.readFileSync(new URL('../assets/'+file+'.glb',import.meta.url));const g=await new GLTFLoader().parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');g.scene.updateMatrixWorld(true);
 const box=new THREE.Box3().setFromObject(g.scene);console.log(file,'box',box.min.toArray(),box.max.toArray());
 g.scene.traverse(o=>{if(o.isMesh&&file.startsWith('forest')){const b=new THREE.Box3().setFromObject(o);console.log(o.name,b.min.toArray(),b.max.toArray());}});
 console.log('clips',g.animations.map(c=>[c.name,c.duration]));
}
