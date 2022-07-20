import * as THREE from '../libs/three.module.js'

class pendulo extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui, titleGui)

        this.h = 5;
        
        var pendulo1Mat = new THREE.MeshNormalMaterial();
        var pendulo2Mat = new THREE.MeshBasicMaterial({color: 0x4287f5});

        var pendulo1Geom = new THREE.BoxGeometry(1, this.guiControls.size, 1);
        pendulo1Geom.translate(0, - this.guiControls.size / 2.0, 0);
        this.pendulo1 = new THREE.Mesh(pendulo1Geom, pendulo1Mat);

        var pendulo2Geom = new THREE.BoxGeometry(1, this.guiControls.size2, 1);
        pendulo2Geom.translate(0, - this.guiControls.size2 / 2.0, 0);
        this.pendulo2 = new THREE.Mesh(pendulo2Geom, pendulo2Mat);

        this.add(this.pendulo1);
        this.add(this.pendulo2);
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          size : 5.0,
          giro : 0.0,
          size2 : 5.0,
          giro2: 0.0,
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
          reset : () => {
            this.guiControls.size = 5.0;
            this.guiControls.giro = 0.0;
            this.guiControls.size2 = 5.0;
            this.guiControls.giro2 = 0.0;
          }
        }

        var folder = gui.addFolder (titleGui);
        
        // Se crea una sección para los controles de la caja
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'size', 5.0, 10.0, 1).name ('Longitud péndulo 1: ').listen();
        folder.add (this.guiControls, 'giro', -Math.PI/4, Math.PI/4, 0.1).name ('Giro péndulo 1: ').listen();

        folder.add (this.guiControls, 'size2', 5.0, 10.0, 1).name ('Longitud péndulo 2: ').listen();
        folder.add (this.guiControls, 'giro2', -Math.PI/4, Math.PI/4, 0.1).name ('Giro péndulo 2: ').listen();
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.rotation.set(0, 0, this.guiControls.giro);
      this.pendulo1.scale.y = this.guiControls.size;

      this.pendulo2.scale.y = this.guiControls.size2;
      this.pendulo2.rotation.set(0, 0, this.guiControls.giro2);
      this.pendulo2.position.y = - this.h * this.guiControls.size;
      
    }
}

export{ pendulo };