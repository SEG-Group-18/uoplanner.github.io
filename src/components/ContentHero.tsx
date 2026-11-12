import { Interactive3DScene, type SceneKind } from "@/components/Interactive3DScene";

export function ContentHero({
  eyebrow,
  title,
  description,
  scene,
}: {
  eyebrow: string;
  title: string;
  description: string;
  scene: SceneKind;
}) {
  return (
    <section className="content-hero">
      <div className="content-hero-inner">
        <div className="content-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="content-hero-art">
          <Interactive3DScene kind={scene} />
        </div>
      </div>
    </section>
  );
}
