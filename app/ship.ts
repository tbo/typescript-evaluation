///<reference path='../libs/three.d.ts'/>
///<reference path='renderer.ts'/>
class Ship {
    private rotation: number = 0;
    private model:THREE.Object3D;

    constructor(m: THREE.Object3D)
    {
        this.model = m;

    }

    public setRotation(r:number) {
        this.model.rotation.z = r;
    }

    public move(x: number, y: number, z: number = 0) {
        this.model.translateX(x);
        this.model.translateY(y);
        this.model.translateZ(z);
    }

    public getPosition():THREE.Vector3 {
        return this.model.position;
    }
}