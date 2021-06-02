import {OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {BuildRenderConfig} from "./RenderConfig";

/** Initialize WebGL render engine */
export class InitializeRender {
    private Renderer: WebGLRenderer;
    private CurrentScene: Scene;
    private CurrentCamera: PerspectiveCamera | OrthographicCamera;
    private RenderLoopSteps: ((scene: Scene, cam: PerspectiveCamera | OrthographicCamera) => void)[];
    private IsRunningRender: boolean;

    // Constructor
    public constructor() {
        this.Renderer = new WebGLRenderer(BuildRenderConfig({
            powerPreference: 'high-performance',
            alpha: false,
            antialias: true,
            debugMode: false,
            gamma: 2,
            logarithmicDepthBuffer: false,
            precision: 'mediump'
        }));

        // Render settings

        this.CurrentScene = new Scene();
        this.CurrentCamera = new PerspectiveCamera();
        this.IsRunningRender = false;
    }

    /** Apply new scene */
    public SwitchScene(NewScene: Scene) {
        this.CurrentScene = NewScene;
    }

    /** Apply new camera */
    public SwitchCamera(NewCamera: PerspectiveCamera | OrthographicCamera) {
        this.CurrentCamera = NewCamera;
    }

    /** Get access to the current scene */
    public get Scene(): Scene {
        return this.CurrentScene;
    }

    /** Get access to the current camera */
    public get Camera(): PerspectiveCamera | OrthographicCamera {
        return this.CurrentCamera;
    }

    /** Add function to the render loop */
    public AddLoopStep(step: (scene: Scene, cam: PerspectiveCamera | OrthographicCamera) => void) {
        this.RenderLoopSteps.push(step);
    }

    /** Renderer main loop step */
    private LoopStep(dt: number) {
        this.RenderLoopSteps.forEach(step => step(this.CurrentScene, this.CurrentCamera));
    }

    /** Run renderer */
    public Run() {
        if(!this.IsRunningRender) {
            document.body.append(this.Renderer.domElement);
            this.LoopStep(0);
            this.IsRunningRender = true;
        }
    }
}