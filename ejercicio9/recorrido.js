import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class recorrido extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        var geometry = new THREE.ConeGeometry( 0.5, 2, 3 );
        geometry.rotateX(Math.PI/2)
        var material = new THREE.MeshNormalMaterial( );
        this.objeto = new THREE.Mesh(geometry, material);
        this.add(this.objeto)

        this.generatePath();
        this.generatePath2();
        this.tweenMovement2();
        this.tweenMovement();
    }

    generatePath(){
      this.curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 5, 0),
        new THREE.Vector3(3, 7, 4),
        new THREE.Vector3(0, 5, 7),
        new THREE.Vector3(-3, 5, 4),
        new THREE.Vector3(0, 5, 0),
      ]);

      var geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(this.curve.getPoints(100))

      var material = new THREE.LineBasicMaterial({color:0xff0000, linewidth: 2});
      var visibleSpline = new THREE.Line(geometry, material)
      this.add(visibleSpline)

    }

    generatePath2(){
      this.curve2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 5, 0),
        new THREE.Vector3(3, 5, -4),
        new THREE.Vector3(0, 2, -7),
        new THREE.Vector3(-3, 5, -4),
        new THREE.Vector3(0, 5, 0),
      ]);

      var geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(this.curve2.getPoints(100))

      var material = new THREE.LineBasicMaterial({color:0xff0000, linewidth: 2});
      var visibleSpline = new THREE.Line(geometry, material)
      this.add(visibleSpline)

    }

    tweenMovement2(){
      var origen = {p: 0}
      var destino = {p: 1}

      this.movimiento2 = new TWEEN.Tween(origen).to(destino, 8000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          var posicion = this.curve2.getPointAt(origen.p)
          this.objeto.position.copy(posicion)

          var tangente = this.curve2.getTangentAt(origen.p)
          posicion.add(tangente)
          this.objeto.lookAt(posicion)
        })
        .onComplete(() => {origen.p = 0;})
    }

    tweenMovement(){
      var origen = {p: 0}
      var destino = {p: 1}

      this.movimiento = new TWEEN.Tween(origen).to(destino, 4000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          var posicion = this.curve.getPointAt(origen.p)
          this.objeto.position.copy(posicion)

          var tangente = this.curve.getTangentAt(origen.p)
          posicion.add(tangente)
          this.objeto.lookAt(posicion)
        })
        .onComplete(() => {origen.p = 0;})

        this.movimiento.chain(this.movimiento2)
        this.movimiento2.chain(this.movimiento)
        this.movimiento.start()
    }

    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      
      // var time = Date.now()
      // var looptime = 4000;
      // var t = (time % looptime) / looptime;

      // var posicion = this.curve.getPointAt(t)
      // this.objeto.position.copy(posicion)

      // var tangente = this.curve.getTangentAt(t)
      // posicion.add(tangente)
      // this.objeto.lookAt(posicion)

      TWEEN.update()
    }
}

export{ recorrido };