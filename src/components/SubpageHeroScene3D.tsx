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

type SceneKind = "product" | "feature";
const garnet = "#7A0019";
const ivory = "#fffdf9";

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

function FeatureMiniature({
  pointer,
  featureIndex,
  reducedMotion,
}: {
  pointer: MutableRefObject<THREE.Vector2>;
  featureIndex: number;
  reducedMotion: boolean;
}) {
  const root = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!root.current || reducedMotion) return;
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.current.y * 0.18, 3, delta);
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      pointer.current.x * 0.2 + state.clock.elapsedTime * 0.055,
      3,
      delta,
    );
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 0.8}
      rotationIntensity={reducedMotion ? 0 : 0.04}
      floatIntensity={reducedMotion ? 0 : 0.12}
    >
      <group ref={root}>
        <mesh castShadow>
          <boxGeometry args={[1.25, 0.78, 0.13]} />
          <meshStandardMaterial color={ivory} roughness={0.42} />
        </mesh>
        {[0, 1, 2].map((index) => (
          <mesh
            key={index}
            position={[
              (index - 1) * 0.34,
              index === featureIndex % 3 ? 0.04 : -0.08,
              0.08,
            ]}
          >
            <boxGeometry args={[0.25, index === featureIndex % 3 ? 0.42 : 0.28, 0.07]} />
            <meshStandardMaterial
              color={index === featureIndex % 3 ? garnet : "#d9d7d4"}
              roughness={0.4}
            />
          </mesh>
        ))}
        <mesh rotation={[0.28, 0.12, 0.4]}>
          <torusGeometry args={[0.76, 0.012, 8, 80]} />
          <meshStandardMaterial color={garnet} roughness={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

export function SubpageHeroScene3D({
  kind,
  featureIndex,
}: {
  kind: SceneKind;
  featureIndex: number;
}) {
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
        camera={{ position: [0, 0, kind === "feature" ? 4.2 : 5.2], fov: 38 }}
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 5, 5]} intensity={1.35} />
        <Environment preset="city" />
        {kind === "product" ? (
          <PlannerMark pointer={pointer} hovering={hovering} reducedMotion={reducedMotion} />
        ) : (
          <FeatureMiniature pointer={pointer} featureIndex={featureIndex} reducedMotion={reducedMotion} />
        )}
      </Canvas>
    </div>
  );
}
