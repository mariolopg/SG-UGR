import * as THREE from '../libs/three.module.js'
import { SegundoPendulo } from './segundoPendulo.js'



class pendulo extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui,titleGui);
        this.primerPendulo();
        this.segundoPendulo = new SegundoPendulo();
        this.add(this.segundoPendulo)
        this.segundoPendulo.position.z = 2;
    }

    primerPendulo() {
      var cuboVerdeGeom = new THREE.BoxGeometry(3, 4, 3);
      var cuboVerdeMat = new THREE.MeshBasicMaterial({ color: 0x32a852 });

      this.cuboVerdeSup = new THREE.Mesh(cuboVerdeGeom, cuboVerdeMat);

      this.cuboVerdeInf = new THREE.Mesh(cuboVerdeGeom, cuboVerdeMat);
      this.cuboVerdeInf.translateY(-4 - 5);

      var cylGeom = new THREE.CylinderGeometry( 1, 1, 4, 8 );
      cylGeom.rotateX(Math.PI / 2);
      var cylMat = new THREE.MeshBasicMaterial( {color: 0xa83281} );
      this.tornillo = new THREE.Mesh(cylGeom, cylMat);

      var penduloGeom = new THREE.BoxGeometry(3, 5, 3);
      var penduloMat = new THREE.MeshBasicMaterial({ color: 0xa83232 });
      this.primerPendulo = new THREE.Mesh(penduloGeom, penduloMat);
      this.primerPendulo.translateY(-2 - 5/2);

      this.add(this.cuboVerdeSup);
      this.add(this.cuboVerdeInf);
      this.add(this.tornillo);
      this.add(this.primerPendulo);
    }

    girarPenduloPrimer(giro){
      this.rotation.set(0, 0, giro);
    }

    escalarPrimerPendulo(size){
      this.primerPendulo.geometry.dispose();
      var geometriaPendulo = new THREE.BoxGeometry(3, size, 3);
      this.primerPendulo.geometry = geometriaPendulo;
      this.primerPendulo.position.y = - 2 - size / 2;
      this.cuboVerdeInf.position.y = - 4 - size;
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          size : 5.0,
          giro : 0.0,
          size2 : 10.0,
          posicion: 10,
          giro2: 0.0,
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
          reset : () => {
            this.guiControls.size = 5.0;
            this.guiControls.giro = 0.0;
          }
        }

        var folder = gui.addFolder (titleGui);
        
        // Se crea una sección para los controles de la caja
        var folder1 = folder.addFolder ("Primer pendulo");
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder1.add (this.guiControls, 'size', 5.0, 10.0, 0.1).name ('Longitud : ').listen();
        folder1.add (this.guiControls, 'giro', -Math.PI/4, Math.PI/4, 0.1).name ('Giro : ').listen();

        var folder2 = folder.addFolder ("Segundo pendulo");
        folder2.add (this.guiControls, 'size2', 10.0, 20.0, 1).name ('Longitud : ').listen();
        folder2.add (this.guiControls, 'posicion', 10, 90, 1).name ('Posicion (%) : ').listen();
        folder2.add (this.guiControls, 'giro2', -Math.PI/4, Math.PI/4, 0.1).name ('Giro : ').listen();
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      
      this.rotation.set(0, 0, this.guiControls.giro)
      this.escalarPrimerPendulo(this.guiControls.size)
      this.segundoPendulo.girarPendulo(this.guiControls.giro2)
      this.segundoPendulo.escalarPendulo(this.guiControls.size2)
      this.segundoPendulo.setPosition(0, -2.5 - this.guiControls.posicion * this.guiControls.size / 100, 2)
    }
}

export{ pendulo };