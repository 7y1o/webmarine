import * as wm from '../../dist';
import './style.css';
import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera, Scene
} from "three";

console.log('Loc:', location.pathname);
if (location.pathname === '/') {
    new wm.CRenderEngine();
} else if (location.pathname === '/cube') {
    const engine = new wm.CRenderEngine();

    const cube = new Mesh(
        new BoxGeometry(),
        new MeshBasicMaterial({
            color: 0xffffff
        })
    );

    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    engine.scene.add(cube);

    engine.switch({camera});
    engine.prepareRenderAndStart();

    console.log(cube.position.x, cube.position.y, cube.position.z);
    console.log(camera.position.x, camera.position.y, camera.position.z);
    console.log(engine.running);
} else if (location.pathname === '/rotating-cube') {

}