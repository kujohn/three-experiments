let renderer
let camera
let scene

let width = window.innerWidth
let height = window.innerHeight

let model

let mixer
let clock = new THREE.Clock()
const app = document.getElementById('app')

const init = () => {
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  scene = new THREE.Scene()
  camera.position.z = 100

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)

  app.innerHTML = ''
  app.appendChild(renderer.domElement)

  const loader = new THREE.GLTFLoader()
  loader.load(
    'https://uploads.codesandbox.io/uploads/user/cdf06b01-5469-4a87-a256-1cc15b068232/1F9I-test.gltf',
    g => {
      const torus = g.scene.children[2]
      scene.add(torus)
      model = torus
    }
  )
  renderer.render(scene, camera)
}

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

init()
// animate()
