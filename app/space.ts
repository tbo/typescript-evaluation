///<reference path='../libs/three.d.ts'/>
///<reference path='renderer.ts'/>
class Space {
    private static _instance:Space;
    private objects: THREE.Object3D[] = [];
    private scene: THREE.Scene;

    constructor()
    {
    }

    public setScene(s: THREE.Scene)
    {
        this.scene = s;
    }

    public static getInstance():Space
    {
        if(_instance == null) {
            _instance = new Space();
        }
        return _instance;
    }

    public add(o:THREE.Object3D) {
        this.scene.add(o);
        this.objects.push(o);
    }

    public move(x: number, y: number, z: number = 0) {
        for(var i: number = 0, len: number = this.objects.length; i < len; i++) {
            this.objects[i].translateX(x);
            this.objects[i].translateY(y);
            this.objects[i].translateZ(z);
        }
    }
}