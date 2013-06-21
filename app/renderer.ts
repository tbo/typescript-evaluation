///<reference path='../libs/three.d.ts'/>
///<reference path='space.ts'/>
///<reference path='ship.ts'/>
class Renderer {

    private static _instance:Renderer;

    private tickListener: any[] = [];
    private scene: THREE.Scene;
    private space: Space;
    public camera: THREE.PerspectiveCamera;
    public controls: THREE.EditorControls;


    constructor()
    {
        var renderer;
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 80000 );
        this.camera.position.y = 1000;
        this.camera.position.x = 1000;
        this.controls = new THREE.EditorControls( this.camera );
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0x000000, 3000, 55000 );
        var pointLight =
            new THREE.PointLight(0xFFFFFF);

// set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

// add to the scene
        this.scene.add(pointLight);
        this.space = Space.getInstance();
        this.space.setScene(this.scene);
        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        var that = this;
        window.onresize = function(event) {
            renderer.setSize( window.innerWidth, window.innerHeight );
            that.camera.aspect	= window.innerWidth / window.innerHeight;
            that.camera.updateProjectionMatrix();
        }
        document.body.appendChild( renderer.domElement );


        var tickListener = this.tickListener;
        animate();
        function animate(delta? = 0) {
            // Webstorm Hack
            var raf = requestAnimationFrame;

            raf( animate );
            for(var i: number = 0, len: number = tickListener.length; i < len; i ++) {
                tickListener[i](delta);
            }
            renderer.render( that.scene, that.camera );
        }
    }

    public static getInstance():Renderer
    {
        if(_instance == null) {
            _instance = new Renderer();
        }
        return _instance;
    }

    public createShip(color: number): Ship {
        var material = new THREE.LineBasicMaterial({
            color: color
        });
        var mesh: THREE.Object3D = new THREE.Line( this.createGeometry([
            [4,53],
            [10,60],
            [11,67],
            [15,67],
            [35,53],
            [35,23],
            [18,-7],
            [6,-64],
            [3,-67]
        ]), material);

        var x = 0, y = 0;

        var heartShape:THREE.Shape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths

        heartShape.moveTo( x + 25, y + 25 );
        heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
        heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
        heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
        heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
        heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
        heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
        var geom:THREE.Geometry = new THREE.ShapeGeometry( heartShape );
        var objectHolder = new THREE.Object3D();
        var object = new THREE.Mesh(geom, new THREE.MeshPhongMaterial( { color: 0xcc0000,opacity:0.5,transparent:true } ));
//        object.rotation.x = -Math.PI/2;
        objectHolder.add(object);
        this.scene.add(objectHolder);
        return new Ship(objectHolder);
    }

    public registerTickListener(callback: any) {
        this.tickListener.push(callback);
    }

    public createGeometry(p: number[][]):THREE.Geometry {
        var g: THREE.Geometry = new THREE.Geometry();
        var len:number = p.length;
        for(var i = 0; i < len;i++) {
            g.vertices.push(new THREE.Vector3(p[i][0], 1, p[i][1]));
        }
        for(var i = len-1; i >= 0;i--) {
            g.vertices.push(new THREE.Vector3(p[i][0]*-1, 1, p[i][1]));
        }
        g.vertices.push(new THREE.Vector3(p[0][0], 1, p[0][1]));
        return g;
    }


}