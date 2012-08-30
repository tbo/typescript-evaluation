window.onload = function () {
    var world = tQuery.createWorld().boilerplate().start();
    world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha());
//    tQuery.createAmbientLight().addTo(world).color(0x444444);
//    world.addEffectComposer().sepia().vignette().finish();

    var object = tQuery.createCube().addTo(world);
    // add the fog
    world.addFogExp2({density: 0.1});

    // create lots of objects to show the fog
    var material	= new THREE.MeshBasicMaterial({
        color	: 0xFFaa44
    });
    for(var i = 0; i < 20; i++ ){
        // TODO this doesnt reuse the geometry... not too efficient
        var object	= tQuery.createTorus(material).addTo(world);
        object.translateZ(-i);
        object.translateX(i % 2 ? -1 : 1);
    }
    tQuery.createCheckerboard({
        segmentsW   : 100,  // number of segment in width
        segmentsH   : 100   // number of segment in Height
    }).addTo(world).scaleBy(100);
}
