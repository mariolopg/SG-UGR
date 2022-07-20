import * as THREE from '../libs/three.module.js'

class reloj extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        this.createGUI(gui,titleGui);

        this.clock = new THREE.Clock();

        var boxMat = new THREE.MeshPhongMaterial ( {map:new THREE.TextureLoader().load('../imgs/wood.jpg')});
        var boxGeom = new THREE.BoxGeometry(50, 2, 50);
        boxGeom.translate(0, -1, 0);
        this.superficie = new THREE.Mesh(boxGeom, boxMat)

        var sphereMat = new THREE.MeshPhongMaterial({color:0x34eb49})
        var sphereGeom = new THREE.SphereGeometry(1,64,32)
        sphereGeom.translate(14, 0, 0);

        for(var i = 0; i < 12; i++){
          var sphere = new THREE.Mesh(sphereGeom, sphereMat)
          sphere.rotation.y = i * Math.PI / 6;
          this.add(sphere)
        }

        var sphereManMat = new THREE.MeshPhongMaterial({color:0xeb4034})
        var sphereManGeom = new THREE.SphereGeometry(1,64,32)
        sphereManGeom.translate(0, 0, -12)
        this.manecilla = new THREE.Mesh(sphereManGeom, sphereManMat);
        this.add(this.manecilla)
        this.add(this.superficie)
        
    }



    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          speed : 1.0,
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
          reset : () => {
            this.guiControls.speed = 1.0;
          }
        }

        var folder = gui.addFolder (titleGui);
        
        // Se crea una sección para los controles de la caja
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'speed', -12.0, 12.0, 1).name ('Velocidad (marcas/s) : ').listen();
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.segundosTranscurridos = this.clock.getDelta();
      this.manecilla.rotation.y -=  this.segundosTranscurridos * this.guiControls.speed * Math.PI / 6;
      
    }
}

export{ reloj };