import * as THREE from 'three'
import './gltf-loader.js'

let renderer
let camera
let scene

let width = window.innerWidth - 40
let height = window.innerHeight - 40

let model

let model2

const app = document.getElementById('app')

const init = () => {
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 70)
  scene = new THREE.Scene()
  camera.position.set(0, 0, 4)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)

  const light = new THREE.HemisphereLight( 0xffffff, 0x444422 );
  light.position.set( 0, 10, 0 );
  scene.add( light );

  const loader = new THREE.GLTFLoader()
  loader.load(
    './test.glb',
    gltf => {
      const s = gltf.scene
      model = s.children[2]

      const w = new THREE.WireframeGeometry(model.geometry)
      const l = new THREE.LineSegments(w)
      l.material.depthTest = false;
      l.material.opacity = 0.25;
      l.material.transparent = true;
      model2 = l

      model.material = new THREE.MeshNormalMaterial()

      scene.add(l)
      scene.add(s)
    }
  )

  app.innerHTML = ''
  app.appendChild(renderer.domElement)
  renderer.render(scene, camera)
}

const animate = () => {
  requestAnimationFrame(animate)
  if (model) {
    model.rotation.y -= 0.01
    model2.rotation.y += 0.01
  }
  renderer.render(scene, camera)
}

init()
animate()
