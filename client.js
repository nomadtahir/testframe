import {SimplifyModifier} from "./node_modules/super-three/examples/jsm/modifiers/SimplifyModifier.js"
var modifer = new SimplifyModifier();
var sceneEl = document.querySelector('a-scene').object3D;
var scene = sceneEl
var loader = new THREE.GLTFLoader();
const pickableObjects = []
const lod = new THREE.LOD();
loader.load('https://cdn.glitch.me/00f2d644-93e9-43db-b8e5-cac6ced4b897%2FtestNew4LOD.glb?', function (gltf) {
    var model = gltf.scene
    model.traverse(function (o) {
        if (o instanceof THREE.Mesh) {
            pickableObjects.push(o)
            //SimplifyModifier
            var numVertices = o.geometry.attributes.position.count;
            o.geometry = modifer.modify(o.geometry, Math.floor(numVertices * 0.1));
            o.geometry.clearGroups()
            o.geometry.computeVertexNormals()

        }
    });
    let theResult0 = new THREE.Object3D();
    let theResult1 = new THREE.Object3D();
    let theResult2 = new THREE.Object3D();

    theResult0.add(gltf.scene.getObjectByName("Object_LOD0"))
    theResult1.add(gltf.scene.getObjectByName("Object_LOD1"))
    theResult2.add(gltf.scene.getObjectByName("Object_LOD2"))

    /*lod.addLevel(theResult0, 30)
    lod.addLevel(theResult1, 20)*/
    lod.addLevel(theResult2, 10)
    lod.scale.set(0.01, 0.01, 0.01)
    lod.rotation.set(0, -1.5, 1.555)
    lod.position.set(-0.7, 1, -5)
    scene.add(lod)
    // scene.add(gltf.scene);

});