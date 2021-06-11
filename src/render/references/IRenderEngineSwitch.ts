import type {Camera, Scene} from "three";
import {ArrayCamera, OrthographicCamera, PerspectiveCamera, StereoCamera} from "three";

/** Switch scene or camera query reference */
export default interface IRenderEngineSwitch {
    /** Whether switch camera */
    camera?: PerspectiveCamera | ArrayCamera | StereoCamera | OrthographicCamera;

    /** Whether switch scene */
    scene?: Scene;
}