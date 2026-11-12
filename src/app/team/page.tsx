"use client";

import Image from "next/image";
import { useSite } from "@/components/SiteProvider";

const members = [
  { name: "Samuel Brownlee", image: "/media/samuel-brownlee.png", index: 0 },
  { name: "Quérèn De Souza", image: "/media/queren-de-souza.png", index: 1 },
  { name: "James Wong", image: "/media/james-wong.png", index: 2 },
  { name: "Lamar Elbakkoush", image: "/media/lamar-elbakkoush.png", index: 3 },
  { name: "Robin Ineza", image: "/media/robin-ineza.png", index: 4 },
];

export default function TeamPage() {
  const { message } = useSite();

  return (
    <main className="team-page">
      <section className="content-hero">
        <div className="content-hero-inner">
          <p className="eyebrow">{message.teamKicker}</p>
          <h1>{message.teamTitle}</h1>
          <p>{message.teamText}</p>
        </div>
      </section>
      <section className="content-section">
        <div className="team-grid">
          {members.map((member) => {
            const challenge = message.teamChallenges[member.index];
            return (
              <article className="team-card" key={member.name}>
                <Image className="team-avatar" src={member.image} alt="" width={76} height={76} />
                <h2>{member.name}</h2>
                <h3>{challenge.title}</h3>
                <p>{challenge.text}</p>
              </article>
            );
          })}
        </div>
        <section className="team-story" aria-labelledby="team-story-title">
          <p className="eyebrow">{message.teamMissionKicker}</p>
          <h2 id="team-story-title">{message.teamMissionTitle}</h2>
          <p>{message.teamMissionText}</p>
        </section>
      </section>
    </main>
  );
}
