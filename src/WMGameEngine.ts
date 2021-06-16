import {WMRenderEngine} from "./render/WMRenderEngine";
import {WMPhysicsEngine} from "./physics/WMPhysicsEngine";
import {WMAudioEngine} from "./audio/WMAudioEngine";
import {WMAIEngine} from "./ai/WMAIEngine";

/** Main entry point for game engine */
export class WMGameEngine {
    private renderEngine: WMRenderEngine;
    private physicsEngine: WMPhysicsEngine | null;
    private audioEngine: WMAudioEngine | null;
    private aiEngine: WMAIEngine | null;

    /** Create game engine instance */
    public constructor() {
        this.renderEngine = new WMRenderEngine();
    }
}