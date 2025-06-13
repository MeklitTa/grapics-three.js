import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Global variables
export let scene, camera, renderer, controls;

export function initScene() {
    try {
        // Create scene
        scene = new THREE.Scene();
        
        // Create a gradient background
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        
        const fragmentShader = `
            varying vec2 vUv;
            void main() {
                vec3 color1 = vec3(0.1, 0.2, 0.3);  // Dark blue
                vec3 color2 = vec3(0.4, 0.6, 0.8);  // Light blue
                gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
            }
        `;
        
        const backgroundMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.BackSide
        });
        
        const backgroundGeometry = new THREE.SphereGeometry(500, 60, 40);
        const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        scene.add(background);

        // Create camera
        camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(2, 1.5, 3.5);

        // Create renderer
        renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        
        // Add renderer to DOM
        const container = document.getElementById('canvas-container');
        if (!container) {
            throw new Error('Canvas container not found!');
        }
        container.appendChild(renderer.domElement);

        // Add OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(0, 0.4, 0);

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);

        console.log('Scene initialized successfully');
    } catch (error) {
        console.error('Error in initScene:', error);
        throw error;
    }
}

function onWindowResize() {
    try {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    } catch (error) {
        console.error('Error in onWindowResize:', error);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
} 