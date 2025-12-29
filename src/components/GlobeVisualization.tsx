import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { stocksData } from '@/data/stockData';

const GlobeVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe geometry
    const globeGeometry = new THREE.SphereGeometry(1, 128, 128);
    
    // Create detailed texture for globe with continents
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Ocean background
    ctx.fillStyle = '#0a1a2e';
    ctx.fillRect(0, 0, 1024, 512);
    
    // Draw simplified continents
    ctx.fillStyle = '#1a3a5c';
    ctx.strokeStyle = '#00d2ff';
    ctx.lineWidth = 2;
    
    // North America
    ctx.beginPath();
    ctx.ellipse(200, 150, 80, 60, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(280, 320, 40, 70, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Europe
    ctx.beginPath();
    ctx.ellipse(520, 140, 50, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(540, 280, 55, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(700, 160, 120, 70, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(820, 340, 45, 35, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // India
    ctx.beginPath();
    ctx.ellipse(680, 250, 30, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Add latitude/longitude grid lines
    ctx.strokeStyle = 'rgba(0, 210, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1024; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
    }
    for (let i = 0; i < 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      transparent: false,
      shininess: 25,
      specular: new THREE.Color(0x333366),
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Wireframe overlay for extra clarity
    const wireframeGeometry = new THREE.SphereGeometry(1.005, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Outer glow effect
    const glowGeometry = new THREE.SphereGeometry(1.15, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { value: 0.4 },
        p: { value: 4.0 },
        glowColor: { value: new THREE.Color(0x00d2ff) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float c;
        uniform float p;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
          gl_FragColor = vec4(glowColor, intensity * 0.5);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Inner atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.02, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x00d2ff) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, intensity * 0.3);
        }
      `,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add stock location markers - LARGER and more visible
    const markerGroup = new THREE.Group();
    stocksData.forEach((stock) => {
      const lat = stock.coordinates[1] * (Math.PI / 180);
      const lon = -stock.coordinates[0] * (Math.PI / 180);
      
      const x = Math.cos(lat) * Math.cos(lon);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.sin(lon);

      // Marker color based on sentiment
      const color = stock.sentimentScore >= 70 
        ? 0x22c55e 
        : stock.sentimentScore >= 50 
          ? 0xeab308 
          : 0xef4444;

      // Larger marker sphere
      const markerGeometry = new THREE.SphereGeometry(0.04, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x * 1.03, y * 1.03, z * 1.03);
      markerGroup.add(marker);

      // Glowing halo around marker
      const haloGeometry = new THREE.SphereGeometry(0.06, 16, 16);
      const haloMaterial = new THREE.MeshBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.3,
      });
      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      halo.position.copy(marker.position);
      markerGroup.add(halo);

      // Pulse ring
      const ringGeometry = new THREE.RingGeometry(0.05, 0.07, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(marker.position);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      markerGroup.add(ring);

      // Vertical beam from marker
      const beamGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8);
      const beamMaterial = new THREE.MeshBasicMaterial({ 
        color,
        transparent: true,
        opacity: 0.6,
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.set(x * 1.1, y * 1.1, z * 1.1);
      beam.lookAt(new THREE.Vector3(0, 0, 0));
      beam.rotateX(Math.PI / 2);
      markerGroup.add(beam);
    });
    scene.add(markerGroup);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x334466, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d2ff, 2);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xa855f7, 1);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 0.5);
    pointLight3.position.set(0, 5, 0);
    scene.add(pointLight3);

    // Stars background - more stars, varying sizes
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const starsPositions = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 30;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      starsSizes[i] = Math.random() * 0.03 + 0.01;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.03,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016;
      
      // Smooth rotation
      globe.rotation.y += 0.003;
      globe.rotation.y += (targetRotationY - globe.rotation.y) * 0.02;
      globe.rotation.x += (targetRotationX - globe.rotation.x) * 0.02;
      
      wireframe.rotation.y = globe.rotation.y;
      wireframe.rotation.x = globe.rotation.x;
      
      markerGroup.rotation.y = globe.rotation.y;
      markerGroup.rotation.x = globe.rotation.x;
      
      // Pulse effect for markers
      markerGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
          child.scale.setScalar(1 + Math.sin(time * 3 + index) * 0.2);
          (child.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(time * 3 + index) * 0.3;
        }
      });
      
      stars.rotation.y += 0.0001;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, hsl(222, 50%, 12%) 0%, hsl(222, 60%, 4%) 100%)' }}
    />
  );
};

export default GlobeVisualization;
