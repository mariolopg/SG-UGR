import * as THREE from '../libs/three.module.js'

class cone extends THREE.Object3D {

    constructor() {
        super();

        this.axis = new THREE.AxisHelper(5);
        this.add(this.axis);
        
        var conoGeom = new THREE.ConeGeometry(2, 5, 8);
        var conoMat = new THREE.MeshNormalMaterial();

        this.cono = new THREE.Mesh(conoGeom, conoMat);
        this.add(this.cono);
    }

    setPosition(x, y, z){
        this.cono.position.x = x;
        this.cono.position.y = y;
        this.cono.position.z = z;
    }

    setRotation(x, y, z){
        this.cono.rotation.z = z;
        this.cono.rotation.y = y;
        this.cono.rotation.x = x;
    }

    setMovement(x, y, z){
        this.cono.rotation.z += z;
        this.cono.rotation.y += y;
        this.cono.rotation.x += x;
    }

    update () {
        this.setMovement(0.01, 0, 0);
    }
    
}

export{ cone };