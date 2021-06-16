import {
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    ShaderMaterial,
} from "three";
import {WMMeshEntity} from "./WMMeshEntity";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

export class WMEntityUtils {

    /** Mesh utils */
    public static get mesh() {
        return {
            /** Make cube entity */
            cube: (): WMMeshEntity => new WMMeshEntity('cube'),
            /** Make sphere entity */
            sphere: (): WMMeshEntity => new WMMeshEntity('sphere'),
            /** Make torus entity */
            torus: (): WMMeshEntity => new WMMeshEntity('torus'),
            /** Make cylinder entity */
            cylinder: (): WMMeshEntity => new WMMeshEntity('cylinder'),
            /** Make cone entity */
            cone: (): WMMeshEntity => new WMMeshEntity('cone'),
            /** Make entity from OBJ model (async function) */
            obj: async (path: string): Promise<WMMeshEntity> => new WMMeshEntity(await this.loadOBJ(path)),
            /** Make entity from glTF model (async function) */
            gltf: async (path: string): Promise<WMMeshEntity> => new WMMeshEntity(await this.loadGLTF(path)),
            /** Make entity from DRACO model (async function) */
            draco: async (path: string): Promise<WMMeshEntity> => new WMMeshEntity(await this.loadDRACO(path))
        };
    }

    // Load OBJ
    private static async loadOBJ(path: string): Promise<Group> {
        const loader = new OBJLoader();
        return await loader.loadAsync(path);
    }

    // Load glTF
    private static async loadGLTF(path: string): Promise<Group> {
        const loader = new GLTFLoader();
        return (await loader.loadAsync(path)).scene;
    }

    // Load DRACO
    private static async loadDRACO(path: string) {
        const loader = new DRACOLoader();
        return new Mesh(await loader.loadAsync(path));
    }

    /** Material utils */
    public static get material() {
        return {
            /** Make basic material */
            basic: () => new MeshBasicMaterial({color:0xFFFFFF}),
            /** Make PBR material */
            pbr: () => new MeshPhysicalMaterial({color:0xEFEFEF, roughness:.5, metalness:.5}),
            /** Make material with custom shaders */
            shader: (vertexShader: string, fragmentShader: string) => new ShaderMaterial({vertexShader, fragmentShader})
        };
    }
}