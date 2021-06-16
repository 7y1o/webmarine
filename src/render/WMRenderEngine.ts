import {
    ArrayCamera,
    Camera,
    Clock,
    OrthographicCamera,
    PerspectiveCamera,
    Scene,
    StereoCamera,
    WebGLRenderer
} from "three";
import {WMRenderEngineConfigRef} from "./refs/WMRenderEngineConfigRef";
import {CinematicCamera} from "three/examples/jsm/cameras/CinematicCamera";

/** WebMarine render engine */
export class WMRenderEngine {
    private engine: WebGLRenderer;
    private workScene: Scene;
    private workCam: Camera;
    private readonly steps: ((number) => void)[];
    private isRun: boolean;
    private fpsLimit: number | 'auto';
    private renderRes: {w: number, h: number};
    private canvasInstance: HTMLCanvasElement;

    /** Create render engine */
    public constructor(config?: WMRenderEngineConfigRef) {
        this.canvasInstance = document.createElement('canvas');
        this.engine = new WebGLRenderer(config ?? {
            antialias: true,
            precision: 'mediump',
            alpha: false,
            canvas: this.canvasInstance,
            logarithmicDepthBuffer: false
        });
        WMRenderEngine.setupDocument(this.canvasInstance);
        this.renderRes = {
            w: window.innerWidth,
            h: window.innerHeight
        };
        this.engine.setSize(this.renderRes.w, this.renderRes.h);
        this.workCam = new PerspectiveCamera(45, this.renderRes.w / this.renderRes.h, .1, 1000);
        this.workScene = new Scene();
        this.steps = [];
        this.isRun = false;
        this.fpsLimit = 'auto';
        window.addEventListener('resize', () => {
            if (this.workCam instanceof (PerspectiveCamera || ArrayCamera || CinematicCamera)) {
                this.workCam.aspect = this.renderRes.w / this.renderRes.h;
                this.workCam.updateProjectionMatrix();
            }
            this.engine.setSize(this.renderRes.w, this.renderRes.h);
        });
    }

    /** Setup document */
    private static async setupDocument(canvas: HTMLCanvasElement): Promise<void> {
        document.body.innerText = '';
        document.body.style.cssText = `
            padding: 0;
            margin: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        `;
        canvas.style.cssText = `
            min-width: 100vw;
            min-height: 100vh;
            max-width: 100vw;
            max-height: 100vh
        `;
        document.body.append(canvas);
    }

    /** Update render resolution */
    public set resolution(data: {w?: number, h?: number}) {
        this.renderRes = {
            w: data.w ?? this.renderRes.w,
            h: data.h ?? this.renderRes.h
        };

        if (this.workCam instanceof (PerspectiveCamera || ArrayCamera || CinematicCamera)) {
            this.workCam.aspect = this.renderRes.w / this.renderRes.h;
            this.workCam.updateProjectionMatrix();
        }
        this.engine.setSize(this.renderRes.w, this.renderRes.h);
    }

    /** Set FPS limit */
    public set fps(fps: number | 'auto') {
        this.fpsLimit = fps;
    }

    /** Switch scene */
    public set scene(scene: Scene) {
        this.workScene = scene;
    }

    /** Switch camera */
    public set camera(camera: Camera) {
        this.workCam = camera;
    }

    /** Get current fps limit */
    public get currentFps(): number | 'auto' {
        return this.fpsLimit;
    }

    /** Get current scene */
    public get currentScene(): Scene {
        return this.workScene;
    }

    /** Get current camera */
    public get currentCamera(): Camera {
        return this.workCam;
    }

    /** Get render running state */
    public get running(): boolean {
        return this.isRun;
    }

    /** Add new update tick step */
    public addUpdate(fn: (number) => void): void {
        this.steps.push(fn);
    }

    /** Render compile */
    public async compile(): Promise<void> {
        this.engine.compile(this.workScene, this.workCam);
    }

    /** Prepare render and start rendering */
    public async prepareAndStart(): Promise<void> {
        if (this.isRun) return;
        await this.compile();
        await this.start();
        console.info('Render successfully started');
    }

    /** Reload render engine */
    public reloadEngine(config?: WMRenderEngineConfigRef): void {
        if (this.isRun) this.isRun = false;
        this.engine = new WebGLRenderer(config ?? {
            antialias: true,
            precision: 'mediump',
            alpha: false,
            canvas: this.canvasInstance,
            logarithmicDepthBuffer: false
        });
    }

    /** Start render */
    public async start(): Promise<void> {
        if (this.isRun) return;
        this.isRun = true;
        const clock = new Clock();

        // Check is elapsed time larger than one frame time limit
        const isOutOfLimit = (elapsed: number): boolean => this.fpsLimit !== 'auto' && elapsed > (1 / this.fpsLimit);

        // Render tick
        const tick = (): void => {
            if (this.isRun) requestAnimationFrame(() => tick());
            const dt = clock.getDelta();

            // Iterate all update steps
            for (const stepFn of this.steps) {
                // Check is frame elapsed time larger than limit
                if (isOutOfLimit(clock.elapsedTime)) break;

                // Try to execute function
                try { stepFn(dt) }
                catch(e) {}
            }

            // Render the frame
            this.engine.render(this.workScene, this.workCam);
        };
        tick();
    }
}