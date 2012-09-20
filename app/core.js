window.onload = function () {
    var world = tQuery.createWorld().boilerplate().start();
    world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha());
//    tQuery.createAmbientLight().addTo(world).color(0x444444);
//    world.addEffectComposer().sepia().vignette().finish();
    world.camera().position.set( 8, 8, 8 );
    world.camera().lookAt( world.scene().position );
//    var object = tQuery.createShip().addTo(world);
    // add the fog
//    world.addFogExp2({density: 0.02});

//    tQuery.createMesh({
//        segmentsW   : 100,  // number of segment in width
//        segmentsH   : 100   // number of segment in Height
//    }).addTo(world).scaleBy(100);
    world.renderer().shadowMapEnabled   = true;
    world.renderer().shadowMapSoft      = true;
//    world.renderer().setClearColorHex( 0xffffff, 1 );
    tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);
    tQuery.createSimpleNavMesh().addTo(world);
    tQuery.hookKeyboard();


//
    var loader = new THREE.JSONLoader();
    loader.createModel(simpleShipModel,function (model) {
        var material = new THREE.MeshBasicMaterial({wireframe: true, color: 0xff0000});
        mesh = new THREE.Mesh( model, material );
        //mesh.scale.set(0.3, 0.3, 0.3);
//        var objectHolder = new THREE.Object3D();
//        objectHolder.add(mesh);
//        world.scene().add(mesh);
        tQuery(mesh).addTo(world);
//        tQuery(objectHolder).addTo(world);
//        tQuery().World().add(objectHolder);
    });
}

