///<reference path='../libs/three.d.ts'/>
///<reference path='ship.ts'/>
class Renderer {

    private static _instance:Renderer;

    private tickListener: any[] = [];
    private scene: THREE.Scene;

    constructor()
    {
        var camera, renderer;
        var geometry;

        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        this.scene = new THREE.Scene();

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        var that = this;
        window.onresize = function(event) {
            renderer.setSize( window.innerWidth, window.innerHeight );
            camera.aspect	= window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        document.body.appendChild( renderer.domElement );


        var plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshNormalMaterial());
        this.scene.add(plane);

        var tickListener = this.tickListener;
        animate();
        function animate(delta? = 0) {
            // Webstorm Hack
            var raf = requestAnimationFrame;
            raf( animate );
            for(var i: number = 0, len: number = tickListener.length; i < len; i ++) {
                tickListener[i](delta);
            }
            renderer.render( that.scene, camera );
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
        this.scene.add(mesh);
        return new Ship(mesh);
    }

    public registerTickListener(callback: any) {
        this.tickListener.push(callback);
    }

    public createGeometry(p: number[][]):THREE.Geometry {
        var g: THREE.Geometry = new THREE.Geometry();
        var len:number = p.length;
        for(var i = 0; i < len;i++) {
            g.vertices.push(new THREE.Vector3(p[i][0], p[i][1], 0));
        }
        for(var i = len-1; i >= 0;i--) {
            g.vertices.push(new THREE.Vector3(p[i][0]*-1, p[i][1], 0));
        }
        g.vertices.push(new THREE.Vector3(p[0][0], p[0][1], 0));
        return g;
    }
}