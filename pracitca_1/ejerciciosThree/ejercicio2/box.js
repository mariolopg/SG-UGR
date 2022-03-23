import * as THREE from '../libs/three.module.js'

class box extends THREE.Object3D {

    constructor() {
        super();

        this.axis = new THREE.AxisHelper(5);
        this.add(this.axis);
        
        var cuboGeom = new THREE.BoxGeometry(1, 1, 1);
        var cuboMat = new THREE.MeshNormalMaterial();

        this.cubo = new THREE.Mesh(cuboGeom, cuboMat);
        this.add(this.cubo);
    }

    setPosition(x, y, z){
        this.cubo.position.x = x;
        this.cubo.position.y = y;
        this.cubo.position.z = z;
    }

    setRotation(x, y, z){
        this.cubo.rotation.z = z;
        this.cubo.rotation.y = y;
        this.cubo.rotation.x = x;
    }

    setMovement(x, y, z){
        this.cubo.rotation.z += z;
        this.cubo.rotation.y += y;
        this.cubo.rotation.x += x;
    }

    update () {
        this.setMovement(0.01, 0, 0);
    }
    
}

export{ box };