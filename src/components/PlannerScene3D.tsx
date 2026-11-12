"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

type Theme = "light" | "dark";
type TileProps = {
  position: [number, number, number];
  rotation: number;
  dark: boolean;
};

const tiles: Omit<TileProps, "dark">[] = [
  { position: [-1.25, 0.8, 0.05], rotation: -0.16 },
  { position: [1.32, 0.65, -0.18], rotation: 0.14 },
  { position: [-1.4, -0.48, -0.16], rotation: 0.12 },
  { position: [1.15, -0.8, 0.12], rotation: -0.18 },
  { position: [0.2, 1.48, -0.34], rotation: 0.08 },
];

function CalendarTile({ position, rotation, dark }: TileProps) {
  return (
    <group position={position} rotation={[0.08, -0.18, rotation]}>
      <mesh castShadow>
        <boxGeometry args={[0.43, 0.56, 0.055]} />
        <meshStandardMaterial color={dark ? "#4a4a49" : "#ffffff"} roughness={0.38} />
      </mesh>
      {[-0.105, 0.105].flatMap((x) =>
        [-0.12, 0.015, 0.15].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.031]}>
            <boxGeometry args={[0.105, 0.085, 0.012]} />
            <meshStandardMaterial color={dark ? "#777777" : "#dfe1e3"} roughness={0.5} />
          </mesh>
        )),
      )}
      <mesh position={[0, -0.235, 0.032]}>
        <boxGeometry args={[0.3, 0.018, 0.014]} />
        <meshStandardMaterial color="#7A0019" roughness={0.42} />
      </mesh>
    </group>
  );
}

function PlannerObject({
  dark,
  hovered,
  pointer,
  reducedMotion,
}: {
  dark: boolean;
  hovered: boolean;
  pointer: React.MutableRefObject<THREE.Vector2>;
  reducedMotion: boolean;
}) {
  const object = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = object.current;
    if (!group) return;

    const targetScale = hovered ? 1.07 : 1;
    group.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      reducedMotion ? 1 : 1 - Math.exp(-delta * 5),
    );
    if (!reducedMotion) {
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, pointer.current.y * 0.12, 3, delta);
      group.rotation.y = THREE.MathUtils.damp(
        group.rotation.y,
        state.clock.elapsedTime * 0.08 + pointer.current.x * 0.16,
        3,
        delta,
      );
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1}
      rotationIntensity={reducedMotion ? 0 : 0.08}
      floatIntensity={reducedMotion ? 0 : 0.22}
      floatingRange={[-0.08, 0.08]}
    >
      <group ref={object}>
        {tiles.map((tile, index) => (
          <CalendarTile {...tile} dark={dark} key={index} />
        ))}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.83, 48, 48]} />
          <meshStandardMaterial
            color={dark ? "#3a3a39" : "#dfe1e3"}
            roughness={0.3}
            metalness={0.24}
          />
        </mesh>
        <mesh rotation={[0.28, 0.12, -0.42]}>
          <torusGeometry args={[1.04, 0.018, 8, 120]} />
          <meshStandardMaterial color="#7A0019" roughness={0.38} metalness={0.35} />
        </mesh>
        <mesh rotation={[1.12, -0.26, 0.42]}>
          <torusGeometry args={[1.16, 0.009, 8, 120]} />
          <meshStandardMaterial color={dark ? "#777777" : "#a9adb1"} roughness={0.5} />
        </mesh>
        <mesh position={[0.12, 1.04, 0.3]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#7A0019" emissive="#7A0019" emissiveIntensity={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

export function PlannerScene3D({ theme }: { theme: Theme }) {
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  function trackPointer(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      1 - ((event.clientY - bounds.top) / bounds.height) * 2,
    );
  }

  return (
    <div
      className="planner-scene"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        pointer.current.set(0, 0);
      }}
      onPointerMove={trackPointer}
    >
      <Canvas
        aria-hidden="true"
        camera={{ position: [0, 0, 5.3], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 5]} intensity={1.2} />
        <Environment preset="city" />
        <PlannerObject
          dark={theme === "dark"}
          hovered={hovered}
          pointer={pointer}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
