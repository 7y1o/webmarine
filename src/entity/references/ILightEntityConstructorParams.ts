import IBaseEntityConstructorParams from "./IBaseEntityConstructorParams";

/** Light constructor params */
interface ILightEntityConstructorParams extends IBaseEntityConstructorParams {
    /** Light color */
    lightColor?: number;

    /** Light intensity */
    lightIntensity?: number;
}

export default ILightEntityConstructorParams;