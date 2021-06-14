import {Material, Vector3} from "three";

/** Box entity constructor params */
interface IEntityUtilsCreatingParams {

    /** Position of the new box */
    position?: Vector3;

    /** Size of the new box */
    scale?: Vector3;

    /** Material of the new box */
    material?: Material;
}

export default IEntityUtilsCreatingParams;