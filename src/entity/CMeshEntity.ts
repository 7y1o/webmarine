import CBaseEntity from "./CBaseEntity";
import IBaseEntityConstructorParams from "./references/IBaseEntityConstructorParams";
import {
    BoxGeometry,
    ConeGeometry,
    CylinderGeometry,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry, PositionalAudio,
    SphereGeometry,
    TorusGeometry
} from "three";
import CLogger, {Logtype} from "../utils/CLogger";
import IMeshEntityConstructorParams from "./references/IMeshEntityConstructorParams";

/** Geometry type */
type MeshType = Mesh | 'box' | 'cone' | 'cylinder' | 'plane' | 'sphere' | 'torus';

/** Mesh entity class */
class CMeshEntity extends CBaseEntity {

    public constructor(mesh: MeshType, options: IMeshEntityConstructorParams) {
        super();

        // Check if mesh is instance of Mesh class in THREE
        if(mesh instanceof Mesh) {
            this.instance = mesh;
            return;
        }

        // Prepare material
        const material = options.material || new MeshBasicMaterial({
            color: 0xFFFFFF
        });

        // Check mesh type
        switch (mesh) {
            case "box": {
                this.instance = new Mesh(
                    new BoxGeometry(),
                    material
                );
                break;
            }
            case "cone": {
                this.instance = new Mesh(
                    new ConeGeometry(),
                    material
                );
                break;
            }
            case "cylinder": {
                this.instance = new Mesh(
                    new CylinderGeometry(),
                    material
                );
                break;
            }
            case "plane": {
                this.instance = new Mesh(
                    new PlaneGeometry(),
                    material
                );
                break;
            }
            case "sphere": {
                this.instance = new Mesh(
                    new SphereGeometry(),
                    material
                );
                break;
            }
            case "torus": {
                this.instance = new Mesh(
                    new TorusGeometry(),
                    material
                );
                break;
            }
            default: {
                CLogger.show('Cannot create entity: unknown type', Logtype.ERROR);
                return;
            }
        }
    }

    /** Apply sound to the instance */
    public applySound(sound: PositionalAudio): void {
        this.instance.add(sound);
    }
}

export default CMeshEntity;
