import type {Camera, Scene} from "three";

/** Switch scene or camera query reference */
export default interface IRenderEngineSwitch {
    /** Whether switch camera */
    camera?: Camera;

    /** Whether switch scene */
    scene?: Scene;
}