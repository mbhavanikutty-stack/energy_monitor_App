import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const FuturisticAnimation = () => {
  return (
    <Canvas className="futuristic-animation-canvas">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <GlowingShape />
    </Canvas>
  );
};

const GlowingShape = () => {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
      mesh.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.5) * 0.5;
      mesh.current.position.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <Icosahedron ref={mesh} args={[2, 0]}>
      <meshStandardMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={2}
        metalness={1}
        roughness={0.1}
        wireframe
      />
    </Icosahedron>
  );
};

export default FuturisticAnimation;