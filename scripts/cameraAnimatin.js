import { camera, controls } from './initScene.js';

let autoRotate = true;
let angle = 0;

export function animateCamera(deltaTime) {
    if (autoRotate) {
        angle += deltaTime * 0.2;
        camera.position.x = 5 * Math.sin(angle);
        camera.position.z = 5 * Math.cos(angle);
        camera.lookAt(0, 1, 0);
    }
}
