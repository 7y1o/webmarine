import {CRenderEngine} from '../../dist/index';
import {
    Box3,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera
} from "three";

console.log('Loc:', location.pathname);
if (location.pathname === '/') {
    new CRenderEngine();
} else if (location.pathname === '/cube') {
    const engine = new CRenderEngine({
        antialias: true
    });

    const cube = new Mesh(
        new BoxGeometry(),
        new MeshBasicMaterial({
            color: 0xffffff
        })
    );

    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    engine.scene.add(cube);

    engine.switch({camera});
    engine.prepareRenderAndStart();

    engine.pushTickStep((dt) => {
        cube.rotation.x += 10 * dt;
        cube.rotation.y += 10 * dt;
    });

    const fps = document.createElement('h1');
    fps.innerText = 'Counting...';
    fps.style.cssText = `
        font-size: 2rem;
        font-weight: 500;
        color: black;
        position: absolute;
        z-index: 10;
        top: 32px;
        left: 32px;
        padding: 16px 32px;
        background: rgba(255, 255, 255, .5);
        border-radius: 8px;
        user-select: none;
        cursor: default;
        backdrop-filter: blur(5px);
    `;
    document.body.append(fps);

    let deltaNow = 0;
    engine.pushTickStep((dt) => {
        deltaNow = dt;
    });

    setInterval(() => {
        fps.innerText = (1000 / (deltaNow * 10000)).toFixed(1) + ' fps';
    }, 500);

    console.log(cube.position.x, cube.position.y, cube.position.z);
    console.log(camera.position.x, camera.position.y, camera.position.z);
    console.log(engine.running);
} else if (location.pathname === '/rotating-cube') {

}