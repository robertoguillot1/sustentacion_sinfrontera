import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Bovine3DViewer({ diseaseState = 'normal', activePart = '', onPartClick }) {
  const mountRef = useRef(null);
  const tongueMaterialRef = useRef(null);
  const tongueMeshRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    
    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background to show our radial gradient

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 4.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2; // Don't let users go below floor
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.target.set(0, 0, 0);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 0.4); // Subtle bluish fill light
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    const mouthLight = new THREE.PointLight(0xffffff, 1.5, 3);
    mouthLight.position.set(0, -0.2, 1.2);
    scene.add(mouthLight);

    // 6. Modeling the stylized Bovine Head (Grupo)
    const bovineGroup = new THREE.Group();
    scene.add(bovineGroup);

    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0x475569, // Slate dark skin
      roughness: 0.6,
      metalness: 0.1
    });

    const snoutMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155, // Darker slate for snout
      roughness: 0.5
    });

    const innerMouthMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9
    });

    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1
    });

    const hornMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.7
    });

    // Sub-materials for dynamic colors
    const tongueColors = {
      normal: 0xff8b9e,  // Healthy pink
      blue: 0x00e5ff,    // Cyan/Blue Tongue
      purple: 0xc084fc   // Purplish/Woody Tongue
    };

    const tongueMaterial = new THREE.MeshStandardMaterial({
      color: tongueColors[diseaseState],
      roughness: 0.3,
      metalness: 0.1
    });
    tongueMaterialRef.current = tongueMaterial;

    // --- GEOMETRIES ---
    
    // Head / Cranium
    const craniumGeo = new THREE.BoxGeometry(1.2, 1, 1.2);
    const cranium = new THREE.Mesh(craniumGeo, skinMaterial);
    cranium.position.y = 0.5;
    cranium.name = 'Cráneo';
    bovineGroup.add(cranium);

    // Snout / Nose
    const snoutGeo = new THREE.BoxGeometry(0.9, 0.6, 1.4);
    const snout = new THREE.Mesh(snoutGeo, snoutMaterial);
    snout.position.set(0, 0.1, 0.8);
    snout.rotation.x = -0.15; // Sleek angled nose
    snout.name = 'Hocico';
    bovineGroup.add(snout);

    // Mouth Cavity (Inner)
    const mouthCavityGeo = new THREE.BoxGeometry(0.7, 0.25, 0.8);
    const mouthCavity = new THREE.Mesh(mouthCavityGeo, innerMouthMaterial);
    mouthCavity.position.set(0, -0.1, 1.05);
    mouthCavity.rotation.x = -0.15;
    bovineGroup.add(mouthCavity);

    // Dynamic Tongue
    // We use a capsule shape for a beautiful, organic tongue
    const tongueGeo = new THREE.CapsuleGeometry(0.22, 0.5, 8, 16);
    const tongue = new THREE.Mesh(tongueGeo, tongueMaterial);
    tongue.position.set(0, -0.06, 1.05);
    tongue.rotation.x = Math.PI / 2.3; // Angle pointing out
    tongue.scale.set(1.2, 1, 1.4);
    tongue.name = 'Lengua';
    tongueMeshRef.current = tongue;
    bovineGroup.add(tongue);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    
    const eyeLeft = new THREE.Mesh(eyeGeo, eyeMaterial);
    eyeLeft.position.set(0.55, 0.6, 0.4);
    eyeLeft.name = 'Ojos';
    bovineGroup.add(eyeLeft);

    const eyeRight = new THREE.Mesh(eyeGeo, eyeMaterial);
    eyeRight.position.set(-0.55, 0.6, 0.4);
    eyeRight.name = 'Ojos';
    bovineGroup.add(eyeRight);

    // Horns
    const hornGeo = new THREE.ConeGeometry(0.12, 0.8, 16);
    
    const hornLeft = new THREE.Mesh(hornGeo, hornMaterial);
    hornLeft.position.set(0.65, 1.1, -0.1);
    hornLeft.rotation.z = -0.3;
    hornLeft.rotation.x = -0.25;
    hornLeft.name = 'Cuernos';
    bovineGroup.add(hornLeft);

    const hornRight = new THREE.Mesh(hornGeo, hornMaterial);
    hornRight.position.set(-0.65, 1.1, -0.1);
    hornRight.rotation.z = 0.3;
    hornRight.rotation.x = -0.25;
    hornRight.name = 'Cuernos';
    bovineGroup.add(hornRight);

    // Ears
    const earGeo = new THREE.ConeGeometry(0.15, 0.7, 4);
    
    const earLeft = new THREE.Mesh(earGeo, skinMaterial);
    earLeft.position.set(0.75, 0.6, -0.2);
    earLeft.rotation.z = -Math.PI / 2.5;
    earLeft.rotation.y = -0.3;
    earLeft.scale.set(1, 1.5, 0.4); // Flattened ear
    earLeft.name = 'Orejas';
    bovineGroup.add(earLeft);

    const earRight = new THREE.Mesh(earGeo, skinMaterial);
    earRight.position.set(-0.75, 0.6, -0.2);
    earRight.rotation.z = Math.PI / 2.5;
    earRight.rotation.y = 0.3;
    earRight.scale.set(1, 1.5, 0.4); // Flattened ear
    earRight.name = 'Orejas';
    bovineGroup.add(earRight);

    // Neck / Lymph nodes region (Important clinical area)
    const neckGeo = new THREE.CylinderGeometry(0.7, 0.9, 1.2, 16);
    const neck = new THREE.Mesh(neckGeo, skinMaterial);
    neck.position.set(0, -0.5, -0.5);
    neck.rotation.x = 0.35;
    neck.name = 'Ganglios';
    bovineGroup.add(neck);

    // Glowing Hotspots (Interactive indicators for symptoms)
    const hotspots = [];
    const hotspotGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const hotspotMaterial = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.8
    });

    const createHotspot = (x, y, z, name, label) => {
      const mesh = new THREE.Mesh(hotspotGeo, hotspotMaterial.clone());
      mesh.position.set(x, y, z);
      mesh.name = `Hotspot_${name}`;
      mesh.userData = { partName: name, label: label };
      bovineGroup.add(mesh);
      hotspots.push(mesh);
    };

    createHotspot(0, -0.06, 1.35, 'Lengua', 'Lesiones, cianosis y dolor lingual');
    createHotspot(0, 0.4, 0.9, 'Hocico', 'Salivación excesiva (sialorrea) y secreción');
    createHotspot(0.7, -0.6, -0.3, 'Ganglios', 'Ganglios linfáticos inflamados');
    createHotspot(0, 0.8, -0.2, 'Fiebre', 'Fiebre alta (temperatura de hasta 41°C)');

    // 7. Raycasting for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseClick = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(bovineGroup.children, true);

      if (intersects.length > 0) {
        // Find clicked object or its hotspot
        const hitObject = intersects[0].object;
        let name = hitObject.name;
        
        if (name.startsWith('Hotspot_')) {
          name = hitObject.userData.partName;
        }

        if (onPartClick) {
          onPartClick(name);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleMouseClick);

    // 8. Animation loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow orbital rotate when no interaction
      if (!controls.state === -1) {
        bovineGroup.rotation.y = Math.sin(elapsedTime * 0.25) * 0.3;
      }

      // Hotspot pulsing
      hotspots.forEach((hs, idx) => {
        const pulse = 0.5 + Math.sin(elapsedTime * 4 + idx) * 0.4;
        hs.material.opacity = pulse;
        
        // Highlight active hotspot
        if (activePart && hs.userData.partName.toLowerCase() === activePart.toLowerCase()) {
          hs.material.color.setHex(0x00e5ff);
          hs.scale.set(1.3, 1.3, 1.3);
        } else {
          hs.material.color.setHex(0xef4444);
          hs.scale.set(1, 1, 1);
        }
      });

      // Tongue subtle micro-movement (pulsing slightly to feel alive)
      if (tongueMeshRef.current) {
        const tonguePulse = 1.0 + Math.sin(elapsedTime * 2) * 0.05;
        if (diseaseState === 'purple') {
          // Rigid / Wooden tongue stays stiff, barely pulses
          tongueMeshRef.current.scale.set(1.4, 0.9, 1.3);
        } else {
          tongueMeshRef.current.scale.set(1.2 * tonguePulse, 1.0 * tonguePulse, 1.4);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      scene.clear();
    };
  }, [onPartClick, activePart]);

  // Update materials when diseaseState changes
  useEffect(() => {
    if (tongueMaterialRef.current) {
      const tongueColors = {
        normal: 0xff8b9e,  // Healthy pink
        blue: 0x00e5ff,    // Cyan/Blue Tongue
        purple: 0xc084fc   // Purplish/Woody Tongue
      };
      
      // Animate material transition
      tongueMaterialRef.current.color.setHex(tongueColors[diseaseState]);
      
      if (diseaseState === 'purple') {
        tongueMaterialRef.current.roughness = 0.8; // Hard tongue
      } else {
        tongueMaterialRef.current.roughness = 0.3; // Soft/normal or wet saliva tongue
      }
    }
  }, [diseaseState]);

  return (
    <div className="canvas-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="glass" style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 10,
        padding: '0.375rem 0.75rem',
        fontSize: '0.75rem',
        color: '#94a3b8',
        pointerEvents: 'none',
        userSelect: 'none',
        borderRadius: '0.5rem'
      }}>
        🖱️ Arrastra para rotar | Rueda para zoom
      </div>
      <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
    </div>
  );
}
