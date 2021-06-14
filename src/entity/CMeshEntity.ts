import CBaseEntity from "./CBaseEntity";
import IBaseEntityConstructorParams from "./references/IBaseEntityConstructorParams";
import {BoxGeometry, ConeGeometry, CylinderGeometry, Mesh, PlaneGeometry, SphereGeometry, TorusGeometry} from "three";
import CLogger, {Logtype} from "../utils/CLogger";

/** Geometry type */
type MeshType = Mesh | 'box' | 'cone' | 'cylinder' | 'plane' | 'sphere' | 'torus';

/** Mesh entity class */
class CMeshEntity extends CBaseEntity {

    public constructor(mesh: MeshType, options: IBaseEntityConstructorParams) {
        super();

        if(mesh instanceof Mesh) {
            this.instance = mesh;
            return;
        }

        switch (mesh) {
            case "box": {
                this.instance = new Mesh(
                    new BoxGeometry()
                );
                break;
            }
            case "cone": {
                this.instance = new Mesh(
                    new ConeGeometry()
                );
                break;
            }
            case "cylinder": {
                this.instance = new Mesh(
                    new CylinderGeometry()
                );
                break;
            }
            case "plane": {
                this.instance = new Mesh(
                    new PlaneGeometry()
                );
                break;
            }
            case "sphere": {
                this.instance = new Mesh(
                    new SphereGeometry()
                );
                break;
            }
            case "torus": {
                this.instance = new Mesh(
                    new TorusGeometry()
                );
                break;
            }
            default: {
                CLogger.show('Cannot create entity: unknown type', Logtype.ERROR);
                return;
            }
        }
    }
}

export default CMeshEntity;
