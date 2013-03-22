///<reference path='renderer.ts'/>
class Player {
    private _player: Kinetic.Shape;

    constructor(private name: string, private x,y: number) {
        // Some scene creating code
        var r = Renderer.getInstance();
        this._player = r.addPlayer(x,y);
        this._player.setRotationDeg(50);
        r.redraw();
    }

    public turnRight() {
    }

    public turnLeft() {

    }
};