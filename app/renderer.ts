///<reference path='../libs/kinetic.d.ts'/>
class Renderer {

    private static _instance:Renderer;

    private _stage;
    private _baseLayer: number = 0;
    private _deepestLayer: number = -5;
    private _highestLayer: number = 5;
    private _layers: Kinetic.Layer[] = [];

    constructor()
    {
        window.requestAnimationFrame = window.requestAnimationFrame;
        var that = this;
        window.requestAnimationFrame(function (){
            that.redraw();
        });
    }

    public static getInstance():Renderer
    {
        if(_instance == null) {
            _instance = new Renderer();
        }
        return _instance;
    }

    public createStage(container:string):void
    {
        // Create stage
        this._stage = new Kinetic.Stage({
            container: container,
            width: 578,
            height: 200
        });

        // Create Layers
        for(var i:number = this._deepestLayer; i <= this._highestLayer; i++) {
            this._layers[i] = new Kinetic.Layer();
            var rect = new Kinetic.Rect({
                x: 10,
                y: 10,
                width: 100,
                height: 50,
                fill: 'green',
                stroke: 'white',
                strokeWidth: 4
            });
            this._stage.add(this._layers[i]);
        }
    }

    public addPlayer(x,y: number): Kinetic.Shape {
        var p = new Kinetic.Rect({
            x: x,
            y: y,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'white',
            strokeWidth: 4
        });
        this._layers[this._baseLayer].add(p);
        return p;
    }

    public redraw(layer?: number) {
        if(layer === undefined) {
            for(var i:number = this._deepestLayer; i <= this._highestLayer; i++) {
                this._layers[i].draw();
            }
        } else {
            this._layers[layer].draw();
        }
    }
}