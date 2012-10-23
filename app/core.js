"use strict"
var player = null;
var space = null;
var stage = null;
var canvas = null;
var speed = 0;
var lastTick = 0;
var acceleration = 0.01;

var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;

var TURN_FACTOR = 0.08;

var accelerate = false;
var turnLeft = false;
var decelerate = false;
var turnRight = false;

window.onload = function () {
    // get a reference to the canvas we'll be working with:
    canvas = document.getElementById("canvasView");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // create a stage object to work with the canvas. This is the top level node in the display list:
    stage = new createjs.Stage(canvas);
    player = createShip();
    stage.addChild(player);
    space = new createjs.Container();
    var graphic = new createjs.Graphics();
    graphic.beginStroke(createjs.Graphics.getRGB(255,0,0));
    graphic.beginFill(new createjs.Graphics.getRGB(100,0,0));
    graphic.drawRect(-30,-30,60,60);
    var roundRectangle= new createjs.Shape(graphic);
    roundRectangle.regX = -300;
    roundRectangle.regY = -300;
    space.addChild(roundRectangle);
    stage.addChild(space);
    stage.update();
    // call update on the stage to make it render the current display list to the canvas:
    stage.update();
    // start the tick and point it at the window so we can do some work before updating the stage:
    createjs.Ticker.useRAF = true;
    // if we use requestAnimationFrame, we should use a framerate that is a factor of 60:
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addListener(window);
    document.addEventListener( 'keydown', onKey(true), false );
    document.addEventListener( 'keyup', onKey(false), false );
}

function tick() {
    var delta = createjs.Ticker.getTime() - lastTick;
    lastTick = createjs.Ticker.getTime();
    if(turnLeft) {
        player.rotation -= delta*TURN_FACTOR;
    }
    if(turnRight) {
        player.rotation += delta*TURN_FACTOR;
    }

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
        var r = player.rotation * Math.PI / 180;
        space.y += speed*0.1*Math.cos(r);
        space.x -= speed*0.1*Math.sin(r);
//        var yChange = speed*delta*-0.02*Math.cos(rotation);
//        var xChange = speed*delta*0.02*Math.sin(rotation);
//        moveNavMesh(xChange,yChange);
//        x += xChange;
//        y += yChange;
    }
    stage.update();
}

function buildShip(g,strokeStyle,p) {
    g.setStrokeStyle(strokeStyle);
    g.beginStroke(createjs.Graphics.getRGB(255,0,0));
    g.beginFill(createjs.Graphics.getRGB(100,0,0));
    for(var m = -1; m < 2; m+=2) {
        g.moveTo(p[0][0]*m,p[0][1]);
        for(var i = 1, len = p.length; i < len;i++) {
            g.lineTo(p[i][0]*m,p[i][1]);
        }
    }
    return g;
}

function createShip() {
    var g = new createjs.Graphics();
    g = buildShip(g,0.9,[
        [0,120],
        [1,120],
        [3,125],
        [18,125],
        [20,120],
        [38,128],
        [44,128],
        [30,50],
        [33,40],
        [44,45],
        [27,-30],
        [13,-40],
        [13,-13],
        [0, 0]
    ]);
    g = buildShip(g,0.3,[
        [13,-13],
        [30,50],
        [20,105],
        [18,125]
    ]);
    g = buildShip(g,0.3,[
        [0,20],
        [10,70],
        [0,90]
    ]);
    var s = new createjs.Shape(g);
    s.scaleX = 0.5;
    s.scaleY = 0.5;
    s.x = canvas.width/2;
    s.y = canvas.height/2;
    s.regY = 44;
    return s;
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