var navMesh = null;
var totalX = 0;
var totalY = 0;
tQuery.register('createSimpleNavMesh', function(opts) {
    var objectHolder = new THREE.Object3D();
    var lineMat = new THREE.LineBasicMaterial( { color: 0xFFFFFF, opacity: 0.3, linewidth: 1 } );
    for(var i = -10; i <= 10; i++) {
        var geom = new THREE.Geometry();
        geom.vertices.push( new THREE.Vertex( new THREE.Vector3(-40, 4*i, 0) ) );
        geom.vertices.push( new THREE.Vertex( new THREE.Vector3( 40, 4*i, 0) ) );
        var line = new THREE.Line(geom, lineMat);
        objectHolder.add(line);
        geom = new THREE.Geometry();
        geom.vertices.push( new THREE.Vertex( new THREE.Vector3(4*i, -40, 0) ) );
        geom.vertices.push( new THREE.Vertex( new THREE.Vector3(4*i, 40, 0) ) );
        var line = new THREE.Line(geom, lineMat);
        objectHolder.add(line);
    }
    navMesh = objectHolder;
    return tQuery(objectHolder);
});

tQuery.register('createDottedNavMesh', function(opts) {
    var objectHolder = new THREE.Object3D();
    var lineMat = new THREE.LineBasicMaterial( { color: 0x777777, opacity: 1, linewidth: 1 } );
    for(var x = -8; x <= 8; x++) {
        for(var y = -8; y <= 8; y++) {
            var geom = new THREE.Geometry();
            geom.vertices.push( new THREE.Vertex( new THREE.Vector3(-0.2+y*4, 4*x, 0) ) );
            geom.vertices.push( new THREE.Vertex( new THREE.Vector3( 0.2+y*4, 4*x, 0) ) );
            var line = new THREE.Line(geom, lineMat);
            objectHolder.add(line);
            geom = new THREE.Geometry();
            geom.vertices.push( new THREE.Vertex( new THREE.Vector3(4*x, -0.2+y*4, 0) ) );
            geom.vertices.push( new THREE.Vertex( new THREE.Vector3(4*x, 0.2+y*4, 0) ) );
            var line = new THREE.Line(geom, lineMat);
            objectHolder.add(line);
        }
    }
    navMesh = objectHolder;
    return tQuery(objectHolder);
});

tQuery.register('moveNavMesh', function(x,y) {
//    console.log(x,y);
    totalX += x;
    totalY += y;
    if(totalX >= 4) {
        totalX = x;
        x -= 4;
    } else if(totalX <= -4) {
        totalX = x;
        x += 4;
    }
    if(totalY >= 4) {
        totalY = y;
        y -= 4;
    } else if(totalY <= -4) {
        totalY = y;
        y += 4;
    }
    navMesh.translateX(x);
    navMesh.translateY(y);
});