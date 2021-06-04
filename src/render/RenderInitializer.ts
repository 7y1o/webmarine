import {OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer, WebGLRendererParameters} from "three";

/** Render initializer and holder class */
export class RenderInitializer {
    private RenderEngine: WebGLRenderer;
    private WorkingCamera: PerspectiveCamera | OrthographicCamera;
    private WorkingScene: Scene;
    private LoopRunning: boolean;
    private readonly LoopSteps: ((number) => void)[];

    /** Create class */
    public constructor(config: WebGLRendererParameters) {
        this.RenderEngine = new WebGLRenderer(config);
        this.WorkingCamera = new PerspectiveCamera();
        this.WorkingScene = new Scene();
        this.LoopRunning = false;
        this.LoopSteps = [];

        document.body.append(this.RenderEngine.domElement);
    }

    /** Update scene */
    public SwitchScene(newScene: Scene) {
        this.WorkingScene = newScene;
    }

    /** Update camera */
    public SwitchCamera(newCamera: PerspectiveCamera | OrthographicCamera) {
        this.WorkingCamera = newCamera;
    }

    /** Get access to the current scene */
    public get Scene(): Scene {
        return this.WorkingScene;
    }

    /** Get access to the current camera */
    public get Camera(): PerspectiveCamera | OrthographicCamera {
        return this.WorkingCamera;
    }

    /** Add new loop step */
    public AddLoopStep(fn: (number) => void) {
        this.LoopSteps.push(fn);
    }

    /** Loop step */
    private LoopStep(dt: number) {
        let i = 0;
        for(const step of this.LoopSteps) {
            try {
                step(dt);
                i++;
            } catch (e) {
                throw `[WMC]: Loop step execution error (loop #${i})`;
            }
        }
    }

    /** Run loop */
    public Run() {
        if(this.LoopRunning) return;

        let st = Date.now();
        let et = Date.now();

        const animate = () => {
            st = Date.now();
            this.LoopStep(et - st);
            et = Date.now();
            requestAnimationFrame(animate);
        }

        this.LoopRunning = true;
        animate();
    }
}