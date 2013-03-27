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
        function tick() {
            var currentTick = new Date().getTime();
            var elapsedTime = currentTick - lastTick;
            for(var i:number = 0; i < that._tickListener.length; i++) {
                that._tickListener[i](elapsedTime);
            }
            lastTick = currentTick;
            that.redraw();
            raf(tick);
        }
        tick();
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

    public drawModel(c: modelConfig): Kinetic.Group {
        var group = new Kinetic.Group(c);
//        var b = new Kinetic.Polygon({
//            points: [
//                -35,23,
//                -35,15,
//                -5,-64,
//                5,-64,
//                35,15,
//                35,23
//            ],
//            fill: '#f0f0f0',
//            stroke: '#555555',
//            strokeWidth: 1,
//            x: 0,
//            y: 0
//        });
//        group.add(b);
//        var p = new Kinetic.Polygon({
//            points: [
//                -4,53,
//                -10,60,
//                -11,67,
//                -15,67,
//                -35,53,
//                -35,23,
//                -18,-7,
//                -6,-64,
//                -3,-67,
//                3,-67,
//                6,-64,
//                18,-7,
//                35,23,
//                35,53,
//                15,67,
//                11,67,
//                10,60,
//                4,53
//            ],
//            fill: '#dfdfdf',
//            stroke: '#555555',
//            strokeWidth: 1,
//            x: 0,
//            y: 0
//        });
//        group.add(p);
//        var c = new Kinetic.Polygon({
//            points: [
//                -4,62,
//                -10,57,
//                -18,-7,
//                -6,-64,
//                -3,-67,
//                3,-67,
//                6,-64,
//                18,-7,
//                10,57,
//                4,62
//            ],
//            fill: '#f5f5f5',
//            stroke: '#555555',
//            strokeWidth: 1,
//            x: 0,
//            y: 0
//        });
//        group.add(c);
        var b = new Kinetic.Polygon({
            points: [
                -3,98,
                -7,102,
                -12,102,
                -22,90,
                -22,52,
                -12,43,
                -8,13,
                -4,3,
                4,3,
                8,13,
                12,43,
                22,52,
                22,90,
                12,102,
                7,102,
                3,98
            ],
            fill: '#f0f0f0',
            stroke: '#999999',
            strokeWidth: 1,
            x: 0,
            y: 0,
            offset: {
                x: 0,
                y: 49
            }
        });
        group.add(b);
        var c = new Kinetic.Polygon({
            points: [
                9,63,
                21,52,
                21,90,
                9,79
            ],
            fill: '#dddddd',
            x: 0,
            y: 0,
            offset: {
                x: 0,
                y: 49
            }
        });
        group.add(c);
        var d = new Kinetic.Polygon({
            points: [
                -9,63,
                -21,52,
                -21,90,
                -9,79
            ],
            fill: '#dddddd',
            x: 0,
            y: 0,
            offset: {
                x: 0,
                y: 49
            }
        });
        group.add(d);
        this._layers[this._baseLayer].add(group);
        return group;
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

interface modelConfig extends Kinetic.ObjectOptionsConfig {
    model: string;
}