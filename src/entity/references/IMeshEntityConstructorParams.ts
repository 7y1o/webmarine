import IBaseEntityConstructorParams from "./IBaseEntityConstructorParams";
import {Material} from "three";

/** Mesh entity constructor params */
interface IMeshEntityConstructorParams extends IBaseEntityConstructorParams {
    /** Material of the object */
    material?: Material;
}

export default IMeshEntityConstructorParams;
