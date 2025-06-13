import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { camera } from './initScene.js';
import { productParts } from './createProduct.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedPart = null;

export function setupInteraction() {
    // Add mouse move event listener
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
}

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Find intersections
    const intersects = raycaster.intersectObjects(productParts);

    // Reset all parts to default state
    productParts.forEach(part => {
        if (part.material.emissive) {
            part.material.emissive.setHex(0x000000);
        }
        part.scale.set(1, 1, 1);
    });

    // Highlight hovered part
    if (intersects.length > 0) {
        const hoveredPart = intersects[0].object;
        if (hoveredPart.material.emissive) {
            hoveredPart.material.emissive.setHex(0x333333);
        }
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'default';
    }
}

function onMouseClick(event) {
    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Find intersections
    const intersects = raycaster.intersectObjects(productParts);

    if (intersects.length > 0) {
        const clickedPart = intersects[0].object;
        
        // Reset previous selection
        if (selectedPart && selectedPart.material.emissive) {
            selectedPart.material.emissive.setHex(0x000000);
            selectedPart.scale.set(1, 1, 1);
        }

        // Set new selection
        selectedPart = clickedPart;
        if (selectedPart.material.emissive) {
            selectedPart.material.emissive.setHex(0x666666);
        }
        selectedPart.scale.set(1.1, 1.1, 1.1);

        // Update info panel
        const infoPanel = document.getElementById('part-name');
        if (infoPanel) {
            infoPanel.textContent = clickedPart.userData.name || 'Unknown Part';
        }
    }
} 