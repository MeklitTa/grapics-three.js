export function createProduct(scene) {
    const materials = new THREE.MeshStandardMaterial({ color: 0x888888 });

    const seat = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 4), materials);
    seat.name = "Seat";
    seat.position.y = 1;
    scene.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 0.2), materials);
    back.name = "Backrest";
    back.position.set(0, 2, -0.9);
    scene.add(back);

    for (let i = -1; i <= 1; i += 2) {
        for (let j = -1; j <= 1; j += 2) {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1), materials);
            leg.name = `Leg (${i}, ${j})`;
            leg.position.set(i * 0.8, 0.5, j * 0.8);
            scene.add(leg);
        }
    }
}
