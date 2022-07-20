
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Auriculares extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    this.createGUI(gui,titleGui);
    this.clock = new THREE.Clock();
    
    this.auriculares = this.createObject()
    this.createMovement();
    this.add(this.auriculares)
  }

  createAuricular(){
    var geometriaOvalo = new THREE.SphereGeometry(1, 32, 16)
    // var geometriaOvalo = new THREE.SphereGeometry(1, 63, 32)
    var material = new THREE.MeshNormalMaterial();
    var ovalo = new THREE.Mesh(geometriaOvalo, material)
    ovalo.scale.y = 1.2;

    var geometriaBox = new THREE.BoxGeometry(1, 4, 4);
    geometriaBox.translate(0.5, 0, 0)
    var caja = new THREE.Mesh(geometriaBox, material)

    var torusGeom = new THREE.TorusGeometry(1, 0.2, 15, 50)
    // var torusGeom = new THREE.TorusGeometry(1, 0.2, 30, 100)
    torusGeom.rotateY(Math.PI / 2)
    var torus = new THREE.Mesh(torusGeom, material)
    torus.scale.y = 1.2;

    var csg = new CSG();
    csg.subtract([ovalo, caja])
    csg.union([torus])

    return csg.toMesh();
  }

  createDiadema(){
    var material = new THREE.MeshNormalMaterial();

    var geometriaBox = new THREE.BoxGeometry(10, 4, 2);
    geometriaBox.translate(0, -2, 0)
    var caja = new THREE.Mesh(geometriaBox, material)

    var torusGeom = new THREE.TorusGeometry(2.25, 0.2, 15, 50)
    // var torusGeom = new THREE.TorusGeometry(2.25, 0.2, 30, 100)
    var torus = new THREE.Mesh(torusGeom, material)

    var csg = new CSG();
    csg.subtract([torus, caja])
    
    return csg.toMesh()
  }

  createObject(){
    var auricularIzquierdo = this.createAuricular();
    auricularIzquierdo.position.x = -2;
    var auricularDerecho = this.createAuricular();
    auricularDerecho.position.x = 2;
    auricularDerecho.rotation.y = Math.PI;
    
    var diadema = this.createDiadema()
    diadema.position.y = 1

    var csg = new CSG();
    csg.union([auricularIzquierdo, auricularDerecho, diadema])
    return csg.toMesh();
  }

  createMovement(){
    this.path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(-10, 10, 0),
      new THREE.Vector3(0, 10, 0),
      new THREE.Vector3(10, 10, 0),
      new THREE.Vector3(10, 0, 0),
    ]);

    var origen = {p: 0}
    var destino = {p: 1}

    this.movement = new TWEEN.Tween(origen).to(destino, 4000)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {
        var posicion = this.path.getPointAt(origen.p)
        this.auriculares.position.copy(posicion)

        // var tangente = this.path.getTangentAt(origen.p)
        // posicion.add(tangente)
        // this.auriculares.lookAt(posicion)
      })
      .onComplete(() => {origen.p = 0;})
      .repeat(Infinity)
      .yoyo(true)
      .start()
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      speed : 2.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.speed = 2.0;
      }
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'speed', 2, 8, 1).name ('Segundos/vuelta : ').listen();
        
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    this.segundosTranscurridos = this.clock.getDelta();
    this.auriculares.rotation.y +=  2 * Math.PI * this.segundosTranscurridos / this.guiControls.speed ;
    TWEEN.update()
  }
}

export { Auriculares }
