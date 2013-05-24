///<reference path='../libs/three.d.ts'/>
///<reference path='space.ts'/>
///<reference path='ship.ts'/>
class Renderer {

    private static _instance:Renderer;

    private tickListener: any[] = [];
    private scene: THREE.Scene;
    private space: Space;
    public camera: THREE.PerspectiveCamera;

    constructor()
    {
        var renderer;
        var changeAngle: bool = false;
        var cursorStartPosition: THREE.Vector2 = new THREE.Vector2(0,0);
        var cursorPosition: THREE.Vector2 = new THREE.Vector2(0,0);
        var diff: THREE.Vector2;
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 1000;
//        camera.

        this.scene = new THREE.Scene();
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


        var plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshNormalMaterial());
        this.space.add(plane);

        var tickListener = this.tickListener;
        animate();
        function animate(delta? = 0) {
            // Webstorm Hack
            var raf = requestAnimationFrame;
            raf( animate );
            for(var i: number = 0, len: number = tickListener.length; i < len; i ++) {
                tickListener[i](delta);
            }
            if(changeAngle) {
                diff.set(
                    Math.abs(cursorPosition.x-cursorStartPosition.x)/window.innerWidth,
                    Math.abs(cursorPosition.y-cursorStartPosition.y)/window.innerHeight
                )
            }
            renderer.render( that.scene, that.camera );
        }

        function mousewheel( e ) {
            var d = ((typeof e.wheelDelta != "undefined")?(-e.wheelDelta):e.detail);
            d = 100 * ((d>0)?1:-1);
            var cPos = that.camera.position;
            if (isNaN(cPos.x) || isNaN(cPos.y) || isNaN(cPos.y)) return;

            // Your zomm limitation
            // For X axe you can add anothers limits for Y / Z axes
//            if (cPos.x > _YOUR_ZOOM_MIN_X_  or cPos.x < _YOUR_ZOOM_MAX_X_ ){
//                return ;
//            }

            var mb = d>0 ? 1.1 : 0.9 ;
            cPos.x  = cPos.x * mb;
            cPos.y  = cPos.y * mb;
            cPos.z  = cPos.z * mb;

        }

        function rightClickDown(e) {
            e.preventDefault();
            cursorStartPosition.set(e.clientX, e.clientY);
            changeAngle = true;
        }

        function rightClickUp(e) {
            if(e.button == 2) {
                changeAngle = false;
            }
        }

        function setCursorPosition(e) {
            cursorPosition.set(e.clientX, e.clientY);
        }

        document.body.addEventListener( 'mousewheel', mousewheel, false );
        document.body.addEventListener( 'DOMMouseScroll', mousewheel, false );
        document.body.addEventListener( 'contextmenu', rightClickDown, false );
        document.body.addEventListener( 'mouseup', rightClickUp, false );
        document.body.addEventListener( 'mousemove', setCursorPosition, false );
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
            g.vertices.push(new THREE.Vector3(p[i][0], p[i][1], 1));
        }
        for(var i = len-1; i >= 0;i--) {
            g.vertices.push(new THREE.Vector3(p[i][0]*-1, p[i][1], 1));
        }
        g.vertices.push(new THREE.Vector3(p[0][0], p[0][1], 1));
        return g;
    }
}