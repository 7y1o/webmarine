import {Object3D, Vector3, WebGLRenderTarget} from "three";

/** Base entity constructor params */
interface IBaseEntityConstructorParams {

    /** Rotation of the entity */
    rotation?: Vector3;

    /** Scale of the entity */
    scale?: Vector3;

    /** Position of the entity */
    position?: Vector3;
}

/** Each entity parent class */
class CBaseEntity {

    /** Entity rotation */
    public rotation: Vector3;

    /** Entity scale */
    public scale: Vector3;

    /** Entity position */
    public position: Vector3;

    /** Entity sub entities */
    private children: CBaseEntity[];

    /** Entity current instance */
    public instance: WebGLRenderTarget;

    /** Construct */
    public constructor(options: IBaseEntityConstructorParams) {
        this.prepare(options);
    }

    /** Constructor's additional function */
    private prepare(options: IBaseEntityConstructorParams): void {
    }

    /** Position change by x, y and z coords */
    public move(x: number, y: number, z: number): void {
        const moveOffset = new Vector3(x, y, z);

        if (this.instance instanceof Object3D) {
            this.instance.position.add(moveOffset);
        }

        for (const child of this.children) {
            child.move(x, y, z);
        }
    }

    /** Set location by x, y and z coords */
    public teleport(x: number, y: number, z: number): void {
        if (this.instance instanceof Object3D) {
            this.instance.position.set(x, y, z);
        }

        for (const child of this.children) {
            child.teleport(x, y, z);
        }
    }

    /** Add rotation of object with children */
    public rotate(x: number, y: number, z: number): void {
        if (this.instance instanceof Object3D) {
            this.instance.rotation.x += x;
            this.instance.rotation.y += y;
            this.instance.rotation.z += z;
        }

        for (const child of this.children) {
            child.rotate(x, y, z);
        }
    }
}

export default CBaseEntity;