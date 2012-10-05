var rotation = Math.PI/2;
var speed = 0;
var acceleration = 50;
var x = 0;
var y = 0;
var ship;
tQuery.register('createShip', function(){
    /*
    var material = new THREE.MeshNormalMaterial({opacity: 1});
    ship = tQuery.createShipShape();
    return tQuery(ship);
    var loader = new THREE.JSONLoader();
    loader.createModel(simpleShipModel,function (model) {
        var material = new THREE.MeshNormalMaterial();
	ship = new THREE.Object3D();
        var mesh = new THREE.Mesh( model, material );
        mesh.scale.set(0.3, 0.3, 0.3);
	ship.add(mesh);
        tQuery(ship).addTo(world);
    });
    */
    var loader = new THREE.JSONLoader();
    loader.createModel(simpleShipModel,function (model) {
        var material = new THREE.MeshNormalMaterial();
        var object = new THREE.Object3D();
        var mesh = new THREE.Mesh( model, material );
        mesh.scale.set(0.3, 0.3, 0.3);
        object.add(mesh);
        ship = new THREE.Object3D();
        ship.add(object);
        tQuery(ship).addTo(world);
    });
});

tQuery.register('createShipShape', function(){
    // TODO put it upsidedown and normalize it
    var objectHolder = new THREE.Object3D();
    var geom = new THREE.Geometry();
    geom.vertices.push( new THREE.Vertex( new THREE.Vector3(40, 0, 20) ) );
    geom.vertices.push( new THREE.Vertex( new THREE.Vector3(40, 20, 0) ) );
    var object = new THREE.Mesh(new THREE.CylinderGeometry(2,1,1), new THREE.MeshNormalMaterial( { color: 0x777777, opacity: 1, linewidth: 1 } ));
    objectHolder.add(object);
    return objectHolder;
});



tQuery.register('hookKeyboard', function(opts){
    // handle parameters
    opts	= tQuery.extend(opts, {
        loop		: tQuery.world.loop(),
        keyStateRight	: "right",
        keyStateUp	: "up",
        keyStateLeft	: "left",
        keyStateDown	: "down"
    });
    // create the loop callback
    var loopCb	= this.hookKeyboardLoopCb.bind(this);
    // store the loopCb
    tQuery.data(this, 'keyboard', {
        loopCb	: loopCb,
        opts	: opts
    }, true);
    // hook the callback
    opts.loop.hook(loopCb);
    // for chained API
    return this;
});

tQuery.register('unhookKeyboard', function(opts){
    // handle parameters
    opts	= tQuery.extend(opts, {
        loop	: tQuery.world.loop()
    });
    // fetch data
    var data	= tQuery.data(this, 'keyboard');
    // unstore loopCb
    tQuery.removeData(this, 'keyboard');
    // unhook the callback
    opts.loop.unhook(data.loopCb);
    // for chained API
    return this;
});

tQuery.register('hookKeyboardLoopCb', function(delta, now){
    var data	= tQuery.data(this, 'keyboard');
    var opts	= data.opts;
    var keyboard	= tQuery.keyboard();

    if(keyboard.pressed("d")) {
        var r = 1*delta
        ship.rotation.z -= r;
    }

    if (keyboard.pressed("a")) {
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

    if(keyboard.pressed("w")) {
        speed += acceleration * delta;
        if(speed > 100) {
            speed = 100;
        }
    } else if(keyboard.pressed("s") && speed > 0) {
        speed -= acceleration * delta;
        if(speed < 0) {
            speed = 0;
        }
    }

    if(speed > 0) {
        var yChange = speed*delta*-0.01*Math.cos(rotation);
        var xChange = speed*delta*0.01*Math.sin(rotation);
        tQuery.moveNavMesh(xChange,yChange);
        x += xChange;
        y += yChange;
    }
});
