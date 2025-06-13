import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.module.js';

export function setupInteraction(camera, scene, renderer, objects) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  renderer.domElement.addEventListener('click', event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      const clicked = intersects[0].object;
      document.getElementById('part-name').textContent = clicked.name;

      // Click feedback
      clicked.material.emissive.setHex(0x333333);
      setTimeout(() => {
        clicked.material.emissive.setHex(0x000000);
      }, 300);
    }
  });
}
