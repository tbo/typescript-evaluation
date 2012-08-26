window.onload = function () {
    var world = tQuery.createWorld().boilerplate().start();
//    world.addEffectComposer().sepia().vignette().finish();
    var object = tQuery.createCube().addTo(world);
}
