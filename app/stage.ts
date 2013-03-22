///<reference path='renderer.ts'/>
class Stage {
//    private static _instance:Stage;

    constructor() {
        // Some scene creating code
        var r = Renderer.getInstance()
        r.createStage("screen")
    }

//    public static getInstance():Stage
//    {
//        if(_instance == null) {
//            _instance = new Stage();
//        }
//        return _instance;
//    }
};