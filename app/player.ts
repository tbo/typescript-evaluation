///<reference path='renderer.ts'/>
///<reference path='space.ts'/>
class Player {
//    private _shape: Kinetic.Group;
    private _turnFactor: number = 0.0005;

    constructor() {
        var r = Renderer.getInstance();
        var space = Space.getInstance();
        var x = window.innerWidth/2;
        var y = window.innerHeight/2;
        var ship: Ship = r.createShip(0xff0000);
        var c = 0;
        var that = this;


        var accelerate: bool = false
        var turnLeft: bool = false
        var decelerate: bool = false
        var turnRight: bool = false

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

        document.addEventListener( 'keydown', onKey(true), false );
        document.addEventListener( 'keyup', onKey(false), false );

        var lastFrame: number = 0;
        var speedX: number = 0;
        var speedY: number = 0;
        var rotation: number = 0;
        var speed: number = 0;
        r.registerTickListener(function (timestamp: number) {
            var delta: number = timestamp - lastFrame;
            var turn: number = delta*that._turnFactor
            lastFrame = timestamp;
            if(turnRight) {
                rotation -= turn;
            }
            if(turnLeft) {
                rotation += turn;
            }
            ship.setRotation(rotation);


            var acceleration = 0.04;
            var deceleration = 0.05;
            if(accelerate) {
                speed += acceleration * delta;
                if(speed > 100) {
                    speed = 100;
                }
            } else if(decelerate) {
                speed -= deceleration * delta;
                if(speed < 0) {
                    speed = 0;
                }
            }
            if(speed > 0) {
                var r = rotation * Math.PI;
                var yChange = speed*delta*0.001*Math.cos(rotation);
                var xChange = speed*delta*-0.001*Math.sin(rotation);
//        moveNavMesh(xChange,yChange);
//        x += xChange;
//        y += yChange;
                space.move(xChange,yChange);
            }

        });
        return this;
    }
};