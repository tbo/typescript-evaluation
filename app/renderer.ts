///<reference path='../libs/kinetic.d.ts'/>
class Renderer {

    private static _instance:Renderer;

    private _stage;
    private _baseLayer: number = 0;
    private _deepestLayer: number = -2;
    private _highestLayer: number = 2;
    private _layers: Kinetic.Layer[] = [];
    private _tickListener: any[] = [];

    constructor()
    {
        this._stage = this.createStage("screen")
        var raf = window.requestAnimationFrame;
        var that = this;
        var lastTick = new Date().getTime();
        (function tick() {
            var currentTick = new Date().getTime();
            var elapsedTime = currentTick - lastTick;
            for(var i:number = 0; i < that._tickListener.length; i++) {
                that._tickListener[i](elapsedTime);
            }
            lastTick = currentTick;
            that.redraw();
            if(elapsedTime > 20) {
                console.log(elapsedTime);
            }
            raf(tick);
        })()
//        setInterval(tick,15)

    }

    public static getInstance():Renderer
    {
        if(_instance == null) {
            _instance = new Renderer();
        }
        return _instance;
    }

    public createStage(container:string):Kinetic.Stage
    {
        // Create stage
        this._stage = new Kinetic.Stage({
            container: container,
            width: 800,
            height: 600
        });

        // Create Layers
        for(var i:number = this._deepestLayer; i <= this._highestLayer; i++) {
            this._layers[i] = new Kinetic.Layer();
            this._stage.add(this._layers[i]);
        }
        return this._stage;
    }

    public drawModel(x,y: number, model: string): Kinetic.Shape {
        var p = new Kinetic.Rect({
            x: x,
            y: y,
            width: 150,
            height: 150,
            stroke: 'black',
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

    public registerTickListener(callback: any) {
        this._tickListener.push(callback);
    }
}