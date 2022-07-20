import * as THREE from '../libs/three.module.js'

class barrido extends THREE.Object3D {

    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.heartShape = new THREE.Shape();

        this.heartShape.moveTo( 25, 25 );
        this.heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
        this.heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
        this.heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
        this.heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
        this.heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
        this.heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

        this.extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 2 };


        var barGeom = new THREE.ExtrudeGeometry( this.heartShape, this.extrudeSettings );
        this.barMat = new THREE.MeshNormalMaterial();

        this.barrido = new THREE.Mesh(barGeom, this.barMat);
        this.add(this.barrido);
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
    
      setDetail(detail){
        var aux = this.barrido;
    
      }
      
      update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
       
        this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
        this.extrudeSettings.depth = this.guiControls.depth;
        this.barrido.geometry.dispose();
        this.barrido.geometry = new THREE.ExtrudeGeometry(this.heartShape, this.extrudeSettings)
    
        // this.barrido.rotation.x +=0.1;
        this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
        this.scale.set (this.guiControls.size,this.guiControls.size,this.guiControls.size);
      }
    
}

export{ barrido };