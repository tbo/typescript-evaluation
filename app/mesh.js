tQuery.register('createSimpleNavMesh', function(opts){
    var objectHolder = new THREE.Object3D();
    var lineMat = new THREE.LineBasicMaterial( { color: 0xFFFFFF, opacity: 0.3, linewidth: 1 } );
    for(var i = -10; i <= 10; i++) {
        var geom = new THREE.Geometry();
        geom.vertices.push( new THREE.Vertex( new THREE.Vector3(-40, 0, 4*i) ) );
        geom.vertices.push( new THREE.Vertex( new THREE.Vector3( 40, 0, 4*i) ) );
        var line = new THREE.Line(geom, lineMat);
        objectHolder.add(line);
        geom = new THREE.Geometry();
        geom.vertices.push( new THREE.Vertex( new THREE.Vector3(4*i, 0, -40) ) );
        geom.vertices.push( new THREE.Vertex( new THREE.Vector3(4*i, 0, 40) ) );
        var line = new THREE.Line(geom, lineMat);
        objectHolder.add(line);
    }
    return tQuery(objectHolder);
});
tQuery.register('createDottedNavMesh', function(opts){
    var objectHolder = new THREE.Object3D();
    var lineMat = new THREE.LineBasicMaterial( { color: 0x777777, opacity: 1, linewidth: 1 } );
    for(var x = -8; x <= 8; x++) {
        for(var y = -8; y <= 8; y++) {
            var geom = new THREE.Geometry();
            geom.vertices.push( new THREE.Vertex( new THREE.Vector3(-0.2+y*4, 0, 4*x) ) );
            geom.vertices.push( new THREE.Vertex( new THREE.Vector3( 0.2+y*4, 0, 4*x) ) );
            var line = new THREE.Line(geom, lineMat);
            objectHolder.add(line);
            geom = new THREE.Geometry();
            geom.vertices.push( new THREE.Vertex( new THREE.Vector3(4*x, 0, -0.2+y*4) ) );
            geom.vertices.push( new THREE.Vertex( new THREE.Vector3(4*x, 0, 0.2+y*4) ) );
            var line = new THREE.Line(geom, lineMat);
            objectHolder.add(line);
        }
    }
    return tQuery(objectHolder);
});