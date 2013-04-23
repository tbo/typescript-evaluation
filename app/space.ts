///<reference path='../libs/three.d.ts'/>
///<reference path='renderer.ts'/>
class Space {
    private static _instance:Space;
    private objects: THREE.Object3D[] = [];
    private scene: THREE.Scene;
    private grid: THREE.Object3D;
    private edgeLength: number = 40;

    constructor()
    {
        var a = this.edgeLength;
        var b = a/Math.sqrt(2);
        var startX: number = 100;
        var startY: number = 100;
        var geometry: THREE.Geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(startX, 0, 0));
        geometry.vertices.push(new THREE.Vector3(startX+b, b, 0));
        geometry.vertices.push(new THREE.Vector3(startX+b+a, b, 0));
        geometry.vertices.push(new THREE.Vector3(startX+b+a+b, 0, 0));
//        geometry.vertices.push(new THREE.Vector3(startX+b+a+b+a, 0, 0));
//        geometry.vertices.push(new THREE.Vector3(startX+b+a+b+a+b, b, 0));

        var material = new THREE.LineBasicMaterial({
            color: 0x555555
        });
        this.grid = new THREE.Line(geometry , material);
    }

    public setScene(s: THREE.Scene)
    {
        this.scene = s;
        this.scene.add(this.grid);
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