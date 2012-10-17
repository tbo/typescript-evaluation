"use strict"
var world = null;
var accelerate = false;
var turnLeft = false;
var decelerate = false;
var turnRight = false;
var ship = null;
var speed = 0;
var clock = new THREE.Clock();
var totalX = 0;
var totalY = 0;
var navMesh = null;
var acceleration = 50;
var x = 0;
var y = 0;
var rotation = 0;

window.onload = function () {
    var stats, scene, renderer, composer;
    var camera, cameraControls;

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
        cameraControls = new THREEx.DragPanControls(camera)

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

        var objectHolder = new THREE.Object3D();
        var lineMat = new THREE.LineBasicMaterial( { color: 0x666666, opacity: 0.3, linewidth: 1 } );
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
        var delta = clock.getDelta();
        if(turnRight) {
            var r = 1*delta
            ship.rotation.z -= r;
        }

        if (turnLeft) {
            var r = 1*delta
            ship.rotation.z += r;
        }
        rotation = ship.rotation.z;
        ship.updateMatrix();

//    if(rotation > Math.PI) {
//        rotation %= Math.PI;
//    }
//    if(rotation < 0) {
//        rotation =  Math.PI - (rotation%Math.PI);
//    }

        if(accelerate) {
            speed += acceleration * delta;
            if(speed > 100) {
                speed = 100;
            }
        } else if(decelerate) {
            speed -= acceleration * delta;
            if(speed < 0) {
                speed = 0;
            }
        }

        if(speed > 0) {
            var yChange = speed*delta*-0.02*Math.cos(rotation);
            var xChange = speed*delta*0.02*Math.sin(rotation);
            moveNavMesh(xChange,yChange);
            x += xChange;
            y += yChange;
        }
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
}

function moveNavMesh(x,y) {
    totalX += x;
    totalY += y;
    if(totalX >= 4) {
        totalX = x;
        x -= 4;
    } else if(totalX <= -4) {
        totalX = x;
        x += 4;
    }
    if(totalY >= 4) {
        totalY = y;
        y -= 4;
    } else if(totalY <= -4) {
        totalY = y;
        y += 4;
    }
    navMesh.translateX(x);
    navMesh.translateY(y);
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

