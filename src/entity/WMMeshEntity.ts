/** Mesh entity builder */
import {
    ConeGeometry,
    CylinderGeometry,
    Material,
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
    TorusGeometry
} from "three";

export class WMMeshEntity {
    /** Mesh instance */
    private instance: Mesh;

    /** Children entities */
    private children: WMMeshEntity[];

    /** Constructor */
    public constructor(type: Mesh | 'cube' | 'sphere' | 'torus' | 'cylinder' | 'cone', material?: Material) {
        if (type instanceof Mesh) {
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

    /**  */
}