import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

const Scene = () => {
	return (
		<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
			<ambientLight intensity={0.1} />
			{/* A point light inside the polyhedron to make it glow */}
			<pointLight color="#1f5bcbff" intensity={2} position={[0, 0, 0]} />
			{/* A spotlight to create highlights and shadows on the rings */}
			<spotLight
				color="#0283bf"
				intensity={0.8}
				position={[10, 15, 10]}
				angle={0.3}
				penumbra={1}
				castShadow
			/>
			<spotLight
				color="#0283bf"
				intensity={0.5}
				position={[-10, -15, -10]}
				angle={0.3}
				penumbra={1}
			/>
			<group>
				<Rings />
				<CentralObject />
			</group>
			<MouseParallax />
		</Canvas>
	);
};

const Rings = () => {
	const group = useRef();

	useFrame(() => {
		if (group.current) {
			group.current.rotation.y += 0.001;
			group.current.rotation.x += 0.0005;
		}
	});

	return (
		<group ref={group}>
			<Torus args={[2.5, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
				<meshStandardMaterial color="#01989e" roughness={0.5} metalness={0.8} />
			</Torus>
			<Torus args={[3, 0.1, 16, 100]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
				<meshStandardMaterial color="#01989e" roughness={0.5} metalness={0.8} />
			</Torus>
			<Torus args={[3.5, 0.1, 16, 100]} rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
				<meshStandardMaterial color="#01989e" roughness={0.5} metalness={0.8} />
			</Torus>
		</group>
	);
};

const CentralObject = () => {
	const mesh = useRef();

	useFrame(({ clock }) => {
		if (mesh.current) {
			const time = clock.getElapsedTime();
			mesh.current.rotation.y = time * 0.1;
			mesh.current.rotation.x = time * 0.1;
			const scale = 1 + 0.1 * Math.sin(time);
			mesh.current.scale.set(scale, scale, scale);
		}
	});

	return (
		<Icosahedron ref={mesh} args={[1, 0]}>
			<meshStandardMaterial
				color="#01989e"
				emissive="#0283bf"
				emissiveIntensity={3}
				roughness={0.1}
				metalness={0.9}
			/>
		</Icosahedron>
	);
};

const MouseParallax = () => {
	const { camera } = useThree();
	const initialPosition = useRef(new THREE.Vector3(0, 0, 10));

	useEffect(() => {
		const handleMouseMove = (event) => {
			const { clientX, clientY } = event;
			const x = (clientX / window.innerWidth - 0.5) * 2;
			const y = -(clientY / window.innerHeight - 0.5) * 2;
			camera.position.x = initialPosition.current.x + x * 0.5;
			camera.position.y = initialPosition.current.y + y * 0.5;
			camera.lookAt(0, 0, 0);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [camera]);

	return null;
};

export default Scene;
