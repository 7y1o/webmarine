import {WMRenderEngine} from "./render/WMRenderEngine";
import {WMPhysicsEngine} from "./physics/WMPhysicsEngine";
import {WMAudioEngine} from "./audio/WMAudioEngine";
import {WMAIEngine} from "./ai/WMAIEngine";

/** Main entry point for game engine */
export class WMGameEngine {
    private readonly renderEngine: WMRenderEngine;
    private readonly physicsEngine: WMPhysicsEngine;
    private readonly audioEngine: WMAudioEngine;
    private readonly aiEngine: WMAIEngine;

    /** Create game engine instance */
    public constructor(config?: {audio?: boolean, ai?: boolean, physics?: boolean}) {
        try {
            this.renderEngine = new WMRenderEngine();
            if (config?.physics) this.physicsEngine = new WMPhysicsEngine();
            if (config?.audio) this.audioEngine = new WMAudioEngine();
            if (config?.ai) this.aiEngine = new WMAIEngine();
        } catch (e) {
            console.error(`[WMC error]: Cannot init game engine: ${e.message}`);
            console.error(e.stack);
            return;
        }
    }

    /** Get access to render engine */
    public get render(): WMRenderEngine {
        return this.renderEngine ?? null;
    }

    /** Get access to physics engine */
    public get physics(): WMPhysicsEngine {
        return this.physicsEngine ?? null;
    }

    /** Get access to audio engine */
    public get audio(): WMAudioEngine {
        return this.audioEngine ?? null;
    }

    /** Get access to artificial intelligence engine */
    public get ai(): WMAIEngine {
        return this.aiEngine ?? null;
    }

    /** Reload render engine */
    public async reload(): Promise<void> {
        await this.renderEngine.reloadEngine();
    }
}