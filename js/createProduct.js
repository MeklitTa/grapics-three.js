import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { scene } from './initScene.js';

// Product parts
export let productParts = [];

export function createProduct() {
    // Clear previous parts
    productParts.length = 0;

    // Create a group to hold all parts
    const productGroup = new THREE.Group();

    // Materials
    const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.5, metalness: 0.1 });

    // Chair seat (flat, rectangular)
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(1.43, 0.13, 1.43),
        woodMaterial
    );
    seat.position.set(0, 0.715, 0);
    seat.userData = { name: 'Seat' };
    productParts.push(seat);
    productGroup.add(seat);

    // Four straight legs
    const legGeometry = new THREE.BoxGeometry(0.156, 0.91, 0.156);
    const legPositions = [
        [-0.585, 0.26, -0.585],
        [0.585, 0.26, -0.585],
        [-0.585, 0.26, 0.585],
        [0.585, 0.26, 0.585]
    ];
    legPositions.forEach((pos, i) => {
        const leg = new THREE.Mesh(legGeometry, woodMaterial);
        leg.position.set(...pos);
        leg.userData = { name: `Leg ${i + 1}` };
        productParts.push(leg);
        productGroup.add(leg);
    });

    // Backrest posts (slightly curved)
    const backLeft = new THREE.Mesh(new THREE.BoxGeometry(0.156, 1.43, 0.156), woodMaterial);
    backLeft.position.set(-0.585, 1.43, -0.585);
    backLeft.rotation.x = -0.08;
    backLeft.userData = { name: 'Back Left Post' };
    productParts.push(backLeft);
    productGroup.add(backLeft);
    const backRight = new THREE.Mesh(new THREE.BoxGeometry(0.156, 1.43, 0.156), woodMaterial);
    backRight.position.set(0.585, 1.43, -0.585);
    backRight.rotation.x = -0.08;
    backRight.userData = { name: 'Back Right Post' };
    productParts.push(backRight);
    productGroup.add(backRight);

    // Three horizontal slats
    const slatGeometry = new THREE.BoxGeometry(1.3, 0.104, 0.104);
    const slatYs = [2.08, 1.82, 1.56];
    slatYs.forEach((y, i) => {
        const slat = new THREE.Mesh(slatGeometry, woodMaterial);
        slat.position.set(0, y, -0.585);
        slat.userData = { name: `Back Slat ${i + 1}` };
        productParts.push(slat);
        productGroup.add(slat);
    });

    // Add the product to the scene
    scene.add(productGroup);

    // Center the product
    const box = new THREE.Box3().setFromObject(productGroup);
    const center = box.getCenter(new THREE.Vector3());
    productGroup.position.sub(center);
    // Raise the chair so legs touch the floor
    productGroup.position.y += 0.455;
} 