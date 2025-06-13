import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { initScene, scene, camera, renderer, controls } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { setupCameraAnimation, updateCameraAnimation } from './cameraAnimation.js';

function animate() {
    requestAnimationFrame(animate);
    updateCameraAnimation(); // Automated camera rotation
    controls.update(); // Manual controls
    renderer.render(scene, camera);
}

async function init() {
    try {
        console.log('Initializing 3D Product Viewer...');
        
        // Initialize scene
        initScene();
        console.log('Scene initialized');
        
        // Create product
        createProduct();
        console.log('Product created');
        
        // Add lighting
        addLighting();
        console.log('Lighting added');
        
        // Setup interactions
        setupInteraction();
        console.log('Interactions setup');
        
        // Setup camera animation
        setupCameraAnimation();
        console.log('Camera animation setup');
        
        animate();
        console.log('Animation loop started');
        
    } catch (error) {
        console.error('Error initializing 3D Product Viewer:', error);
        document.body.innerHTML += `<div style="color: red; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            Error: ${error.message}<br>
            Please check the console for more details.
        </div>`;
    }
}

// Start the application when the page loads
window.addEventListener('load', init); 