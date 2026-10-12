import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Sparkles, Layers, Eye } from 'lucide-react';

interface CrystalViewer3DProps {
  initialSystem?: 'Isometric' | 'Hexagonal' | 'Orthorhombic' | 'Brilliant';
  accentColor?: string; // e.g. '#D4AF37'
  interactive?: boolean;
  className?: string;
}

export const CrystalViewer3D: React.FC<CrystalViewer3DProps> = ({
  initialSystem = 'Brilliant',
  accentColor = '#D4AF37',
  interactive = true,
  className = 'w-full h-full'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSystem, setCurrentSystem] = useState<'Isometric' | 'Hexagonal' | 'Orthorhombic' | 'Brilliant'>(initialSystem);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldLight1 = new THREE.PointLight(0xd4af37, 3, 20);
    goldLight1.position.set(4, 5, 4);
    scene.add(goldLight1);

    const blueLight2 = new THREE.PointLight(0x0f52ba, 2.5, 20);
    blueLight2.position.set(-4, -4, 3);
    scene.add(blueLight2);

    const fillLight = new THREE.DirectionalLight(0xfff6d6, 1.5);
    fillLight.position.set(0, 8, 2);
    scene.add(fillLight);

    // Group for crystal meshes
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Function to build geometry based on system
    const updateGeometry = (system: string, isWireframe: boolean) => {
      meshGroup.clear();

      let geom: THREE.BufferGeometry;

      if (system === 'Isometric') {
        // Octahedron with beveling
        geom = new THREE.OctahedronGeometry(1.4, 0);
      } else if (system === 'Hexagonal') {
        // Hexagonal prism with pyramidal terminations
        geom = new THREE.CylinderGeometry(0.8, 0.8, 2.2, 6, 1);
      } else if (system === 'Orthorhombic') {
        // Dipyramidal prism (like chrysoberyl/alexandrite)
        geom = new THREE.DodecahedronGeometry(1.3, 0);
      } else {
        // Brilliant Faceted Diamond Cut
        geom = new THREE.ConeGeometry(1.5, 1.8, 8);
      }

      // Main Crystal Material with Glass / Refraction shine
      const crystalMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(accentColor),
        emissive: new THREE.Color(0x1a1505),
        roughness: 0.1,
        metalness: 0.15,
        transmission: 0.85,
        ior: 2.4, // Diamond/Sapphire high refractive index
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        wireframe: isWireframe,
        transparent: true,
        opacity: isWireframe ? 0.9 : 0.75
      });

      const crystalMesh = new THREE.Mesh(geom, crystalMaterial);
      meshGroup.add(crystalMesh);

      // Gold Edge Wireframe Overlay for luxury architectural precision
      const wireframeGeom = new THREE.WireframeGeometry(geom);
      const wireframeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xd4af37),
        linewidth: 1.5,
        transparent: true,
        opacity: 0.85
      });
      const wireframeLines = new THREE.LineSegments(wireframeGeom, wireframeMat);
      meshGroup.add(wireframeLines);

      // Golden Sparkle Vertices (Glow Nodes)
      const positions = geom.attributes.position;
      const pointsGeom = new THREE.BufferGeometry();
      pointsGeom.setAttribute('position', positions);
      const pointsMat = new THREE.PointsMaterial({
        color: 0xfff3a8,
        size: 0.08,
        transparent: true,
        opacity: 0.95
      });
      const points = new THREE.Points(pointsGeom, pointsMat);
      meshGroup.add(points);
    };

    updateGeometry(currentSystem, wireframeMode);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (meshGroupRef.current && isRotating) {
        meshGroupRef.current.rotation.y += 0.007;
        meshGroupRef.current.rotation.x += 0.003;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse / Touch Drag Rotation Handling
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [currentSystem, wireframeMode, accentColor]);

  // Handle Zoom change
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = 5 / zoomLevel;
    }
  }, [zoomLevel]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing rounded-2xl relative overflow-hidden"
      />

      {/* Floating Control Toolbar */}
      {interactive && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel-elevated border border-[#D4AF37]/30 text-xs text-white z-10 shadow-2xl backdrop-blur-md">
          {/* System Selectors */}
          <div className="flex items-center gap-1 border-r border-[#D4AF37]/20 pr-2">
            {(['Brilliant', 'Hexagonal', 'Isometric', 'Orthorhombic'] as const).map((sys) => (
              <button
                key={sys}
                type="button"
                onClick={() => setCurrentSystem(sys)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                  currentSystem === sys
                    ? 'bg-[#D4AF37] text-[#050608] font-bold shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {sys}
              </button>
            ))}
          </div>

          {/* Wireframe toggle */}
          <button
            type="button"
            onClick={() => setWireframeMode(!wireframeMode)}
            title="Toggle Wireframe"
            className={`p-1.5 rounded-md transition-colors ${wireframeMode ? 'text-[#D4AF37] bg-[#D4AF37]/20' : 'text-[#94A3B8] hover:text-white'}`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Auto-rotate toggle */}
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            title="Toggle Auto-Rotation"
            className={`p-1.5 rounded-md transition-colors ${isRotating ? 'text-[#D4AF37] bg-[#D4AF37]/20' : 'text-[#94A3B8] hover:text-white'}`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Zoom controls */}
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.0))}
            title="Zoom In"
            className="p-1.5 rounded-md text-[#94A3B8] hover:text-white"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
            title="Zoom Out"
            className="p-1.5 rounded-md text-[#94A3B8] hover:text-white"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Ambient Radial Glow Behind Crystal */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,rgba(13,16,22,0)_70%)]" />
    </div>
  );
};
