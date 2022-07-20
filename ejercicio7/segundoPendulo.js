import * as THREE from '../libs/three.module.js'

class SegundoPendulo extends THREE.Object3D {
    constructor() {
        super();
        this.segundoPendulo()
    }

    segundoPendulo(){
        var cylGeom = new THREE.CylinderGeometry( 0.5, 0.5, 1, 8 );
        cylGeom.rotateX(Math.PI / 2);
        var cylMat = new THREE.MeshBasicMaterial( {color: 0x1da100} );
        this.tornilloSegundoPendulo = new THREE.Mesh(cylGeom, cylMat);

        var penduloGeom = new THREE.BoxGeometry(2, 10, 0.5);
        var penduloMat = new THREE.MeshBasicMaterial({ color: 0x0080ff });
        this.segundoPendulo = new THREE.Mesh(penduloGeom, penduloMat);
        this.segundoPendulo.position.y = -4;

        this.add(this.tornilloSegundoPendulo);
        this.add(this.segundoPendulo);
    }

    girarPendulo(giro){
      this.rotation.set(0, 0, giro)
    }

    escalarPendulo(size){
      this.segundoPendulo.geometry.dispose();
      var geometriaPendulo = new THREE.BoxGeometry(2, size, 0.5);
      this.segundoPendulo.geometry = geometriaPendulo;
      this.segundoPendulo.position.y = 1 - size / 2;
      this.setPosition(0, -3.5, 2)
    }

    setPosition(x, y, z){
      this.position.x = x
      this.position.y = y
      this.position.z = z
    }
}

export{ SegundoPendulo };