// Scene, Camera, and Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Creating a cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0xffa500, flatShading: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Positioning the camera
camera.position.z = 5;

// Rotation variable
let isRotating = false;  // Start with no rotation

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube only if the user is "playing"
  if (isRotating) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Control Buttons
const playButton = document.getElementById('playButton');
const casualButton = document.getElementById('casualButton');

// When the user clicks "Play Game"
playButton.addEventListener('click', () => {
  isRotating = true;  // Start the cube rotation
});

// When the user clicks "Casual Mode"
casualButton.addEventListener('click', () => {
  isRotating = false;  // Stop the cube rotation
});
