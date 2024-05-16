<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Three.js OBJ Example</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://threejs.org/build/three.js"></script>
    <script src="https://threejs.org/examples/js/loaders/OBJLoader.js"></script>
    <script>
        let scene, camera, renderer, objMesh;

        init();
        animate();

        function init() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xdddddd);
            
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 50;

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 1, 0);
            scene.add(directionalLight);

            const objLoader = new THREE.OBJLoader();
            objLoader.load('path/to/your/model.obj', function (object) {
                objMesh = object;
                objMesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
                        child.material = material;

                        // 점을 찍기 위해 메쉬 표면의 랜덤 위치 결정
                        for (let i = 0; i < 100; i++) {
                            const pointGeometry = new THREE.Geometry();
                            const vertexIndex = Math.floor(Math.random() * child.geometry.attributes.position.count);
                            const position = new THREE.Vector3();
                            position.fromBufferAttribute(child.geometry.attributes.position, vertexIndex);
                            pointGeometry.vertices.push(position);
                            const pointMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.5 });
                            const points = new THREE.Points(pointGeometry, pointMaterial);
                            child.add(points);
                        }
                    }
                });
                scene.add(objMesh);
            });

            window.addEventListener('resize', onWindowResize, false);
        }

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    </script>
</body>
</html>
