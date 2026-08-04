"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seededUnit(index: number, stream: number) {
  let seed = Math.imul(index + 1, 0x9e3779b1) ^ Math.imul(stream + 1, 0x85ebca6b);
  seed = Math.imul(seed ^ (seed >>> 16), 0x7feb352d);
  seed = Math.imul(seed ^ (seed >>> 15), 0x846ca68b);
  return ((seed ^ (seed >>> 16)) >>> 0) / 4294967296;
}

function NeuralCore() {
  const core = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }, delta) => {
    if (!core.current || !inner.current) return;
    core.current.rotation.y += delta * 0.08;
    core.current.rotation.x = THREE.MathUtils.lerp(core.current.rotation.x, pointer.y * 0.18, 0.035);
    core.current.rotation.z = THREE.MathUtils.lerp(core.current.rotation.z, -pointer.x * 0.16, 0.035);
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.4) * 0.035;
    inner.current.scale.setScalar(pulse);
  });

  return (
    <group ref={core} position={[0.15, 0.08, 0]}>
      <Float speed={1.45} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={inner} scale={1.45}>
          <icosahedronGeometry args={[1, 5]} />
          <MeshDistortMaterial
            color="#35106c"
            distort={0.22}
            speed={1.8}
            roughness={0.38}
            metalness={0.72}
            transparent
            opacity={0.26}
          />
        </mesh>
        <mesh scale={1.82} rotation={[0.7, 0.1, 0.2]}>
          <torusGeometry args={[1, 0.005, 8, 200]} />
          <meshBasicMaterial color="#f13de8" transparent opacity={0.55} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh scale={2.08} rotation={[1.25, 0.3, -0.5]}>
          <torusGeometry args={[1, 0.004, 8, 200]} />
          <meshBasicMaterial color="#327dff" transparent opacity={0.52} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh scale={2.34} rotation={[0.35, 1.2, 0.8]}>
          <torusGeometry args={[1, 0.003, 8, 200]} />
          <meshBasicMaterial color="#ad5cff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(720 * 3);
    for (let index = 0; index < 720; index += 1) {
      const radius = 2.5 + seededUnit(index, 0) * 6.5;
      const theta = seededUnit(index, 1) * Math.PI * 2;
      const phi = Math.acos(2 * seededUnit(index, 2) - 1);
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[index * 3 + 2] = radius * Math.cos(phi) - 1.5;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.012;
    points.current.rotation.z -= delta * 0.004;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c99cff"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.48}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function NeuralCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      fallback={(
        <div className="premium-canvas-fallback" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      )}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[-3, 2, 4]} color="#f13de8" intensity={18} distance={10} />
      <pointLight position={[4, -1, 3]} color="#327dff" intensity={16} distance={10} />
      <NeuralCore />
      <ParticleField />
      <Sparkles count={90} scale={[9, 6, 5]} size={1.4} speed={0.24} color="#a76cff" opacity={0.24} />
    </Canvas>
  );
}
