import {Vector3} from "three";

/** Base entity constructor params */
interface IBaseEntityConstructorParams {

    /** Rotation of the entity */
    rotation?: Vector3;

    /** Scale of the entity */
    scale?: Vector3;

    /** Position of the entity */
    position?: Vector3;
}

export default IBaseEntityConstructorParams;
