import * as THREE from 'three'
import './gltf-loader.js'

let renderer
let camera
let scene

let width = window.innerWidth - 40
let height = window.innerHeight - 40

let model
let mixer
let clock
let action

const app = document.getElementById('app')

const init = () => {
  clock = new THREE.Clock()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 70)
  scene = new THREE.Scene()
  camera.position.set(5, 5, 30)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)

  const light = new THREE.HemisphereLight( 0xffffff, 0x444422 );
  light.position.set( 10, 10, 0 );
  scene.add( light );

  const loader = new THREE.GLTFLoader()
  loader.load(
    './test.glb',
    gltf => {
      const s = gltf.scene
      mixer = new THREE.AnimationMixer(s)

      action = mixer.clipAction(gltf.animations[0])
      action.loop = THREE.LoopPingPong
      action.enabled = true
      action.timeScale = 3
      action.play()

      scene.add(s)
    }
  )

  app.innerHTML = ''
  app.appendChild(renderer.domElement)
  renderer.render(scene, camera)
}

const animate = () => {
  requestAnimationFrame(animate)
  if (mixer) {
    const d = clock.getDelta()
    mixer.update(d)
  }
  renderer.render(scene, camera)
}

init()
animate()
