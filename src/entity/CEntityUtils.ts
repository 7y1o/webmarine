import CMeshEntity from "./CMeshEntity";
import IEntityUtilsCreatingParams from "./references/IEntityUtilsCreatingParams";
import {Color, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, Texture, Vector2, Vector3} from "three";
import CLightEntity from "./CLightEntity";
import IEntityUtilsLightCreatingParams from "./references/IEntityUtilsLightCreatingParams";

/** Basic material params */
interface BasicMaterialParams {

    /** Texture which used for transparency */
    alphaMap?: Texture;

    /** Ambient occlusion texture */
    aoMap?: Texture;

    /** Intensity of the ambient occlusion map */
    apMapIntensity?: number;

    /** Material' color */
    color?: Color;

    /** How to combine the result of the surface's color with the environment map, if any */
    combine?: number;

    /** Environment map */
    envMap?: Texture;

    /** Albedo (color) map */
    map?: Texture;

    /** Determines how strongly the environment map is reflected on the object */
    reflectivity?: number;

    /** Render geometry as wireframe (only tris lines) */
    wireframe?: boolean;
}

/** Physically based rendering material params */
interface PBRMaterialParams {
    /** Clear coat intensity */
    clearcoat?: number;

    /** Clear coat layer texture */
    clearcoatMap?: Texture;

    /** Normals of clear coat */
    clearcoatNormalMap?: Texture;

    /** Normal map scale of clear coat */
    clearcoatNormalScale?: Vector2;

    /** Refraction for non-metallic materials */
    ior?: number;

    /** Reflectivity */
    reflectivity?: number;

    /** The sheen color provides the ability to create two-tone specular materials */
    sheen?: Color;

    /** Optical transparency */
    transmission?: number;

    /** Transmission layer texture */
    transmissionMap?: Texture;
}

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
    public static createBasicMaterial(options?: BasicMaterialParams): MeshBasicMaterial {
        return new MeshBasicMaterial(options);
    }

    /** Create PBR material */
    public static createPBRMaterial(options?: PBRMaterialParams): MeshPhysicalMaterial {
        return new MeshPhysicalMaterial(options);
    }
}

export default CEntityUtils;