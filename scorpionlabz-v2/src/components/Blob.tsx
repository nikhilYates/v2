"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const Blob = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Blob geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_color1: { value: new THREE.Color("#0a1a3f") }, // Dark blue
        u_color2: { value: new THREE.Color("#102c66") }, // Lighter blue
        u_detail_scale: { value: 4.0 },
        u_chrome_color: { value: new THREE.Color("#ffffff") }, // Chrome highlight color
      },
      vertexShader: `
        uniform float u_time;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        //
        // GLSL textureless classic 3D noise "cnoise",
        // with an RSL-style periodic variant "pnoise".
        // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
        // Version: 2011-10-11
        //
        // Many thanks to Ian McEwan of Ashima Arts for the
        // ideas for permutation and gradient selection.
        //
        // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
        // Distributed under the MIT license.
        //
        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 mod289(vec4 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 permute(vec4 x) {
          return mod289(((x*34.0)+1.0)*x);
        }

        vec4 taylorInvSqrt(vec4 r) {
          return 1.79284291400159 - 0.85373472095314 * r;
        }

        vec3 fade(vec3 t) {
          return t*t*t*(t*(t*6.0-15.0)+10.0);
        }

        float cnoise(vec3 P) {
          vec3 Pi0 = floor(P);
          vec3 Pi1 = Pi0 + vec3(1.0);
          Pi0 = mod289(Pi0);
          Pi1 = mod289(Pi1);
          vec3 Pf0 = fract(P);
          vec3 Pf1 = Pf0 - vec3(1.0);
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 * (1.0 / 7.0);
          vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);

          vec4 gx1 = ixy1 * (1.0 / 7.0);
          vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);

          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;

          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
          return 2.2 * n_xyz;
        }

        void main() {
          vUv = uv;
          
          // Calculate view-space position and normal for highlights
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          vNormal = normalMatrix * normal;
          
          vec3 pos = position;
          
          // Create layered movement for liquid-like effect
          float slowTime = u_time * 0.2;
          float fastTime = u_time * 0.5;
          
          // Large, slow-moving waves
          float primaryNoise = cnoise(vec3(
            pos.x * 1.0 + slowTime,
            pos.y * 1.0 + slowTime * 0.8,
            pos.z * 1.0 + slowTime * 0.9
          )) * 0.4;
          
          // Medium ripples with more pronounced peaks for chrome effect
          float secondaryNoise = cnoise(vec3(
            pos.x * 2.5 + fastTime * 0.7,
            pos.y * 2.5 + fastTime * 0.6,
            pos.z * 2.5 + fastTime * 0.8
          )) * 0.15;
          
          // Fine surface detail for chrome highlights
          float surfaceNoise = cnoise(vec3(
            pos.x * 8.0 + fastTime * 1.2,
            pos.y * 8.0 + fastTime,
            pos.z * 8.0 + fastTime * 1.1
          )) * 0.05;
          
          float finalNoise = primaryNoise + secondaryNoise + surfaceNoise;
          
          // Apply displacement
          vec3 newPos = pos + normal * (finalNoise * 0.3);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        uniform vec3 u_chrome_color;
        uniform float u_time;
        uniform float u_detail_scale;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          
          // Create chrome-like reflections
          float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 3.0);
          
          // Create dynamic highlights based on surface curvature
          float highlightIntensity = pow(fresnel, 2.0) * 0.8;
          
          // Add rippling effect to the highlights
          float ripple = sin(vUv.x * u_detail_scale * 2.0 + u_time) * 
                        sin(vUv.y * u_detail_scale * 2.0 + u_time) * 0.5 + 0.5;
          
          // Combine base colors
          float colorNoise = sin(vUv.x * u_detail_scale + u_time * 0.5) * 
                            sin(vUv.y * u_detail_scale + u_time * 0.3) * 0.1;
          vec3 baseColor = mix(u_color1, u_color2, vUv.y + colorNoise);
          
          // Add chrome highlights
          float highlight = highlightIntensity * ripple;
          vec3 finalColor = mix(baseColor, u_chrome_color, highlight * 0.7);
          
          // Add edge darkening for depth
          float edgeGradient = smoothstep(0.0, 0.5, vUv.y);
          finalColor *= mix(0.8, 1.0, edgeGradient);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
      wireframe: false,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.u_time.value = clock.getElapsedTime();
      sphere.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0"></div>;
};

export default Blob;
