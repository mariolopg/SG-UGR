import * as THREE from '../libs/three.module.js'

class revolucion extends THREE.Object3D {

    constructor() {
        super();

        var points = [];
        points.push(new THREE.Vector2(0.01, 0));
        points.push(new THREE.Vector2(0.5, 1));
        points.push(new THREE.Vector2(0.45, 1));
        points.push(new THREE.Vector2(0.45, 0.95));
        points.push(new THREE.Vector2(0.005, 0));

        var revGeom = new THREE.LatheGeometry(points);
        var revMat = new THREE.MeshNormalMaterial();

        this.revolution = new THREE.Mesh(revGeom, revMat);
        this.add(this.revolution);
    }

    
    
}

export{ revolucion };