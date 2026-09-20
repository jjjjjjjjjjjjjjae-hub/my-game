import json,struct,io,pathlib
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]
def optimize(src,out,limit):
 data=src.read_bytes(); n=struct.unpack_from('<I',data,12)[0]; g=json.loads(data[20:20+n]); binary=data[28+n:]
 imageviews={x['bufferView']:i for i,x in enumerate(g.get('images',[]))}
 chunks=[]; offset=0; before=0; after=0
 for i,b in enumerate(g['bufferViews']):
  raw=binary[b.get('byteOffset',0):b.get('byteOffset',0)+b['byteLength']]
  if i in imageviews:
   im=Image.open(io.BytesIO(raw)); before+=im.width*im.height*4
   im.thumbnail((limit,limit),Image.Resampling.LANCZOS); after+=im.width*im.height*4
   alpha=im.mode=='RGBA' and im.getextrema()[3][0]<255
   buf=io.BytesIO()
   if alpha: im.save(buf,format='PNG',optimize=True); mime='image/png'
   else: im.convert('RGB').save(buf,format='JPEG',quality=83,optimize=True); mime='image/jpeg'
   raw=buf.getvalue(); g['images'][imageviews[i]]['mimeType']=mime
  b['byteOffset']=offset; b['byteLength']=len(raw); b['buffer']=0
  raw+=b'\0'*((-len(raw))%4); chunks.append(raw); offset+=len(raw)
 g['buffers']=[{'byteLength':offset}]
 js=json.dumps(g,separators=(',',':')).encode(); js+=b' '*((-len(js))%4); binary=b''.join(chunks)
 out.write_bytes(struct.pack('<III',0x46546c67,2,28+len(js)+len(binary))+struct.pack('<II',len(js),0x4e4f534a)+js+struct.pack('<II',len(binary),0x004e4942)+binary)
 print(src.name, '->',out.name,round(len(data)/1024**2,1),'->',round(out.stat().st_size/1024**2,1),'MiB; decoded textures',round(before/1024**2),'->',round(after/1024**2),'MiB',flush=True)
for src,name in [(ROOT.parent/'upload/update_dirt_road_through_forest.glb','forest'),(ROOT.parent/'upload/game_ready_low_poly_character_tactical.glb','soldier')]:
 for quality,limit in [('mobile',512),('high',1024)]: optimize(src,ROOT/'assets'/f'{name}-{quality}.glb',limit)
