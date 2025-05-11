"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const Blob = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Get parent dimensions
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color("#050924"); // Dark blue background
    
    // Calculate desired blob height (35% of container height)
    const maxBlobHeightRatio = 0.35;
    const desiredBlobHeight = height * maxBlobHeightRatio;
    
    // Adjust camera position and FOV to accommodate the desired size
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    
    // Calculate scale factor to achieve desired height, with a maximum size limit
    const maxScale = 1.5; // Maximum scale factor
    const blobScale = Math.min((desiredBlobHeight / height) * 2, maxScale);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: false,
      antialias: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });
    renderer.setClearColor;
    // renderer.setClearColor("#050924"); // Match scene background color
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // Add bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      5.0,  // bloom strength
      0.05,  // bloom radius
      0.01   // bloom threshold
    );
    composer.addPass(bloomPass);

    // Blob geometry
    const geometry = new THREE.IcosahedronGeometry(1, 20);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_color1: { value: new THREE.Color("#050510") }, // Dark base
        u_color2: { value: new THREE.Color("#0a1a3f") }, // Dark blue
        u_detail_scale: { value: 4.0 },
        u_chrome_color: { value: new THREE.Color("#1a2a4f") },
        u_light_position: { value: new THREE.Vector3(-5, 5, 3) }, // Top-left light position
        uResolution: { value: new THREE.Vector2(width, height) },
        uDisplace: { value: 0.8 },
        uSpread: { value: 2.0 },
        uNoise: { value: 20.0 },
        uTime: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vPosition;
        varying vec3 vPattern;

        uniform float u_time;
        uniform vec2 uResolution;
        uniform float uDisplace;
        uniform float uSpread;
        uniform float uNoise;

        #define PI 3.14159265358979
        #define MOD3 vec3(.1031,.11369,.13787)

        vec3 hash33(vec3 p3) {
          p3 = fract(p3 * MOD3);
          p3 += dot(p3, p3.yxz+19.19);
          return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
        }

        float pnoise(vec3 p) {
          vec3 pi = floor(p);
          vec3 pf = p - pi;
          vec3 w = pf * pf * (3. - 2.0 * pf);
          return mix(
            mix(
              mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                  dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                  w.x),
              mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                  dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                  w.x),
              w.z),
            mix(
              mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                  dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                  w.x),
                mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                    dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                    w.x),
                w.z),
              w.y);
        }

        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalMatrix * normal;
          
          // Calculate view-space position for highlights
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          
          float pat = pnoise(vec3(vUv * uNoise, sin(u_time) * 1.4)) * uDisplace;
          float proximity = abs(vUv.x - (.5 + sin(u_time)/(12. * uSpread)));
          
          vec3 full = pat * vec3(clamp(.23 * uSpread - proximity, 0., 1.));
          vec3 newPosition = position + normal * full;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPattern;
        varying vec3 vViewPosition;

        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uDisplace;
        uniform float uSpread;
        uniform float uNoise;

        #define PI 3.14159265358979
        #define MOD3 vec3(.1031,.11369,.13787)

        vec3 hash33(vec3 p3) {
          p3 = fract(p3 * MOD3);
          p3 += dot(p3, p3.yxz+19.19);
          return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
        }

        float pnoise(vec3 p) {
          vec3 pi = floor(p);
          vec3 pf = p - pi;
          vec3 w = pf * pf * (3. - 2.0 * pf);
          return mix(
            mix(
              mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                  dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                  w.x),
              mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                  dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                  w.x),
              w.z),
            mix(
              mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                  dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                  w.x),
                mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                    dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                    w.x),
                w.z),
              w.y);
        }

        void main() {
          float pat = pnoise(vec3(vUv * uNoise, sin(uTime) * 1.4)) * uDisplace;
          float proximity = abs(vUv.x - (.5 + sin(uTime)/(12. * uSpread)));

          vec3 full = pat * vec3(clamp(.23 * uSpread - proximity, 0., 1.));
          vec3 newPosition = vPosition + vNormal * full;
          vec3 purpleColor = vec3(0.498, 0.2039, 0.8314) / vec3(0.4941, 0.4941, 0.051);
          vec3 color = -vec3(pnoise(vec3(1. - newPosition.z * 35.))*40.) * (.01 -full) * purpleColor;
          float alpha = 1.0; // Adjust if you want parts of the blob to be transparent
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      wireframe: false,
    });

    const blob = new THREE.Mesh(geometry, material);
    
    // Apply the calculated scale
    blob.scale.set(blobScale, blobScale, blobScale);
    
    // Position the blob on the right side (adjust x position based on scale and screen width)
    const xOffset = Math.min(3.0 * blobScale, width * 0.3); // Limit x position based on screen width
    blob.position.x = xOffset;

    scene.add(blob);

    // Animation loop with liquid-like movement
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      
      material.uniforms.u_time.value = time;
      material.uniforms.uTime.value = time;

      // Scale the movement amplitude by the blob scale
      blob.position.x = 3.0 * blobScale + Math.sin(time * 0.3) * 0.2 * blobScale;
      blob.position.y = Math.cos(time * 0.2) * 0.2 * blobScale;
      
      // Add the scale factor to the base scale for animations
      blob.scale.x = blobScale * (1 + Math.sin(time * 0.5) * 0.2);
      blob.scale.y = blobScale * (1 + Math.cos(time * 0.4) * 0.2);
      blob.scale.z = blobScale * (1 + Math.sin(time * 0.3) * 0.2);

      composer.render();
    };
    animate();

    // Update resize handler to maintain relative size
    const handleResize = () => {
      if (!container) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const newBlobScale = Math.min((newHeight * maxBlobHeightRatio / newHeight) * 2, maxScale);
      const newXOffset = Math.min(3.0 * newBlobScale, newWidth * 0.3);
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      // Update blob scale and position
      blob.scale.set(newBlobScale, newBlobScale, newBlobScale);
      blob.position.x = newXOffset;
      
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
      material.uniforms.uResolution.value.set(newWidth, newHeight);
      bloomPass.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full bg-[#050924]"></div>;
};

export default Blob;
