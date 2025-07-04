'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function GamingHomepage() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const spotLight1 = new THREE.SpotLight(0xff4444, 2);
    spotLight1.position.set(-10, 10, 5);
    spotLight1.castShadow = true;
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0x4444ff, 2);
    spotLight2.position.set(10, 10, 5);
    spotLight2.castShadow = true;
    scene.add(spotLight2);

    const spotLight3 = new THREE.SpotLight(0x44ff44, 1.5);
    spotLight3.position.set(0, 15, -5);
    scene.add(spotLight3);

    // Gaming Setup Objects
    const objects = [];

    // Gaming Monitor
    const monitorGroup = new THREE.Group();
    
    // Monitor screen
    const screenGeometry = new THREE.PlaneGeometry(4, 2.5);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000033,
      transparent: true,
      opacity: 0.9
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 2, 0);
    monitorGroup.add(screen);

    // Monitor frame
    const frameGeometry = new THREE.BoxGeometry(4.3, 2.8, 0.1);
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 2, -0.05);
    monitorGroup.add(frame);

    // Monitor stand
    const standGeometry = new THREE.CylinderGeometry(0.2, 0.3, 1.5);
    const standMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(0, 0.75, 0);
    monitorGroup.add(stand);

    scene.add(monitorGroup);
    objects.push(monitorGroup);

    // Gaming Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(3, 0.2, 1);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, -0.5, 3);
    keyboard.castShadow = true;
    scene.add(keyboard);
    objects.push(keyboard);

    // Gaming Mouse
    const mouseGeometry = new THREE.BoxGeometry(0.6, 0.15, 1);
    const mouseMaterial = new THREE.MeshPhongMaterial({ color: 0xff4444 });
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(2.5, -0.4, 3);
    mouse.castShadow = true;
    scene.add(mouse);
    objects.push(mouse);

    // Gaming Headset
    const headsetGroup = new THREE.Group();
    
    const headbandGeometry = new THREE.TorusGeometry(1, 0.1, 8, 20, Math.PI);
    const headbandMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const headband = new THREE.Mesh(headbandGeometry, headbandMaterial);
    headband.rotation.z = Math.PI;
    headband.position.set(-3, 2, 2);
    headsetGroup.add(headband);

    const earcupGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const earcupMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const leftEarcup = new THREE.Mesh(earcupGeometry, earcupMaterial);
    leftEarcup.position.set(-3.8, 2, 2);
    const rightEarcup = new THREE.Mesh(earcupGeometry, earcupMaterial);
    rightEarcup.position.set(-2.2, 2, 2);
    headsetGroup.add(leftEarcup);
    headsetGroup.add(rightEarcup);

    scene.add(headsetGroup);
    objects.push(headsetGroup);

    // Gaming Controller
    const controllerGeometry = new THREE.BoxGeometry(1.2, 0.6, 0.3);
    const controllerMaterial = new THREE.MeshPhongMaterial({ color: 0x4444ff });
    const controller = new THREE.Mesh(controllerGeometry, controllerMaterial);
    controller.position.set(3, -0.3, 1.5);
    controller.rotation.x = -0.2;
    controller.castShadow = true;
    scene.add(controller);
    objects.push(controller);

    // Particle System
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Floating geometric shapes
    const shapes = [];
    const shapeGeometries = [
      new THREE.OctahedronGeometry(0.3),
      new THREE.TetrahedronGeometry(0.3),
      new THREE.IcosahedronGeometry(0.3)
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        transparent: true,
        opacity: 0.7,
        wireframe: Math.random() > 0.5
      });
      const shape = new THREE.Mesh(geometry, material);
      
      shape.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30
      );
      
      shape.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.01 + 0.005
      };
      
      scene.add(shape);
      shapes.push(shape);
    }

    // Screen glow effect
    const glowGeometry = new THREE.PlaneGeometry(4.5, 3);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4444ff,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });
    const screenGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    screenGlow.position.set(0, 2, 0.01);
    scene.add(screenGlow);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Rotate main objects
      objects.forEach((obj, index) => {
        obj.rotation.y += 0.005 + index * 0.001;
        obj.position.y += Math.sin(time + index) * 0.002;
      });

      // Animate particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i * 0.01) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.001;

      // Animate floating shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        shape.position.y += Math.sin(time + shape.position.x) * shape.userData.floatSpeed;
      });

      // Animate camera
      camera.position.x = Math.sin(time * 0.5) * 3;
      camera.position.z = 15 + Math.cos(time * 0.3) * 2;
      camera.lookAt(0, 1, 0);

      // Animate lights
      spotLight1.intensity = 2 + Math.sin(time * 2) * 0.5;
      spotLight2.intensity = 2 + Math.cos(time * 2) * 0.5;
      
      // Screen glow animation
      screenGlow.material.opacity = 0.1 + Math.sin(time * 3) * 0.05;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleEnterShop = () => {
    router.push('/Games');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* 3D Canvas */}
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Overlay Content - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          {/* Animated Title with Hover Effect */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent bg-size-200 animate-gradient transition-all duration-1000 hover:scale-105 hover:drop-shadow-2xl cursor-default ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            GAME ZONE
          </h1>
          
          {/* Subtitle with Hover Animation */}
          <p className={`text-lg md:text-xl lg:text-2xl text-white/80 font-light transition-all duration-1000 delay-500 hover:text-white hover:scale-105 cursor-default ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Ultimate Gaming Experience Awaits
          </p>
          
          {/* Enter Button with Enhanced Hover Animation */}
          <div className={`transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleEnterShop}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95 hover:rotate-1 hover:-translate-y-2"
            >
              <span className="relative z-10 transition-all duration-300 group-hover:scale-105">
                Enter Game Store
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-none"></div>
              
              {/* Pulse effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-1000"></div>
            </button>
          </div>
          
          {/* Gaming Stats with Individual Hover Effects */}
          <div className={`flex flex-wrap justify-center gap-8 text-center text-white/60 transition-opacity duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="group cursor-default transition-all duration-300 hover:scale-110 hover:-translate-y-2">
              <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 group-hover:scale-125 transition-all duration-300 group-hover:drop-shadow-lg">
                1000+
              </div>
              <div className="text-sm group-hover:text-white transition-colors duration-300">Games</div>
            </div>
            <div className="group cursor-default transition-all duration-300 hover:scale-110 hover:-translate-y-2">
              <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 group-hover:scale-125 transition-all duration-300 group-hover:drop-shadow-lg">
                50K+
              </div>
              <div className="text-sm group-hover:text-white transition-colors duration-300">Players</div>
            </div>
            <div className="group cursor-default transition-all duration-300 hover:scale-110 hover:-translate-y-2">
              <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 group-hover:scale-125 transition-all duration-300 group-hover:drop-shadow-lg">
                24/7
              </div>
              <div className="text-sm group-hover:text-white transition-colors duration-300">Support</div>
            </div>
          </div>

          {/* Additional Gaming Features with Hover Animations */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 cursor-default">
              <div className="text-purple-400 text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🎮</div>
              <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-300">Latest Games</h3>
              <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">Discover new releases</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 cursor-default">
              <div className="text-blue-400 text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">Tournaments</h3>
              <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">Compete and win</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20 cursor-default">
              <div className="text-green-400 text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">👥</div>
              <h3 className="text-white font-semibold group-hover:text-green-300 transition-colors duration-300">Community</h3>
              <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">Join fellow gamers</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="text-white text-xl animate-pulse">Loading 3D Experience...</div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}