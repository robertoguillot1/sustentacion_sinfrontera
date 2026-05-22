import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Bovine3DViewer({ diseaseState = 'normal', activePart = '', onPartClick }) {
  const mountRef = useRef(null);
  const tongueMaterialRef = useRef(null);
  const tongueMeshRef = useRef(null);

  // Helper function to procedurally generate a high-quality Holstein cow spotted texture.
  // This bypasses external images and CORS issues while maintaining a modern, premium look.
  const createHolsteinTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base color: elegant warm off-white
    ctx.fillStyle = '#faf8f4';
    ctx.fillRect(0, 0, 512, 512);
    
    // Spotted pattern: rich charcoal black/brown
    ctx.fillStyle = '#18191c';
    
    // Define organic spot seeds
    const spots = [
      { x: 120, y: 120, r: 85 },
      { x: 380, y: 160, r: 100 },
      { x: 220, y: 340, r: 125 },
      { x: 440, y: 380, r: 70 },
      { x: 80, y: 410, r: 75 },
      { x: 480, y: 90, r: 60 }
    ];
    
    spots.forEach(spot => {
      ctx.beginPath();
      ctx.moveTo(spot.x + spot.r, spot.y);
      for (let angle = 0; angle < Math.PI * 2; angle += 0.15) {
        // Procedural noise to create organic blotchy borders rather than boring circles
        const rNoise = Math.sin(angle * 5) * (spot.r * 0.18) + Math.cos(angle * 9) * (spot.r * 0.1);
        const r = spot.r + rNoise;
        const px = spot.x + Math.cos(angle) * r;
        const py = spot.y + Math.sin(angle) * r;
        ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    });
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1.5, 1.5);
    return texture;
  };

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to inherit background styles

    // 2. Camera setup
    const initialWidth = currentMount.clientWidth || 600;
    const initialHeight = currentMount.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(
      42,
      initialWidth / initialHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 4.3);

    // 3. Renderer setup with high-end physical configuration
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Tone mapping for cinematic, rich colors
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    currentMount.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.8; // Restrict rotation below floor level
    controls.minDistance = 2.5;
    controls.maxDistance = 6.5;
    controls.target.set(0, -0.15, 0.3);

    // 5. Light Rig (Outdoor pasture ambiance combined with studio rim lights)
    const hemisphereLight = new THREE.HemisphereLight(0xe0f2fe, 0x1e3a1e, 0.6); // Sky/ground fill
    scene.add(hemisphereLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(6, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xfef3c7, 0.45); // Warm ambient light from opposite side
    fillLight.position.set(-6, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6); // Highlights silhouettes beautifully
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    const mouthLight = new THREE.PointLight(0xffffff, 1.6, 3.5);
    mouthLight.position.set(0, -0.15, 1.15);
    scene.add(mouthLight);

    // 6. Modeling the beautiful organic bovine bust
    const bovineGroup = new THREE.Group();
    scene.add(bovineGroup);

    // Create texture
    const holsteinTexture = createHolsteinTexture();

    // High-end MeshPhysicalMaterials for rich, gorgeous textures
    const skinMaterial = new THREE.MeshPhysicalMaterial({
      map: holsteinTexture,
      roughness: 0.5,
      metalness: 0.05,
      clearcoat: 0.25,
      clearcoatRoughness: 0.3
    });

    const muzzleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffcbd5, // warm organic pink for muzzle
      roughness: 0.6,
      metalness: 0.02,
      clearcoat: 0.1
    });

    const innerMouthMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x5e2c36, // healthy inside mouth red
      roughness: 0.8
    });

    const eyeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a0b0e, // glossy dark pupil
      roughness: 0.03,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03
    });

    const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });

    const hornMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe6e0d4, // classic organic horn ivory
      roughness: 0.45,
      metalness: 0.05,
      clearcoat: 0.2
    });

    const innerEarMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffb3c1, // soft pink inside ear
      roughness: 0.7,
      metalness: 0.0
    });

    const baseWoodMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3d2314, // polished rich mahogany
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.8
    });

    const baseGoldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37, // golden accents
      roughness: 0.15,
      metalness: 0.95,
      clearcoat: 1.0
    });

    // Dynamic tongue colors mapping
    const tongueColors = {
      normal: 0xff8b9e,  // healthy pink
      blue: 0x00e5ff,    // cyan/blue tongue
      purple: 0xb55fe6   // purple tongue
    };

    const tongueMaterial = new THREE.MeshPhysicalMaterial({
      color: tongueColors[diseaseState],
      roughness: 0.3,
      metalness: 0.05,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1
    });
    tongueMaterialRef.current = tongueMaterial;

    // --- GEOMETRIC MODEL COMPOSITION ---

    // A. Cranium (Rounded Head Core)
    const craniumGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const cranium = new THREE.Mesh(craniumGeo, skinMaterial);
    cranium.position.set(0, 0.4, -0.15);
    cranium.scale.set(1.0, 1.1, 1.1);
    cranium.castShadow = true;
    cranium.receiveShadow = true;
    cranium.name = 'Cráneo';
    bovineGroup.add(cranium);

    // B. Forehead & Nose Bridge (Sloped cylindrical transition)
    const foreheadGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.8, 32);
    const forehead = new THREE.Mesh(foreheadGeo, skinMaterial);
    forehead.position.set(0, 0.2, 0.3);
    forehead.rotation.x = -0.6; // angled down to form the nose bridge
    forehead.castShadow = true;
    forehead.receiveShadow = true;
    forehead.name = 'Hocico';
    bovineGroup.add(forehead);

    // C. Muzzle (Rounded upper mouth snout)
    const snoutGeo = new THREE.SphereGeometry(0.48, 32, 32);
    const snout = new THREE.Mesh(snoutGeo, skinMaterial);
    snout.position.set(0, -0.1, 0.75);
    snout.scale.set(1.0, 0.85, 1.25);
    snout.castShadow = true;
    snout.receiveShadow = true;
    snout.name = 'Hocico';
    bovineGroup.add(snout);

    // D. Fleshy Snout Patch (Iconic spotted pink cow muzzle tip)
    const muzzlePadGeo = new THREE.SphereGeometry(0.38, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const muzzlePad = new THREE.Mesh(muzzlePadGeo, muzzleMaterial);
    muzzlePad.position.set(0, -0.05, 1.32);
    muzzlePad.rotation.x = Math.PI / 2 + 0.15;
    muzzlePad.scale.set(0.95, 0.5, 0.75);
    muzzlePad.castShadow = true;
    muzzlePad.receiveShadow = true;
    muzzlePad.name = 'Hocico';
    bovineGroup.add(muzzlePad);

    // E. Left & Right Nostrils
    const nostrilGeo = new THREE.SphereGeometry(0.06, 16, 16);
    
    const nostrilLeft = new THREE.Mesh(nostrilGeo, innerMouthMaterial);
    nostrilLeft.position.set(0.13, 0.05, 1.34);
    nostrilLeft.scale.set(0.7, 0.5, 1.2);
    bovineGroup.add(nostrilLeft);

    const nostrilRight = new THREE.Mesh(nostrilGeo, innerMouthMaterial);
    nostrilRight.position.set(-0.13, 0.05, 1.34);
    nostrilRight.scale.set(0.7, 0.5, 1.2);
    bovineGroup.add(nostrilRight);

    // F. Mouth cavity interior (Allows tongue protrusion to show beautifully)
    const mouthCavityGeo = new THREE.BoxGeometry(0.55, 0.22, 0.6);
    const mouthCavity = new THREE.Mesh(mouthCavityGeo, innerMouthMaterial);
    mouthCavity.position.set(0, -0.22, 0.95);
    mouthCavity.rotation.x = -0.1;
    bovineGroup.add(mouthCavity);

    // G. Lower Jaw (Cylindrical support mesh)
    const jawGeo = new THREE.BoxGeometry(0.55, 0.18, 0.85);
    const jaw = new THREE.Mesh(jawGeo, skinMaterial);
    jaw.position.set(0, -0.32, 0.8);
    jaw.rotation.x = -0.15;
    jaw.castShadow = true;
    jaw.receiveShadow = true;
    jaw.name = 'Hocico';
    bovineGroup.add(jaw);

    // H. Highly Interactive Dynamic Tongue (Protruding capsule shape)
    const tongueGeo = new THREE.CapsuleGeometry(0.14, 0.38, 16, 32);
    const tongue = new THREE.Mesh(tongueGeo, tongueMaterial);
    tongue.position.set(0, -0.16, 1.05);
    tongue.rotation.x = Math.PI / 2.3;
    tongue.scale.set(1.1, 0.7, 1.5);
    tongue.castShadow = true;
    tongue.name = 'Lengua';
    tongueMeshRef.current = tongue;
    bovineGroup.add(tongue);

    // I. Glossy Eyes with Highlights and Eyelids
    const eyeGeo = new THREE.SphereGeometry(0.11, 32, 32);
    
    // Left Eye
    const eyeLeft = new THREE.Mesh(eyeGeo, eyeMaterial);
    eyeLeft.position.set(0.56, 0.34, 0.22);
    eyeLeft.scale.set(1.0, 1.0, 0.8);
    eyeLeft.castShadow = true;
    eyeLeft.name = 'Ojos';
    bovineGroup.add(eyeLeft);

    const eyeHighlightLeft = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), eyeHighlightMaterial);
    eyeHighlightLeft.position.set(0.64, 0.39, 0.28);
    bovineGroup.add(eyeHighlightLeft);

    // Right Eye
    const eyeRight = new THREE.Mesh(eyeGeo, eyeMaterial);
    eyeRight.position.set(-0.56, 0.34, 0.22);
    eyeRight.scale.set(1.0, 1.0, 0.8);
    eyeRight.castShadow = true;
    eyeRight.name = 'Ojos';
    bovineGroup.add(eyeRight);

    const eyeHighlightRight = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), eyeHighlightMaterial);
    eyeHighlightRight.position.set(-0.64, 0.39, 0.28);
    bovineGroup.add(eyeHighlightRight);

    // Outer Eye Rings (Adds structure and detail)
    const eyeRingGeo = new THREE.TorusGeometry(0.13, 0.03, 8, 32);
    
    const eyeRingLeft = new THREE.Mesh(eyeRingGeo, skinMaterial);
    eyeRingLeft.position.set(0.53, 0.34, 0.20);
    eyeRingLeft.rotation.y = Math.PI / 2 - 0.3;
    bovineGroup.add(eyeRingLeft);

    const eyeRingRight = new THREE.Mesh(eyeRingGeo, skinMaterial);
    eyeRingRight.position.set(-0.53, 0.34, 0.20);
    eyeRingRight.rotation.y = -Math.PI / 2 + 0.3;
    bovineGroup.add(eyeRingRight);

    // J. Beautiful Curved Bovine Horns
    // Built procedurally by connecting tapered cylinder segments for absolute organic curvature
    const createCurvedHorn = (isLeft) => {
      const hornGroup = new THREE.Group();
      const sign = isLeft ? 1 : -1;
      const segments = 8;
      let prevPos = new THREE.Vector3(0.48 * sign, 0.68, -0.22);
      
      for (let i = 0; i < segments; i++) {
        const ratio = i / (segments - 1);
        const radiusBottom = 0.09 * (1 - ratio * 0.9);
        const radiusTop = 0.09 * (1 - (ratio + 0.1) * 0.9);
        const length = 0.16;
        
        const segGeo = new THREE.CylinderGeometry(radiusTop, radiusBottom, length, 16);
        const segMesh = new THREE.Mesh(segGeo, hornMaterial);
        segMesh.castShadow = true;
        segMesh.receiveShadow = true;
        
        // Pivot from bottom of cylinder
        segMesh.position.set(0, length / 2, 0);
        
        const pivot = new THREE.Group();
        pivot.position.copy(prevPos);
        
        const rotX = 0.1 + ratio * 0.25;
        const rotY = 0.05 * sign + ratio * 0.3 * sign;
        const rotZ = (-0.5 - ratio * 0.45) * sign;
        pivot.rotation.set(rotX, rotY, rotZ);
        
        pivot.add(segMesh);
        hornGroup.add(pivot);
        
        const dir = new THREE.Vector3(0, length, 0).applyEuler(pivot.rotation);
        prevPos.add(dir);
      }
      return hornGroup;
    };

    const leftHorn = createCurvedHorn(true);
    leftHorn.name = 'Cuernos';
    bovineGroup.add(leftHorn);

    const rightHorn = createCurvedHorn(false);
    rightHorn.name = 'Cuernos';
    bovineGroup.add(rightHorn);

    // K. Soft Drooping Ears (Double layered outer-skin and inner-pink lining)
    const createEar = (isLeft) => {
      const earGroup = new THREE.Group();
      const sign = isLeft ? 1 : -1;
      const earGeo = new THREE.SphereGeometry(0.24, 32, 16);
      
      const earOuter = new THREE.Mesh(earGeo, skinMaterial);
      earOuter.scale.set(1.3, 0.4, 0.7);
      earOuter.rotation.x = Math.PI / 2;
      earOuter.castShadow = true;
      earOuter.receiveShadow = true;
      earGroup.add(earOuter);
      
      const earInner = new THREE.Mesh(earGeo, innerEarMaterial);
      earInner.scale.set(1.05, 0.25, 0.6);
      earInner.position.set(0, 0.03, 0.05);
      earInner.rotation.x = Math.PI / 2;
      earGroup.add(earInner);
      
      earGroup.position.set(0.6 * sign, 0.42, -0.32);
      earGroup.rotation.set(0.2, -0.4 * sign, (-Math.PI / 6) * sign);
      earGroup.name = 'Orejas';
      return earGroup;
    };

    bovineGroup.add(createEar(true));
    bovineGroup.add(createEar(false));

    // L. Sloped Muscular Neck
    const neckGeo = new THREE.CylinderGeometry(0.48, 0.68, 1.3, 32);
    const neck = new THREE.Mesh(neckGeo, skinMaterial);
    neck.position.set(0, -0.45, -0.4);
    neck.rotation.x = 0.35;
    neck.castShadow = true;
    neck.receiveShadow = true;
    neck.name = 'Ganglios';
    bovineGroup.add(neck);

    // M. Muscular Shoulder Bust Base (Fades out beautifully)
    const chestGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const chest = new THREE.Mesh(chestGeo, skinMaterial);
    chest.position.set(0, -1.05, -0.75);
    chest.scale.set(1.1, 0.85, 1.45);
    chest.castShadow = true;
    chest.receiveShadow = true;
    chest.name = 'Busto';
    bovineGroup.add(chest);

    // N. Polished Exhibition Pedestal (Wooden display + golden accents + metal support shaft)
    const standGroup = new THREE.Group();
    
    // Wooden Base Plinth
    const woodPlinthGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.18, 32);
    const woodPlinth = new THREE.Mesh(woodPlinthGeo, baseWoodMaterial);
    woodPlinth.position.y = -1.55;
    woodPlinth.receiveShadow = true;
    standGroup.add(woodPlinth);
    
    // Golden Accent Trim Ring
    const goldRingGeo = new THREE.CylinderGeometry(0.96, 0.96, 0.04, 32);
    const goldRing = new THREE.Mesh(goldRingGeo, baseGoldMaterial);
    goldRing.position.y = -1.48;
    standGroup.add(goldRing);
    
    // Sleek golden vertical shaft connecting the stand to the chest bust
    const supportRodGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
    const supportRod = new THREE.Mesh(supportRodGeo, baseGoldMaterial);
    supportRod.position.set(0, -1.35, -0.6);
    supportRod.castShadow = true;
    standGroup.add(supportRod);
    
    bovineGroup.add(standGroup);

    // 7. Interactive Clinical Hotspots
    const hotspots = [];
    const hotspotGeo = new THREE.SphereGeometry(0.1, 32, 32);
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

    // Hotspot coordinates configured precisely to match the new organic shapes
    createHotspot(0, -0.15, 1.35, 'Lengua', 'Lesiones, cianosis y dolor lingual');
    createHotspot(0, 0.15, 1.35, 'Hocico', 'Salivación excesiva (sialorrea) y secreción');
    createHotspot(0.55, -0.45, -0.2, 'Ganglios', 'Ganglios linfáticos inflamados');
    createHotspot(0, 0.58, 0.25, 'Fiebre', 'Fiebre alta (temperatura de hasta 41°C)');

    // 8. Raycasting and Click Handlers for interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(bovineGroup.children, true);

      if (intersects.length > 0) {
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

    // 9. Interactive Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous scanning rotation when the user is not actively dragging the OrbitControls
      if (!controls.state === -1) {
        bovineGroup.rotation.y = Math.sin(elapsedTime * 0.25) * 0.35;
      }

      // Pulse red/cyan hotspots dynamically to attract attention
      hotspots.forEach((hs, idx) => {
        const pulse = 0.5 + Math.sin(elapsedTime * 4 + idx) * 0.4;
        hs.material.opacity = pulse;
        
        // Change colors when hotspot is selected in the UI
        if (activePart && hs.userData.partName.toLowerCase() === activePart.toLowerCase()) {
          hs.material.color.setHex(0x00e5ff); // Cyan active highlight
          hs.scale.set(1.3, 1.3, 1.3);
        } else {
          hs.material.color.setHex(0xef4444); // Standard alarm red
          hs.scale.set(1, 1, 1);
        }
      });

      // Subtle, lifelike organic micro-movement of the tongue (unless stiffened by Actinobacilosis)
      if (tongueMeshRef.current) {
        const tonguePulse = 1.0 + Math.sin(elapsedTime * 2.5) * 0.04;
        if (diseaseState === 'purple') {
          // Rigid / Wooden tongue stays stiff, swollen, and extended
          tongueMeshRef.current.scale.set(1.2, 0.75, 1.55);
        } else {
          // Normal/Blue tongue has soft micro-movements
          tongueMeshRef.current.scale.set(1.1 * tonguePulse, 0.7 * tonguePulse, 1.5);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    // 10. Responsive resizing using ResizeObserver
    const handleResize = (entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (currentMount) {
      resizeObserver.observe(currentMount);
    }

    // Cleanup
    return () => {
      if (currentMount) {
        resizeObserver.unobserve(currentMount);
      }
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      scene.clear();
    };
  }, [onPartClick, activePart]);

  // Handle dynamic transitions of disease colors on the tongue material
  useEffect(() => {
    if (tongueMaterialRef.current) {
      const tongueColors = {
        normal: 0xff8b9e,  // healthy pink
        blue: 0x00e5ff,    // blue/cyan tongue
        purple: 0xb55fe6   // wooden purple tongue
      };
      
      // Animate material parameters based on disease state
      tongueMaterialRef.current.color.setHex(tongueColors[diseaseState]);
      
      if (diseaseState === 'purple') {
        tongueMaterialRef.current.roughness = 0.8; // dry and rough
        tongueMaterialRef.current.metalness = 0.0;
        tongueMaterialRef.current.clearcoat = 0.0;
      } else {
        tongueMaterialRef.current.roughness = 0.3; // wet with saliva
        tongueMaterialRef.current.metalness = 0.05;
        tongueMaterialRef.current.clearcoat = 0.5;
      }
    }
  }, [diseaseState]);

  return (
    <div className="canvas-container" style={{ position: 'relative', width: '100%', height: '480px' }}>
      <div className="glass" style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 10,
        padding: '0.375rem 0.75rem',
        fontSize: '0.85rem',
        color: '#e2e8f0',
        pointerEvents: 'none',
        userSelect: 'none',
        borderRadius: '0.5rem',
        fontWeight: 'bold',
        background: 'rgba(9, 19, 14, 0.85)',
        border: '1px solid rgba(161, 123, 88, 0.3)'
      }}>
        🖱️ Arrastra para rotar | Rueda para zoom
      </div>
      <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
    </div>
  );
}
