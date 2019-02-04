import * as THREE from 'three'
import './gltf-loader.js'

let renderer
let camera
let scene

let width = window.innerWidth - 40
let height = window.innerHeight - 40

let model

const app = document.getElementById('app')

const init = () => {
  camera = new THREE.PerspectiveCamera(45, width / height, 0.25, 30)
  scene = new THREE.Scene()
  camera.position.set(0, 0, 2.7)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)

  const light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
  light.position.set( 0, 1, 0 );
  scene.add( light );

  const loader = new THREE.GLTFLoader()
  loader.load(
    './test.glb',
    gltf => {
      const s = gltf.scene
      scene.add(s)
      model = s.children[2]
    }
  )

  app.innerHTML = ''
  app.appendChild(renderer.domElement)
  renderer.render(scene, camera)
}

const animate = () => {
  requestAnimationFrame(animate)
  if (model) {
    model.rotation.x += 0.002
  }
  renderer.render(scene, camera)
}

init()
animate()
