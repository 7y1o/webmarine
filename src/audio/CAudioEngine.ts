import {AudioListener, PositionalAudio} from "three";

/** Audio engine */
class CAudioEngine {
    private listener: AudioListener;
    private sources: PositionalAudio[];
}

export default CAudioEngine;