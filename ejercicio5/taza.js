import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'


class taza extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui,titleGui);

        // Cuerpo de la taza
        var geometry = new THREE.CylinderGeometry( 5, 5, 12, 32 );
        var material = new THREE.MeshNormalMaterial();
        this.cylinder = new THREE.Mesh( geometry, material);

        // Interior taza
        var geometry = new THREE.CylinderGeometry( 4.5, 4.5, 12, 32 );
        geometry.translate(0, 2, 0);
        this.cylinderExc = new THREE.Mesh( geometry, material);

        // Mango
        var geometryTorus = new THREE.TorusGeometry( 4, 1, 20, 100 );
        geometryTorus.translate(5, 0, 0)
        this.torus = new THREE.Mesh( geometryTorus, material );

        // Exclusión interior a cuerpo
        this.csg = new CSG();
        this.csg.union([this.cylinder, this.torus])
        this.csg.subtract([this.cylinderExc]);

        this.add(this.csg.toMesh());
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          size : 1.0,
          depth : 8,
          
          rotX : 0.0,
          rotY : 0.0,
          rotZ : 0.0,
          
          posX : 0.0,
          posY : 0.0,
          posZ : 0.0,
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
          reset : () => {
            this.guiControls.size = 1.0;
            this.guiControls.depth = 8;
            
            this.guiControls.rotX = 0.0;
            this.guiControls.rotY = 0.0;
            this.guiControls.rotZ = 0.0;
            
            this.guiControls.posX = 0.0;
            this.guiControls.posY = 0.0;
            this.guiControls.posZ = 0.0;
          }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'size', 0.1, 5.0, 0.1).name ('Tamaño : ').listen();
        folder.add (this.guiControls, 'depth', 8, 100, 1).name('Depth: ').listen();
        
        folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
        folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
        folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
        
        folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
        folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
        folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
      }
}

export{ taza };