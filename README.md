# Webmarine Core
The core of the Webmarine game engine

## Installation:
```shell
npm i webmarine-core
```

## Example
```typescript
import {initWM, Entity, EntityType, BaseMaterial} from 'webmarine-core'

// Initializing the kernel
const wm = initWM();

// Create a plane, material for it and place it on the scene
const plane = new Entity(EntityType.Plane);
plane.material = new BaseMaterial({
    color: 0xFFFFFF
});
wm.scene.add(plane);

// Create a cube, material for it and also place it on the scene.
const box = new Entity(EntityType.Cube);
box.material = BaseMaterial({
    color: 0xFF0059
});
wm.scene.add(box);

// Rotating the cube
wm.loop.addStep(dt => { // dt = delta time
    box.rotation.x += 10 * dt;
    box.rotation.y += 15 * dt;
});

// Launching the render
wm.loop.run();
```

## Used technologies
+ [THREE](https://threejs.org) - audio and render engines
+ [Cannon](https://www.npmjs.com/package/cannon) - physics engine
+ [Esbuild](https://esbuild.github.com/) - Bundling, packaging