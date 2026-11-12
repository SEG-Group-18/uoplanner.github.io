"use client";

import dynamic from "next/dynamic";
import { useSite } from "@/components/SiteProvider";

const PlannerScene3D = dynamic(
  () => import("@/components/PlannerScene3D").then((module) => module.PlannerScene3D),
  {
    ssr: false,
    loading: () => <div className="globe-scene-loading" aria-hidden="true" />,
  },
);

export function RotatingGlobe() {
  const { theme } = useSite();

  return (
    <div className="globe-stage" aria-hidden="true">
      <PlannerScene3D theme={theme} />
    </div>
  );
}
