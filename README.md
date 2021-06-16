# WebMarine Core
Core utils for WebMarine game engine.

> ### IMPORTANT NOTE
> WebMarine Core is designed for game development only, 
> so it is not at all suitable for embedding the 
> canvas in an existing web page.

### Installation
First you need to install the package:
```shell
npm i @7y1o/webmarine-core
```
Next, in the main script (index.js or main.js, for example) write the following lines:
```typescript
import {WMGameEngine} from "@7y1o/webmarine-core";

// ^ - import, initialize - v
const engine = new WMGameEngine();
```
Game engine will clear document and place canvas automatically.
Now you can use our documentation for the next steps. Good luck! :)

### Examples
#### Simple white cube with rotating animation:
```typescript
import {WMRenderEngine, WMEntityUtils} from "@7y1o/webmarine-core";

// Creating game engine instance
const engine = new WMRenderEngine();

// Creating the cube and add it to the scene
const cube = WMEntityUtils.mesh.cube();
engine.scene.add(cube);

// Configuring camera parameters
engine.camera.position.set(5, 5, 5);
engine.camera.lookAt(0, 0, 0);

// Set cube rotation
engine.addUpdate(dt => {
    cube.rotation.x += .1 * dt;
    cube.rotation.z += .1 * dt;
});

// Starting render
engine.prepareAndStart();
```
___
#### Loading 3d model
```typescript
import {WMRenderEngine, WMEntityUtils} from "@7y1o/webmarine-core";

// Do actions from previous example with init, camera and render start
const engine = new WMRenderEngine();
engine.camera.position.set(5, 5, 5);
engine.camera.lookAt(0, 0, 0);
engine.prepareAndStart();

// Loading glTF model and place it on the scene
let model = null; 
WMEntityUtils.mesh.gltf('sample-model.gltf').then(entity => {
    model = entity;
    engine.scene.add(model); 
});
```
___
#### Creating PBR material
```typescript
import {WMRenderEngine, WMEntityUtils} from '@7y1o/webmarine-core';

// Do action from previous example again
const engine = new WMRenderEngine();
engine.camera.position.set(5, 5, 5);
engine.camera.lookAt(0, 0, 0);
engine.prepareAndStart();

// Creating mesh and PBR material for it with default parameters
const mesh = WMEntityUtils.mesh.sphere();
mesh.material = WMEntityUtils.material.pbr();
engine.scene.add(mesh);

// Adding light
const light = WMEntityUtils.light.directional();
engine.scene.add(light);
```