import { camera, controls } from './initScene.js';

let autoRotate = true;
let angle = 0;
const radius = 4; // Distance from the object
const yLevel = 1.2; // Height of the camera

export function setupCameraAnimation() {
    // When the user interacts, stop auto-rotation
    controls.addEventListener('start', () => {
        autoRotate = false;
    });
    // Optionally, resume auto-rotation after inactivity
    // controls.addEventListener('end', () => {
    //     setTimeout(() => { autoRotate = true; }, 5000);
    // });
}

export function updateCameraAnimation() {
    if (autoRotate) {
        angle += 0.005;
        camera.position.x = Math.cos(angle) * radius;
        camera.position.z = Math.sin(angle) * radius;
        camera.position.y = yLevel;
        controls.target.set(0, 0.7, 0);
        camera.lookAt(0, 0.7, 0);
        controls.update();
    }
} 