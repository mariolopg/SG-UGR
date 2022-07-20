import * as THREE from '../libs/three.module.js'

class barrido extends THREE.Object3D {

    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.generatePath();
        this.box = new THREE.Shape()
        this.box.moveTo(0, -1.5)
        this.box.quadraticCurveTo(0.1, -0.1, 1.5, 0)
        this.box.quadraticCurveTo(0.1, 0.1, 0, 1.5)
        this.box.quadraticCurveTo(-0.1, 0.1, -1.5, 0)
        this.box.quadraticCurveTo(-0.1, -0.1, 0, -1.5)

        // this.box.bezierCurveTo(0, -3, 1, -1)
        // this.box.bezierCurveTo(1, -1, 3, 0)
        // this.box.bezierCurveTo(3, 0, 1, 1)
        // this.box.bezierCurveTo(1, 1, 0, 3)
        // this.box.bezierCurveTo(0, 3, -1, 1)
        // this.box.bezierCurveTo(-1, 1, -3, 0)
        // this.box.bezierCurveTo(-3, 0, -1, -1)
        // this.box.bezierCurveTo(-1, -1, 0, -3)

        // this.add(this.box)

        this.options = {steps: 50, curveSegments: 100, extrudePath: this.curve}
        this.geometry = new THREE.ExtrudeGeometry(this.box, this.options)
        this.material = new THREE.MeshNormalMaterial();
        this.object = new THREE.Mesh(this.geometry, this.material)
        this.add(this.object)
    }

    generatePath(){
      this.curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(3, 5, 0),
        new THREE.Vector3(3, 7, 4),
        new THREE.Vector3(0, 5, 7),
        new THREE.Vector3(-3, 5, 4),
        new THREE.Vector3(0, 5, 0),
      ]);
    }
    
}

export{ barrido };