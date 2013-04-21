///<reference path='../libs/three.d.ts'/>
class Renderer {

    private static _instance:Renderer;

    private _stage;
    private _tickListener: any[] = [];

    constructor()
    {
//        this._stage = this.createStage("screen")
//        var raf = window.requestAnimationFrame;
//        var that = this;
//        var lastTick = new Date().getTime();
//        function tick() {
//            var currentTick = new Date().getTime();
//            var elapsedTime = currentTick - lastTick;
//            for(var i:number = 0; i < that._tickListener.length; i++) {
//                that._tickListener[i](elapsedTime);
//            }
//            lastTick = currentTick;
//            that.redraw();
//            raf(tick);
//        }
//        tick();
//        setInterval(tick,15)
        var camera, scene, renderer;
        var geometry, material, mesh;



        camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

//            geometry = new THREE.CubeGeometry( 200, 200, 200 );

        mesh = new THREE.Line( this.createGeometry([
            [4,53],
            [10,60],
            [11,67],
            [15,67],
            [35,53],
            [35,23],
            [18,-7],
            [6,-64],
            [3,-67]
        ]), material );
        scene.add( mesh );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        window.onresize = function(event) {
//                var xDiff = (stage.getWidth() - window.innerWidth)/2 + stage.getOffset().x;
//                var yDiff = (stage.getHeight() - window.innerHeight)/2 + stage.getOffset().y;
//                stage.setOffset(xDiff,yDiff);
            renderer.setSize( window.innerWidth, window.innerHeight );
        }
        document.body.appendChild( renderer.domElement );

        animate();

        function animate() {

            // note: three.js includes requestAnimationFrame shim
            requestAnimationFrame( animate );

//            mesh.rotation.x += 0.01;
//            mesh.rotation.y += 0.02;

            renderer.render( scene, camera );

        }
    }

    public static getInstance():Renderer
    {
        if(_instance == null) {
            _instance = new Renderer();
        }
        return _instance;
    }

    public createStage(container:string)
    {

    }

    public drawModel(c) {

    }

    public redraw(layer?: number) {
//        if(layer === undefined) {
//            for(var i:number = this._deepestLayer; i <= this._highestLayer; i++) {
//                this._layers[i].draw();
//            }
//        } else {
//            this._layers[layer].draw();
//        }
    }

    public registerTickListener(callback: any) {
//        this._tickListener.push(callback);
    }

    public createGeometry(p: number[][]):THREE.Geometry {
        var g: THREE.Geometry = new THREE.Geometry();
        var len:number = p.length;
        for(var i = 0; i < len;i++) {
            g.vertices.push(new THREE.Vector3(p[i][0], p[i][1], 0));
            console.log(p[i][0],p[i][1]);
        }
        for(var i = len-1; i >= 0;i--) {
            console.log(p[i][0]*-1,p[i][1]);
            g.vertices.push(new THREE.Vector3(p[i][0]*-1, p[i][1], 0));
        }
        g.vertices.push(new THREE.Vector3(p[0][0], p[0][1], 0));
        return g;
    }
}