var world = null;
accelerate = false;
turnLeft = false;
decelerate = false;
turnRight = false;
window.onload = function () {
    var stats, scene, renderer, composer;
    var camera, cameraControl;
    var navMesh;

    if( !init() )	animate();

    // init the scene
    function init(){

//        if( Detector.webgl ){
            renderer = new THREE.WebGLRenderer({
                antialias		: true,	// to get smoother output
                preserveDrawingBuffer	: true	// to allow screenshot
            });
            renderer.setClearColorHex( 0x000000, 1 );
//        }else{
//            Detector.addGetWebGLMessage();
//            return true;
//        }
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('container').appendChild(renderer.domElement);

        // add Stats.js - https://github.com/mrdoob/stats.js
        stats = new Stats();
        stats.domElement.style.position	= 'absolute';
        stats.domElement.style.bottom	= '0px';
        document.body.appendChild( stats.domElement );

        // create a scene
        scene = new THREE.Scene();
//        scene.fog = new THREE.FogExp2( 0x000000, 1 );
        // put a camera in the scene
        var cameraH	= 25;
        var cameraW	= cameraH / window.innerHeight * window.innerWidth;
        camera	= new THREE.OrthographicCamera( -cameraW/2, +cameraW/2, cameraH/2, -cameraH/2, -10000, 10000 );
        camera.position.set(0, 0, 5);
        scene.add(camera);

        // create a camera contol
        cameraControls	= new THREEx.DragPanControls(camera)

        // transparently support window resize
        THREEx.WindowResize.bind(renderer, camera);
        // allow 'p' to make screenshot
        THREEx.Screenshot.bindKey(renderer);
        // allow 'f' to go fullscreen where this feature is supported
        if( THREEx.FullScreen.available() ){
            THREEx.FullScreen.bindKey();
//            document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
        }

        // here you add your objects
        // - you will most likely replace this part by your own
        var light	= new THREE.AmbientLight( Math.random() * 0xffffff );
        scene.add( light );
        var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
        light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
        scene.add( light );
        var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
        light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
        scene.add( light );
        var light	= new THREE.PointLight( Math.random() * 0xffffff );
        light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
            .normalize().multiplyScalar(1.2);
        scene.add( light );
        var light	= new THREE.PointLight( Math.random() * 0xffffff );
        light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
            .normalize().multiplyScalar(1.2);
        scene.add( light );

//        var geometry	= new THREE.SphereGeometry( 1, 16, 8 );
//        var material	= new THREE.MeshNormalMaterial();
//        var mesh	= new THREE.Mesh( geometry, material );
//        scene.add( mesh );

        var objectHolder = new THREE.Object3D();
        var lineMat = new THREE.LineBasicMaterial( { color: 0x777777, opacity: 0.5, linewidth: 1 } );
        for(var i = -10; i <= 10; i++) {
            var geom = new THREE.Geometry();
            geom.vertices.push( new THREE.Vector3(-40, 4*i, 0) );
            geom.vertices.push( new THREE.Vector3( 40, 4*i, 0) );
            var line = new THREE.Line(geom, lineMat);
            objectHolder.add(line);
            geom = new THREE.Geometry();
            geom.vertices.push( new THREE.Vector3(4*i, -40, 0) );
            geom.vertices.push( new THREE.Vector3(4*i, 40, 0) );
            var line = new THREE.Line(geom, lineMat);
            objectHolder.add(line);
        }
        navMesh = objectHolder;
        scene.add(navMesh);
        var loader = new THREE.JSONLoader();
        loader.createModel(simpleShipModel,function (model) {
            var material = new THREE.MeshNormalMaterial();
            var object = new THREE.Object3D();
            var mesh = new THREE.Mesh( model, material );
            mesh.scale.set(0.3, 0.3, 0.3);
            object.add(mesh);
            ship = new THREE.Object3D();
            ship.add(object);
            scene.add(ship);
        });
        document.addEventListener( 'keydown', onKey(true), false );
        document.addEventListener( 'keyup', onKey(false), false );
    }

    // animation loop
    function animate() {

        // loop on request animation loop
        // - it has to be at the begining of the function
        // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
        requestAnimationFrame( animate );

        // do the render
        render();

        // update stats
        stats.update();
    }

    // render the scene
    function render() {
        // variable which is increase by Math.PI every seconds - usefull for animation
        var PIseconds	= Date.now() * Math.PI;

        // update camera controls
        cameraControls.update();

        // animate DirectionalLight
//        scene.lights.forEach(function(light, idx){
//            if( light instanceof THREE.DirectionalLight === false )	return;
//            var ang	= 0.0005 * PIseconds * (idx % 2 ? 1 : -1);
//            light.position.set(Math.cos(ang), Math.sin(ang), Math.cos(ang*2)).normalize();
//        });
        // animate PointLights
//        scene.lights.forEach(function(light, idx){
//            if( light instanceof THREE.PointLight === false )	return;
//            var angle	= 0.0005 * PIseconds * (idx % 2 ? 1 : -1) + idx * Math.PI/3;
//            light.position.set(Math.cos(angle)*3, Math.sin(angle*3)*2, Math.cos(angle*2)).normalize().multiplyScalar(2);
//        });

        // actually render the scene
        renderer.render( scene, camera );
    }

    /*
    world = tQuery.createWorld().boilerplate().start();
    world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha());
    world.camera().position.set( 8, 8, 8 );
    world.camera().lookAt( world.scene().position );
    tQuery.createShip();
    // add the fog
//    world.addFogExp2({density: 0.02});
//    tQuery.scene().fog	= new THREE.FogExp2(tQuery.renderer().getClearColor().getHex(), 0.02 );
    world.renderer().shadowMapEnabled   = true;
    world.renderer().shadowMapSoft      = true;
//    world.renderer().setClearColorHex( 0xffffff, 1 );
    tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);
    tQuery.createSimpleNavMesh().addTo(world);
    tQuery.hookKeyboard();
    */
}

function onKey(v) {
    return function ( event ) {
        //event.preventDefault();
        switch ( event.keyCode ) {
            case 38: /*up*/
            case 87: /*W*/ accelerate = v; break;

            case 37: /*left*/
            case 65: /*A*/ turnLeft = v; break;

            case 40: /*down*/
            case 83: /*S*/ decelerate = v; break;

            case 39: /*right*/
            case 68: /*D*/ turnRight = v; break;
        }
    };
}

