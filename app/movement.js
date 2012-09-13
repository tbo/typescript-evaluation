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
    if(keyboard.pressed(opts.keyStateUp)) {
        console.log("here");
    }
    // keyboard handling
//    this.controls().moveLeft	= keyboard.pressed(opts.keyStateLeft);
//    this.controls().moveRight	= keyboard.pressed(opts.keyStateRight);
//    this.controls().moveForward	= keyboard.pressed(opts.keyStateUp);
//    this.controls().moveBackward	= keyboard.pressed(opts.keyStateDown);

//    this.flareVisible(['backA', 'backB']	, this.controls().moveBackward );
//    this.flareVisible(['frontA', 'frontB']	, keyboard.pressed("space") );
});