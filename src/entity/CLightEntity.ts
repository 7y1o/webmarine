import CBaseEntity from "./CBaseEntity";
import IBaseEntityConstructorParams from "./references/IBaseEntityConstructorParams";
import CLogger, {Logtype} from "../utils/CLogger";
import {AmbientLight, Light, PointLight, RectAreaLight, SpotLight} from "three";

/** Type of light */
type LightType = 'ambient' | 'point' | 'area' | 'spot';

/** Light constructor params */
interface ILightEntityConstructorParams extends IBaseEntityConstructorParams {
    /** Light color */
    lightColor: number;

    /** Light intensity */
    lightIntensity: number;
}

/** Light entity class */
class CLightEntity extends CBaseEntity {
    /** Light color */
    private lightColor: number;

    /** Light intensity */
    private lightIntensity: number;

    public constructor(type: LightType, options?: ILightEntityConstructorParams) {
        super();

        switch (type) {
            case "ambient": {
                this.instance = new AmbientLight(
                    options.lightColor || 0xFFFFFF,
                    options.lightIntensity || 1
                );
                break;
            }
            case "area": {
                this.instance = new RectAreaLight(
                    options.lightColor || 0xFFFFFF,
                    options.lightIntensity || 1
                );
                break;
            }
            case "point": {
                this.instance = new PointLight(
                    options.lightColor || 0xFFFFFF,
                    options.lightIntensity || 1
                );
                break;
            }
            case "spot": {
                this.instance = new SpotLight(
                    options.lightColor || 0xFFFFFF,
                    options.lightIntensity || 1
                );
                break;
            }
            default: {
                CLogger.show('Cannot create light: unknown type', Logtype.ERROR);
                return;
            }
        }
    }
}

export default CLightEntity;
