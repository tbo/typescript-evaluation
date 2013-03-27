///<reference path='renderer.ts'/>
class Player {
    private _shape: Kinetic.Group;
    private _turnFactor: number = 0.07;

    constructor(private name: string, private _x: number, private _y: number) {
        var r = Renderer.getInstance();
        this._shape = r.drawModel({x:this._x,y:this._y,model:"ship",
            scale: {
                x: 1.4,
                y: 1.4
            }});
        var c = 0;
        var that = this;
        var rotation: number = 0;

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

        r.registerTickListener(function (delta) {
            if(turnRight) {
                rotation += delta*that._turnFactor;
            }
            if(turnLeft) {
                rotation -= delta*that._turnFactor;
            }
            that._shape.setRotationDeg(rotation);
        });
        return this;
    }
};