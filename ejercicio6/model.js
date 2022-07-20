import * as THREE from '../libs/three.module.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { GLTFLoader } from '../libs/GLTFLoader.js'


class model extends THREE.Object3D {
    constructor() {
        super();

        var objLoader = new OBJLoader();
        var matLoader = new MTLLoader();

        matLoader.load('../models/porsche911/911.mtl',
            (materials) => {
                objLoader.setMaterials(materials);
                objLoader.load('../models/porsche911/Porsche_911_GT2.obj',
                (object) => {
                    this.add(object);
                }, null, null);
            });
    }

}

export{ model };