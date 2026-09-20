import fs from 'node:fs';import * as T from '../vendor/three.module.js';import {GLTFLoader} from '../vendor/loaders/GLTFLoader.js';
globalThis.self=globalThis;globalThis.createImageBitmap=async()=>({width:1,height:1,close(){}});globalThis.ProgressEvent=class{};
const read=async name=>{const b=fs.readFileSync(new URL('../assets/'+name+'.glb',import.meta.url));return new GLTFLoader().parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');};
const f=await read('forest-mobile');f.scene.position.set(-16.088,-161.695,-1.661);f.scene.updateMatrixWorld(true);
const grounds=[],solid=[];f.scene.traverse(o=>{if(o.isMesh){if(/Dirt_Road|Ground_Dirt|Terrain_Far|Aerial_Grass|Cobblestone|Sloped_Rock|Tall_Cliff|Broken_Rocks/.test(o.name))grounds.push(o);if(/Trunk_|Wood_Fence|Wood_Log|Metal_Fence|Tall_Cliff|Broken_Rocks/.test(o.name))solid.push(o);}});
const minX=-100,minZ=-60,step=1,w=191,h=151,heights=[];const ray=new T.Raycaster();ray.ray.direction.set(0,-1,0);
for(let z=0;z<h;z++)for(let x=0;x<w;x++){ray.ray.origin.set(minX+x*step,150,minZ+z*step);const hit=ray.intersectObjects(grounds,false)[0];heights.push(hit?Math.round(hit.point.y*100)/100:null);}
fs.writeFileSync(new URL('../assets/terrain.json',import.meta.url),JSON.stringify({minX,minZ,step,w,h,heights}));console.log('terrain',heights.filter(x=>x!==null).length,'spawn',heights[(55-minZ)*w+(-10-minX)]);
const s=await read('soldier-mobile');const mixer=new T.AnimationMixer(s.scene);mixer.clipAction(s.animations[0]).play();mixer.update(.4);s.scene.updateMatrixWorld(true);console.log('animated bounds',new T.Box3().setFromObject(s.scene,true));s.scene.traverse(o=>{if(o.isMesh)console.log(o.name,o.isSkinnedMesh,new T.Box3().setFromObject(o,true).getSize(new T.Vector3()).toArray());});
