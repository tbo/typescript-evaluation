///<reference path='../libs/three.d.ts'/>
///<reference path='renderer.ts'/>
class Space {
    private static _instance:Space;
    private objects: THREE.Object3D[] = [];
    private scene: THREE.Scene;
    private grid: THREE.Object3D;
    private edgeLength: number = 200;
    private distanceDelta:THREE.Vector2 = new THREE.Vector2();
    private gridW:number = 1600; // pixels
    private gridH:number = 1600; // pixels
    private gridNumW:number = 50; // how many wide (50*50 = 2500 pixels wide)
    private gridNumH:number = 50;

    constructor()
    {
        var a = this.edgeLength;
        var b = Math.sin((30*(Math.PI/180))) * a;
        var c = Math.sin((60*(Math.PI/180))) * a;
//        var startX: number = -1000;
//        var startY: number = -1000;
//
//        var material = new THREE.LineBasicMaterial({
//            color: 0x333333,
//            linewidth: 2
//        });
//
//        var xDiff:number = 2*a+2*b;
//        var yDiff:number = c;
//
//        this.grid = new THREE.Object3D();

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
//        function createHexFragment(x: number,z: number):THREE.Line {
//            var geometry: THREE.Geometry = new THREE.Geometry();
//            geometry.vertices.push(new THREE.Vector3(x, 0, z));
//            geometry.vertices.push(new THREE.Vector3(x+b, 0, z+c));
//            geometry.vertices.push(new THREE.Vector3(x+b+a, 0, z+c));
//            geometry.vertices.push(new THREE.Vector3(x+b+a+b, 0, z));
//            return new THREE.Line(geometry,material);
//        }
//        this.grid = new THREE.Object3D();
//        var xDiff:number = 2*a+2*b;
//        var yDiff:number = c;
//        for(var x:number = 0; x < 10; x++) {
//            for(var y:number = 0; y < 15; y++) {
//                this.grid.add(createHexFragment(startX+x*xDiff+((y%2)*(a+b)),startY+y*yDiff));
//            }
//        }
        this.grid = new THREE.Mesh( new THREE.PlaneGeometry( this.gridW*50, this.gridH*50, this.gridNumW, this.gridNumH ), new   THREE.MeshBasicMaterial( { color: 0x202020, wireframe: true } ) );
        this.grid.rotation.x = Math.PI/2;
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

    public updateGrid(x:number, y:number) {
        this.distanceDelta.x += x;
        this.distanceDelta.y += y;

        if(Math.abs(this.distanceDelta.x) >= this.gridW ) {
            this.grid.position.x += this.distanceDelta.x;
            this.distanceDelta.x = 0;
        }
        if(Math.abs(this.distanceDelta.y) >= this.gridH ) {
            this.grid.position.z += this.distanceDelta.y;
            console.log(this.grid.position.z,this.distanceDelta.y);
            this.distanceDelta.y = 0;
        }
    }

    public move(x: number, y: number, z: number = 0) {
        for(var i: number = 0, len: number = this.objects.length; i < len; i++) {
            this.objects[i].translateX(x);
            this.objects[i].translateY(y);
            this.objects[i].translateZ(z);
        }
        this.grid.translateX(-x);
        this.grid.translateY(-y);
    }
}