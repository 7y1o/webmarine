import {
    Camera,
    Clock,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import {WMRenderEngineConfigRef} from "./refs/WMRenderEngineConfigRef";
import {EffectComposer, Pass} from "three/examples/jsm/postprocessing/EffectComposer";

/** WebMarine render engine */
export class WMRenderEngine {
    private engine: WebGLRenderer;
    private workScene: Scene;
    private workCam: Camera;
    private readonly steps: ((number) => void)[];
    private readonly init: (() => void)[];
    private readonly compileSteps: (() => void)[];
    private isRun: boolean;
    private oolEnabled: boolean;
    private fpsLimit: number | 'auto';
    private renderRes: {w: number, h: number};
    private errorStack: string[];
    private readonly canvasInstance: HTMLCanvasElement;
    private readonly postComposer: EffectComposer;

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
        WMRenderEngine.setupDocument(this.canvasInstance).then();
        this.renderRes = {
            w: window.innerWidth,
            h: window.innerHeight
        };
        this.engine.setSize(this.renderRes.w, this.renderRes.h);
        this.workCam = new PerspectiveCamera(45, this.renderRes.w / this.renderRes.h, .1, 1000);
        this.workScene = new Scene();
        this.steps = [];
        this.init = [];
        this.compileSteps = [];
        this.isRun = false;
        this.oolEnabled = false;
        this.fpsLimit = 'auto';
        this.postComposer = new EffectComposer(this.engine);
        this.postComposer.setSize(this.renderRes.w, this.renderRes.h);
        window.addEventListener('resize', () => {
            if (this.workCam instanceof PerspectiveCamera) {
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

    /** Turn OOL (Out of limit breaking) function */
    public set ool(value: boolean) {
        this.oolEnabled = value;
    }

    /** Update render resolution */
    public set resolution(data: {w?: number, h?: number}) {
        this.renderRes = {
            w: data.w ?? this.renderRes.w,
            h: data.h ?? this.renderRes.h
        };

        // Check if current camera is perspective camera
        if (this.workCam instanceof PerspectiveCamera) {
            this.workCam.aspect = this.renderRes.w / this.renderRes.h;
            this.workCam.updateProjectionMatrix();
        }

        // Set size for render engine and postprocess composer
        this.engine.setSize(this.renderRes.w, this.renderRes.h);
        this.postComposer.setSize(this.renderRes.w, this.renderRes.h);
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

    /** Add new init step */
    public addInit(fn: () => void): void {
        this.init.push(fn);
    }

    /** Add new update tick step */
    public addUpdate(fn: (number) => void): void {
        this.steps.push(fn);
    }

    /** Add new compile step */
    public addCompileStep(fn: () => void): void {
        this.compileSteps.push(fn);
    }

    /** Render compile */
    public async compile(): Promise<void> {
        for (const fn of this.compileSteps) {
            try {
                fn();
            } catch (e) {
                console.error(`[WMC error]: Error in compile step function: ${e.message}`);
                console.error(e.stack);
            }
        }

        this.engine.compile(this.workScene, this.workCam);
    }

    /** Prepare render and start rendering */
    public async prepareAndStart(): Promise<void> {
        if (this.isRun) return;
        await this.compile();
        await this.start();
        console.info('[WMC info]: Render successfully started');
    }

    /** Reload render engine */
    public async reloadEngine(config?: WMRenderEngineConfigRef): Promise<void> {
        if (this.isRun) this.isRun = false;
        this.engine = new WebGLRenderer(config ?? {
            antialias: true,
            precision: 'mediump',
            alpha: false,
            canvas: this.canvasInstance,
            logarithmicDepthBuffer: false
        });
    }

    /** Add postprocessing step */
    public addPostPass(pass: Pass): void {
        this.postComposer.addPass(pass);
    }

    /** Start render */
    public async start(): Promise<void> {
        if (this.isRun) return;
        this.isRun = true;
        const clock = new Clock();

        // Check errors in error stack
        const checkErrorStack = async (): Promise<void> => {
            if (this.isRun) requestAnimationFrame(() => checkErrorStack);
            if (this.errorStack.length > 0) {
                for (const error in this.errorStack) {
                    console.error(error);
                }
            }

            const expire = Date.now() + 5000;
            while (Date.now() < expire) {}
        }

        // Check is elapsed time larger than one frame time limit
        const isOutOfLimit = (elapsed: number): boolean => this.fpsLimit !== 'auto' && elapsed > (1 / this.fpsLimit);

        // Run init steps
        for (const fn of this.init) {
            try {
                fn();
            } catch (e) {
                console.error(`[WMC error]: Cannot execute init function: ${e.message}`);
                console.error(e.stack);
            }
        }

        // Render tick
        const tick = (): void => {
            if (this.isRun) requestAnimationFrame(() => tick());
            const dt = clock.getDelta();

            // Iterate all update steps
            for (const stepFn of this.steps) {
                // Check is frame elapsed time larger than limit
                if (this.oolEnabled && isOutOfLimit(clock.elapsedTime)) break;

                // Try to execute function
                try {
                    stepFn(dt);
                } catch(e) {
                    if (!(`[WMC error]: Cannot execute render tick step function: ${e.message}` in this.errorStack)) {
                        this.errorStack.push(`[WMC error]: Cannot execute render tick step function: ${e.message}`);
                        this.errorStack.push(e.stack);
                    }
                }
            }

            // Render the frame
            this.engine.render(this.workScene, this.workCam);

            // If effect composer have passes, render
            if (this.postComposer.passes.length > 0) {
                this.engine.render(this.workScene, this.workCam);
            }
        };
        tick();
    }
}