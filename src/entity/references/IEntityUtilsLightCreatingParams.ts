import {Vector3} from "three";

/** Light entity creating params from entity utils */
interface IEntityUtilsLightCreatingParams {
    /** Position of the light */
    position?: Vector3;

    /** Light color */
    color?: number;

    /** Light intensity */
    intensity?: number;
}

export default IEntityUtilsLightCreatingParams;