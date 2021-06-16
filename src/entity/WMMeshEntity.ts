/** Mesh entity builder */
import {
    ConeGeometry,
    CylinderGeometry, Group,
    Material,
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
    TorusGeometry, Vector3
} from "three";

export class WMMeshEntity {
    /** Mesh instance */
    private instance: Mesh | Group;

    /** Children entities */
    private children: WMMeshEntity[];

    /** Constructor */
    public constructor(type: Mesh | Group | 'cube' | 'sphere' | 'torus' | 'cylinder' | 'cone', material?: Material) {
        if (type instanceof Mesh || type instanceof Group) {
            this.instance = type;
        } else {
            const mat = material ?? new MeshBasicMaterial({
                color: 0xFFFFFF
            });
            switch (type) {
                case "cube": {
                    this.instance = new Mesh(new TorusGeometry(), mat);
                    break;
                }
                case "sphere": {
                    this.instance = new Mesh(new SphereGeometry(), mat);
                    break;
                }
                case "torus": {
                    this.instance = new Mesh(new TorusGeometry(), mat);
                    break;
                }
                case "cylinder": {
                    this.instance = new Mesh(new CylinderGeometry(), mat);
                    break;
                }
                case "cone": {
                    this.instance = new Mesh(new ConeGeometry(), mat);
                    break;
                }
            }
        }
    }

    /** Apply new material to the instance */
    public set material(material: Material) {
        if (!(this.instance instanceof Group)) {
            this.instance.material = material;
        } else {
            console.warn('[WMC] ')
        }
    }

    /** Position of the entity */
    public get position() {
        return {
            /** Get position of the entity as Vector3 class */
            get: () => this.instance.position,

            /** Teleport entity to the new position */
            set: (x: number, y: number, z: number) => {
                this.instance.position.set(x, y, z);
                for (const child of this.children) {
                    child.position.set(
                        child.position.get().x + x,
                        child.position.get().y + y,
                        child.position.get().z + z,
                    );
                }
            },

            /** Move entity */
            add: (x: number, y: number, z: number) => {
                this.instance.position.add(new Vector3(x, y, z));
                for (const child of this.children) {
                    child.position.add(x, y, z);
                }
            }
        }
    }
}