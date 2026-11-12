"use client";

import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const garnet = "#7A0019";

function PlannerMark({
  pointer,
  hovering,
  reducedMotion,
}: {
  pointer: MutableRefObject<THREE.Vector2>;
  hovering: boolean;
  reducedMotion: boolean;
}) {
  const root = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (root.current && !reducedMotion) {
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.current.y * 0.13, 3, delta);
      root.current.rotation.y = THREE.MathUtils.damp(
        root.current.rotation.y,
        pointer.current.x * 0.2 + state.clock.elapsedTime * 0.045,
        3,
        delta,
      );
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : hovering ? 0.8 : 0.5}
      rotationIntensity={reducedMotion ? 0 : 0.015}
      floatIntensity={reducedMotion ? 0 : 0.08}
    >
      <group ref={root}>
        <mesh position={[0, 0, -0.02]}>
          <torusGeometry args={[0.83, 0.008, 8, 96]} />
          <meshBasicMaterial color="#43000e" />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.34, 0.72, 0.08]} />
          <meshStandardMaterial color="#eae8e8" roughness={0.55} />
        </mesh>
        {[-0.39, 0, 0.39].map((x, index) => (
          <mesh key={x} position={[x, -0.03, 0.047]}>
            <boxGeometry args={[0.22, 0.22, 0.018]} />
            <meshStandardMaterial color={index === 0 ? garnet : "#cecccd"} roughness={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export function SubpageHeroScene3D() {
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointer = useRef(new THREE.Vector2());
  const sceneContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => {
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  function trackPointer(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      1 - ((event.clientY - bounds.top) / bounds.height) * 2,
    );
  }

  return (
    <div
      ref={sceneContainer}
      className="subpage-scene-canvas"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => {
        setHovering(false);
        pointer.current.set(0, 0);
      }}
      onPointerMove={trackPointer}
    >
      <Canvas
        aria-hidden="true"
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 5, 5]} intensity={1.35} />
        <Environment preset="city" />
        <PlannerMark pointer={pointer} hovering={hovering} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
