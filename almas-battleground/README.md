# Almas Battleground — Forest v0.1

A static third-person survival prototype for GitHub Pages, with the supplied forest and animated tactical character. Single player against four local bots; multiplayer is not implemented.

## Play

- Desktop: WASD, mouse look (click the scene to lock the cursor; drag fallback), left mouse fire, right mouse aim, Shift run, Space jump, C crouch, R reload, Esc pause.
- Touch: left joystick, swipe the right side to look, fire/aim/reload/jump/crouch/run buttons. Landscape recommended.
- Win by defeating all four bots. A safe zone shrinks after 30 seconds. Outside the zone, health is lost. You can restart after winning or dying.

## Run locally

Run `python -m http.server 8080` from this folder and open http://localhost:8080/ . Do not open index.html as a file URL. Windows users can run START_GAME.cmd if Python is installed.

## GitHub Pages

This folder is self-contained and can be served from a repository subdirectory. Every asset path is relative. No build, API keys, third-party CDN, account registration, or paid services are needed. Requires a modern browser with WebGL 2 and DecompressionStream.

## Performance

- Mobile models: about 21.5 MiB combined transfer; high models: about 37 MiB.
- Mobile decoded textures reduced from about 1,314 MiB to about 77 MiB, before GPU mipmaps and other memory.
- Precomputed terrain height field, static triangle collision hierarchy, capped pixel ratio, automatic render resolution adaptation, shared bot geometry/textures, capped frame delta, paused hidden tabs, no real-time shadow maps.
- Original geometry is retained. FPS depends on GPU, screen resolution, browser and thermal state. Real-device frame rate has not been certified; no universal no-stutter guarantee.
- Graphics preset applies on load. Reload the page to select another preset.

The supplied glove skin is malformed and excluded from the scene. Collision is approximate at foot height; bots use simple pursuit/line-of-sight rather than a navigation mesh. This is a playable prototype, not a complete battle royale release.

## Assets and tooling

See CREDITS.md for source and license attribution. vendor/ contains Three.js r180. tools/optimize.py creates texture variants from the original uploaded GLBs, and tools/terrain.mjs precomputes terrain using local vendor modules. Original 228 MiB source uploads are not included in the published folder.
