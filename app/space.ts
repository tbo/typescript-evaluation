///<reference path='../libs/three.d.ts'/>
///<reference path='renderer.ts'/>
class Space {
    private static _instance:Space;
    private objects: THREE.Object3D[] = [];
    private scene: THREE.Scene;
    private grid: THREE.Object3D;
    private edgeLength: number = 200;

    constructor()
    {
        var a = this.edgeLength;
        var b = Math.sin((30*(Math.PI/180))) * a;
        var c = Math.sin((60*(Math.PI/180))) * a;
        var startX: number = -1000;
        var startY: number = -1000;

        var material = new THREE.LineBasicMaterial({
            color: 0x0e0e0e,
            linewidth: 2
        });

        var xDiff:number = 2*a+2*b;
        var yDiff:number = c;

        this.grid = new THREE.Object3D();

//        var rectShape = new THREE.Shape();
//        rectShape.moveTo( startX , startY );
//        for(var i:number = 0; i < 30; i++) {
//            for(var n:number = 0; n < 30; n++) {
//                var x = startX + n * xDiff+((i%2)*(a+b));
//                var y = startY + i * yDiff;
//                rectShape.lineTo( x, y );
//                rectShape.lineTo( x+b, y+c );
//                rectShape.lineTo( x+b+a, y+c );
//                rectShape.lineTo( x+b+a+b , y );
//            }
//        }
//
//        this.grid = new THREE.Line( new THREE.ShapeGeometry( rectShape ) , material );
//        var geometry = new THREE.Geometry();
//        function createHexFragment(x: number,y: number):THREE.Geometry {
//            var geometry: THREE.Geometry = new THREE.Geometry();
//            geometry.vertices.push(new THREE.Vector3(x, y, 0));
//            geometry.vertices.push(new THREE.Vector3(x+b, y+c, 0));
//            geometry.vertices.push(new THREE.Vector3(x+b+a, y+c, 0));
//            geometry.vertices.push(new THREE.Vector3(x+b+a+b, y, 0));
//            return geometry;
//        }
//        for(var x:number = 0; x < 20; x++) {
//            for(var y:number = 0; y < 20; y++) {
//               THREE.GeometryUtils.merge(geometry, createHexFragment(startX+x*xDiff+((y%2)*(a+b)),startY+y*yDiff));
//            }
//        }
//
//        this.grid = new THREE.Line( geometry , material );
        function createHexFragment(x: number,y: number):THREE.Line {
            var geometry: THREE.Geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x, y, 0));
            geometry.vertices.push(new THREE.Vector3(x+b, y+c, 0));
            geometry.vertices.push(new THREE.Vector3(x+b+a, y+c, 0));
            geometry.vertices.push(new THREE.Vector3(x+b+a+b, y, 0));
            return new THREE.Line(geometry,material);
        }
        this.grid = new THREE.Object3D();
        var xDiff:number = 2*a+2*b;
        var yDiff:number = c;
        for(var x:number = 0; x < 10; x++) {
            for(var y:number = 0; y < 15; y++) {
                this.grid.add(createHexFragment(startX+x*xDiff+((y%2)*(a+b)),startY+y*yDiff));
            }
        }
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
        this.grid.translateX(x);
        this.grid.translateY(y);
    }
}