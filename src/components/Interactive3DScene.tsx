"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(
  () => import("@/components/SubpageHeroScene3D").then((module) => module.SubpageHeroScene3D),
  {
    ssr: false,
    loading: () => <div className="subpage-scene-loading" aria-hidden="true" />,
  },
);

export type SceneKind = "product" | "feature";

export function Interactive3DScene({
  kind,
  featureIndex = 0,
}: {
  kind: SceneKind;
  featureIndex?: number;
}) {
  return (
    <div className={`subpage-scene subpage-scene-${kind}`} aria-hidden="true">
      <Scene kind={kind} featureIndex={featureIndex} />
    </div>
  );
}
