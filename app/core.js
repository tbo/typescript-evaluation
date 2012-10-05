var world = null;
window.onload = function () {
    world = tQuery.createWorld().boilerplate().start();
    world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha());
    world.camera().position.set( 8, 8, 8 );
    world.camera().lookAt( world.scene().position );
    tQuery.createShip();
    // add the fog
//    world.addFogExp2({density: 0.02});
    world.renderer().shadowMapEnabled   = true;
    world.renderer().shadowMapSoft      = true;
//    world.renderer().setClearColorHex( 0xffffff, 1 );
    tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);
    tQuery.createSimpleNavMesh().addTo(world);
    tQuery.hookKeyboard();
}

