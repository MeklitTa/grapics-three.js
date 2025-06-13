import { initScene } from './initScene.js';
import { createLaptop } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { autoRotateCamera } from './cameraAnimation.js';

const { scene, camera, renderer, controls } = initScene();

addLighting(scene);
const laptopParts = createLaptop(scene);
setupInteraction(camera, scene, renderer, laptopParts);

function animate(time) {
  requestAnimationFrame(animate);
  controls.update();  // enables damping
  autoRotateCamera(camera, time);
  renderer.render(scene, camera);
}
animate();
