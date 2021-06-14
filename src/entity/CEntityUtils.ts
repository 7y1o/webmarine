import CMeshEntity from "./CMeshEntity";
import IEntityUtilsCreatingParams from "./references/IEntityUtilsCreatingParams";
import {Mesh, MeshBasicMaterial, Vector3} from "three";
import CLightEntity from "./CLightEntity";
import IEntityUtilsLightCreatingParams from "./references/IEntityUtilsLightCreatingParams";

/** Basic material params */
interface BasicMaterialParams {}

/** Entity utils methods */
class CEntityUtils {
    /** Create box entity */
    public static createBox(options?: IEntityUtilsCreatingParams): CMeshEntity {
        return new CMeshEntity('box', {
            position: options?.position || new Vector3(0, 0, 0),
            scale: options?.scale || new Vector3(1, 1, 1),
            material: options?.material || null
        });
    }

    /** Create cone entity */
    public static createCone(options?: IEntityUtilsCreatingParams): CMeshEntity {
        return new CMeshEntity('cone', {
            position: options?.position || new Vector3(0, 0, 0),
            scale: options?.scale || new Vector3(1, 1, 1),
            material: options?.material || null
        });
    }

    /** Create cylinder entity */
    public static createCylinder(options?: IEntityUtilsCreatingParams): CMeshEntity {
        return new CMeshEntity('cylinder', {
            position: options?.position || new Vector3(0, 0, 0),
            scale: options?.scale || new Vector3(1, 1, 1),
            material: options?.material || null
        });
    }

    /** Create plane entity */
    public static createPlane(options?: IEntityUtilsCreatingParams): CMeshEntity {
        return new CMeshEntity('plane', {
            position: options?.position || new Vector3(0, 0, 0),
            scale: options?.scale || new Vector3(1, 1, 1),
            material: options?.material || null
        });
    }

    /** Create sphere entity */
    public static createSphere(options?: IEntityUtilsCreatingParams): CMeshEntity {
        return new CMeshEntity('sphere', {
            position: options?.position || new Vector3(0, 0, 0),
            scale: options?.scale || new Vector3(1, 1, 1),
            material: options?.material || null
        });
    }

    /** Create torus entity */
    public static createTorus(options?: IEntityUtilsCreatingParams): CMeshEntity {
        return new CMeshEntity('torus', {
            position: options?.position || new Vector3(0, 0, 0),
            scale: options?.scale || new Vector3(1, 1, 1),
            material: options?.material || null
        });
    }

    /** Create light area entity */
    public static createLightArea(options?: IEntityUtilsLightCreatingParams): CLightEntity {
        return new CLightEntity('area', {
            position: options?.position || new Vector3(0, 0, 0),
            lightColor: options?.color || 0xFFFFFF,
            lightIntensity: options?.intensity || 1
        });
    }

    /** Create ambient light entity */
    public static createAmbientLight(options?: IEntityUtilsLightCreatingParams): CLightEntity {
        return new CLightEntity('ambient', {
            position: options?.position || new Vector3(0, 0, 0),
            lightColor: options?.color || 0xFFFFFF,
            lightIntensity: options?.intensity || 1
        });
    }

    /** Create point light entity */
    public static createPointLight(options?: IEntityUtilsLightCreatingParams): CLightEntity {
        return new CLightEntity('point', {
            position: options?.position || new Vector3(0, 0, 0),
            lightColor: options?.color || 0xFFFFFF,
            lightIntensity: options?.intensity || 1
        });
    }

    /** Create spot light entity */
    public static createSpotLight(options?: IEntityUtilsLightCreatingParams): CLightEntity {
        return new CLightEntity('spot', {
            position: options?.position || new Vector3(0, 0, 0),
            lightColor: options?.color || 0xFFFFFF,
            lightIntensity: options?.intensity || 1
        });
    }

    /** Create basic material */
    // public static createBasicMaterial(options?: BasicMaterialParams): MeshBasicMaterial {}
}

export default CEntityUtils;