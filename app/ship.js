var rotation = Math.PI/2;
var speed = 0;
var acceleration = 50;
var x = 0;
var y = 0;
tQuery.register('createShip', function(material){
    ship = tQuery.createHeartShape().extrude()
        .computeAll().center()
        .normalize().rotateY(Math.PI/2).rotateZ(Math.PI/2)
        .toMesh(material);
    return ship;
});

tQuery.register('createShipShape', function(){
    var x	= 0, y	= 0;
    // TODO put it upsidedown and normalize it
    var shape	= tQuery.createShape()
        .moveTo( x + 25, y + 25 )
        .bezierCurveTo( x + 25, y + 25, x + 20, y, x, y )
        .bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 )
        .bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 )
        .bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 )
        .bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y )
        .bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 )
    return shape;
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

    if(keyboard.pressed(opts.keyStateRight)) {
        var r = -1*delta
        ship.rotateZ(r);
        rotation += r;
    }

    if (keyboard.pressed(opts.keyStateLeft)) {
        var r = 1*delta
        ship.rotateZ(r);
        rotation += r;
    }

//    if(rotation > Math.PI) {
//        rotation %= Math.PI;
//    }
//    if(rotation < 0) {
//        rotation =  Math.PI - (rotation%Math.PI);
//    }

    if(keyboard.pressed(opts.keyStateUp)) {
        speed += acceleration * delta;
        if(speed > 100) {
            speed = 100;
        }
    } else if(keyboard.pressed(opts.keyStateDown) && speed > 0) {
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