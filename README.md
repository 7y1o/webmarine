# WebMarine Core
Core utils for WebMarine game engine

### What is WebMarine Core?
WebMarine Core is a set of tools and tools for working with 3D graphics, physics, audio and game artificial 
intelligence. This library is used as the basis for the WebMarine game engine.

> ### Important note:
> WebMarine Core is not designed to be embedded in web pages, it completely replaces content on canvas.
> WMC is only used for canvas and WebGL development. 

### How to use WMC?
First, the library needs to be installed:

```shell
npm i webmarine-core
```

Next, in the main script file, you need to register:

```typescript
import {GameEngine} from "webmarine-core";
const engine = new GameEngine({
    audioEnabled: true, // does the game need audio
    physicsEnabled: true, // does the game need physics 
    render: { // render engine configuration
        antialias: true, // smoothing object boundaries
        precision: 'mediump', // quality of shaders in the game
        alpha: false, // does canvas need transparency
        powerPreference: 'high-performance' // determines resource consumption by the game
    }
});
```

WMC will clean up the document body and embed the canvas itself.