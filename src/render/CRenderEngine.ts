import {
    Camera, PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import IRenderConfig from "./references/IRenderConfig";

/**
 * @brief Class Render Engine
 * Initialize graphics render engine
 */
export default class CRenderEngine {
    private render: WebGLRenderer;
    private cCam: Camera;
    private cScene: Scene;
    private tickSteps: ((number) => void)[];

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
    }
}