///<reference path='renderer.ts'/>
class Player {
//    private _shape: Kinetic.Group;
    private _turnFactor: number = 0.0007;

    constructor() {
        var r = Renderer.getInstance();
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
        r.registerTickListener(function (timestamp: number) {
            var rotation: number = 0;
            var delta:number = timestamp - lastFrame;
            lastFrame = timestamp;
            if(turnRight) {
                rotation = -delta*that._turnFactor;
            }
            if(turnLeft) {
                rotation = delta*that._turnFactor;
            }
            ship.setRotation(rotation);
        });
        return this;
    }
};