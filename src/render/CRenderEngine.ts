import {Camera, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import IRenderConfig from "./references/IRenderConfig";
import IRenderEngineSwitch from "./references/IRenderEngineSwitch";
import chalk from "chalk";
import CLogger, {Logtype} from "../utils/CLogger";

/**
 * @brief Class Render Engine
 * Initialize graphics render engine
 */
export default class CRenderEngine {
    private render: WebGLRenderer;
    private cCam: Camera;
    private cScene: Scene;
    private readonly tickSteps: ((number) => void)[];
    private isRunning: boolean;

    /** Construct CRenderEngine */
    public constructor(config?: IRenderConfig) {
        // Create main canvas
        const playCanvas = document.createElement('canvas');

        // Create renderer instance
        this.render = new WebGLRenderer(
            Object.assign(
                {},
                config,
                {
                    canvas: playCanvas
                }
            )
        );


        // Create base camera and scene
        this.cCam = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, .1, 1000);
        this.cScene = new Scene();

        // Initialize tick steps array
        this.tickSteps = [];

        // Add canvas to the page
        document.body.innerHTML = '';
        playCanvas.style.cssText = `
            position: fixed:
            z-index: 100;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            padding: 0;
            margin: 0;
        `;
        document.body.append(playCanvas);

        // Set default value for isRunning bool
        this.isRunning = false;
    }

    /** Switch current camera */
    public switchCamera(newCam: Camera): void {
        this.cCam = newCam;
    }

    /** Switch current scene */
    public switchScene(newScene: Scene): void {
        this.cScene = newScene;
    }

    /** Switch current camera or scene */
    public switch(query: IRenderEngineSwitch): void {
        // Switch camera if exists
        if (query.camera) {
            this.cCam = query.camera;
        }

        // Switch scene if exists
        if (query.scene) {
            this.cScene = query.scene;
        }

        // Show warning if query data doesn't contains scene or camera
        if (!query.scene && !query.camera) {
            CLogger.show(`used ${chalk.underline('switch')} with empty data in query`, Logtype.WARN);
        }
    }

    /** Get access to the scene */
    public get scene(): Scene {
        return this.cScene;
    }

    /** Get access to the scene */
    public get camera(): Camera {
        return this.cCam;
    }

    /** Get isRunning boolean */
    public get running(): boolean {
        return this.isRunning;
    }

    /** Add step to the tick. Warning: don't push hard algorithms, it may decrease performance! */
    public pushTickStep(fn: (number) => void): void {
        this.tickSteps.push(fn);
    }

    /** Prepare render before start. Compiles WASM scripts, shaders and a little bit more actions.
     * After all running render loop */
    public prepareRenderAndStart(): void {
        if(!this.isRunning) {
            this.render.compile(this.cScene, this.cCam);
            this.start();
            this.isRunning = true;
        } else {
            CLogger.show(
                `Cannot execute ${chalk.underline('prepareRenderAndRun')}: already running render`,
                Logtype.ERROR
            );
        }
    }

    /** Start render */
    public start(): void {
        if(!this.isRunning) {
            let beginTime = Date.now();
            this.loop(beginTime);
            this.isRunning = true;
        } else {
            CLogger.show(
                `Cannot execute ${chalk.underline('prepareRenderAndRun')}: already running render`,
                Logtype.ERROR
            );
        }
    }

    /** Run loop */
    private loop(linkBeginTime: number): void {
        let now = 0;
        let dt = 0;

        const tick = (): void => {
            if(!this.isRunning) {
                return;
            }

            now = Date.now();
            dt = now - linkBeginTime;
            linkBeginTime = now;

            for (const cb of this.tickSteps) {
                cb(dt);
            }

            this.render.render(this.cScene, this.cCam);
            requestAnimationFrame(() => tick());
        }
    }
}