"use client";

import { Line, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";

import { seededUnit } from "@/app/lib/seeded-unit";
import { WEBGL_SUPPORTED } from "@/app/lib/webgl-supported";

const continentOutlines: Array<Array<[number, number]>> = [
  [[70, -165], [73, -140], [68, -116], [58, -96], [50, -76], [44, -62], [31, -80], [25, -97], [17, -103], [22, -113], [33, -118], [45, -125], [57, -136], [62, -151], [70, -165]],
  [[12, -81], [4, -75], [-6, -80], [-19, -72], [-36, -70], [-55, -66], [-50, -53], [-31, -48], [-15, -39], [-5, -50], [5, -60], [12, -72], [12, -81]],
  [[36, -17], [35, 10], [31, 32], [15, 43], [0, 42], [-16, 35], [-35, 20], [-34, 8], [-18, -1], [0, -10], [16, -17], [30, -10], [36, -17]],
  [[36, -10], [45, -5], [58, 5], [71, 30], [74, 60], [70, 100], [62, 140], [50, 155], [40, 135], [35, 115], [22, 105], [8, 80], [22, 70], [30, 50], [42, 35], [36, 20], [36, -10]],
  [[-12, 112], [-11, 130], [-18, 145], [-38, 151], [-44, 135], [-35, 116], [-20, 112], [-12, 112]],
  [[60, -52], [70, -60], [82, -42], [76, -20], [64, -35], [60, -52]],
  [[-12, 48], [-16, 50], [-25, 47], [-14, 44], [-12, 48]],
  [[-70, -180], [-73, -135], [-71, -90], [-76, -45], [-72, 0], [-76, 45], [-71, 90], [-74, 135], [-70, 180]],
];

const atmosphereVertex = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const atmosphereFragment = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vViewPosition))), 2.7);
    vec3 glow = mix(vec3(0.18, 0.34, 1.0), vec3(0.73, 0.21, 1.0), fresnel);
    gl_FragColor = vec4(glow, fresnel * 0.76);
  }
`;

function latLonToVector(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function Continents() {
  const paths = useMemo(
    () => continentOutlines.map((outline) => outline.map(([lat, lon]) => latLonToVector(lat, lon, 2.224))),
    [],
  );

  return paths.map((points, index) => (
    <Line
      key={index}
      points={points}
      color={index % 2 === 0 ? "#c17aff" : "#6f8fff"}
      lineWidth={1.15}
      transparent
      opacity={0.82}
    />
  ));
}

function Earth({ active }: { active: boolean }) {
  const earth = useRef<THREE.Group>(null);

  useFrame(({ pointer }, delta) => {
    if (!earth.current || !active) return;
    earth.current.rotation.y += delta * 0.075;
    earth.current.rotation.x = THREE.MathUtils.lerp(earth.current.rotation.x, 0.12 + pointer.y * 0.025, 0.025);
  });

  return (
    <group ref={earth} position={[0, -2.05, 0]} rotation={[0.12, -0.68, -0.06]}>
      <mesh>
        <sphereGeometry args={[2.2, 72, 72]} />
        <meshStandardMaterial color="#070518" emissive="#16062d" emissiveIntensity={0.72} metalness={0.5} roughness={0.68} />
      </mesh>
      <mesh scale={1.006}>
        <sphereGeometry args={[2.2, 40, 28]} />
        <meshBasicMaterial color="#7442d6" wireframe transparent opacity={0.13} depthWrite={false} />
      </mesh>
      <Continents />
      <mesh scale={1.08}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function MeteorShower({ active }: { active: boolean }) {
  const instances = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meteors = useMemo(
    () => Array.from({ length: 13 }, (_, index) => ({
      x: -8 + seededUnit(index, 0) * 15,
      z: -3 - seededUnit(index, 1) * 6,
      speed: 0.07 + seededUnit(index, 2) * 0.08,
      phase: seededUnit(index, 3),
      length: 0.44 + seededUnit(index, 4) * 0.72,
    })),
    [],
  );

  useFrame(({ clock }) => {
    if (!instances.current || !active) return;
    meteors.forEach((meteor, index) => {
      const progress = (clock.elapsedTime * meteor.speed + meteor.phase) % 1;
      dummy.position.set(meteor.x + progress * 4.4, 5.6 - progress * 11.5, meteor.z);
      dummy.rotation.set(0, 0, -0.58);
      dummy.scale.set(1, meteor.length, 1);
      dummy.updateMatrix();
      instances.current?.setMatrixAt(index, dummy.matrix);
    });
    instances.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instances} args={[undefined, undefined, meteors.length]} frustumCulled={false}>
      <cylinderGeometry args={[0.006, 0.018, 0.55, 5]} />
      <meshBasicMaterial color="#e5e3ff" transparent opacity={0.62} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

function SpaceScene({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[-5, 4, 5]} color="#8e54ff" intensity={3.8} />
      <pointLight position={[4, 0, 4]} color="#376dff" intensity={26} distance={12} />
      <pointLight position={[-4, -2, 3]} color="#d948ff" intensity={18} distance={10} />
      <Stars radius={30} depth={15} count={950} factor={2.3} saturation={0.35} fade speed={active ? 0.22 : 0} />
      <MeteorShower active={active} />
      <Earth active={active} />
    </>
  );
}

function SpaceFallback() {
  return <div className="space-earth-fallback" aria-hidden="true"><i /><i /><i /></div>;
}

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function FooterSpaceCanvas() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "240px" });
    if (container.current) observer.observe(container.current);

    return () => observer.disconnect();
  }, []);

  const active = visible && !reducedMotion;

  return (
    <div ref={container} className="footer-space-canvas" aria-hidden="true">
      {WEBGL_SUPPORTED ? (
        <Canvas
          dpr={[1, 1.4]}
          camera={{ position: [0, 0.55, 8.2], fov: 42 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          frameloop={active ? "always" : "demand"}
          fallback={<SpaceFallback />}
        >
          <SpaceScene active={active} />
        </Canvas>
      ) : <SpaceFallback />}
    </div>
  );
}
