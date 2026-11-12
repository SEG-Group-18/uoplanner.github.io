"use client";

import { useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { useSite } from "@/components/SiteProvider";
import { ContentHero } from "@/components/ContentHero";

const members = [
  { name: "Samuel Brownlee", image: "/media/samuel-brownlee.png", index: 0 },
  { name: "Quérèn De Souza", image: "/media/queren-de-souza.png", index: 1 },
  { name: "James Wong", image: "/media/james-wong.png", index: 2 },
  { name: "Lamar Elbakkoush", image: "/media/lamar-elbakkoush.png", index: 3 },
  { name: "Robin Ineza", image: "/media/robin-ineza.png", index: 4 },
];

export default function TeamPage() {
  const { message } = useSite();
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  function toggleMember(index: number) {
    setExpandedMember((current) => current === index ? null : index);
  }

  function trackMemberPointer(event: ReactPointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--card-rotate-x", `${-y * 7}deg`);
    event.currentTarget.style.setProperty("--card-rotate-y", `${x * 8}deg`);
    event.currentTarget.style.setProperty("--sheen-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--sheen-y", `${(y + 0.5) * 100}%`);
  }

  function resetMemberPointer(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.removeProperty("--card-rotate-x");
    event.currentTarget.style.removeProperty("--card-rotate-y");
    event.currentTarget.style.removeProperty("--sheen-x");
    event.currentTarget.style.removeProperty("--sheen-y");
  }

  function handleMemberKeyDown(event: KeyboardEvent<HTMLElement>, index: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMember(index);
    }
  }

  return (
    <main className="team-page">
      <ContentHero
        eyebrow={message.teamKicker}
        title={message.teamTitle}
        description={message.teamText}
        scene="product"
      />
      <section className="content-section">
        <div className="team-grid">
          {members.map((member) => {
            const challenge = message.teamChallenges[member.index];
            const expanded = expandedMember === member.index;
            return (
              <article
                className="team-card"
                data-expanded={expanded}
                key={member.name}
                role="button"
                tabIndex={0}
                aria-expanded={expanded}
                aria-label={`${member.name}. ${expanded ? message.teamCollapseAction : message.teamExpandAction}`}
                onClick={() => toggleMember(member.index)}
                onKeyDown={(event) => handleMemberKeyDown(event, member.index)}
                onPointerMove={trackMemberPointer}
                onPointerLeave={resetMemberPointer}
              >
                <div className="team-card-inner">
                  <div className="team-card-face team-card-front" aria-hidden={expanded}>
                    <div className="team-member-heading">
                      <Image className="team-avatar" src={member.image} alt="" width={112} height={112} />
                      <div className="team-member-identity">
                        <h2>{member.name}</h2>
                        <p className="team-member-role">{message.teamRole}</p>
                      </div>
                    </div>
                    <p className="team-member-program">{message.teamProgram}</p>
                    <blockquote className="team-member-quote">{challenge.text}</blockquote>
                    <span className="team-card-hint">{message.teamExpandAction} <span aria-hidden="true">↗</span></span>
                  </div>
                  <div className="team-card-face team-card-back" aria-hidden={!expanded}>
                    <span className="team-card-index">0{member.index + 1}</span>
                    <h2>{member.name}</h2>
                    <p className="team-detail-label">{message.teamProgramLabel}</p>
                    <p className="team-detail-value">{message.teamProgram}</p>
                    <p className="team-detail-label">{message.teamContributionLabel}</p>
                    <p className="team-member-description">{challenge.title}: {challenge.text}</p>
                    <span className="team-card-hint">{message.teamCollapseAction} <span aria-hidden="true">↙</span></span>
                  </div>
                </div>
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
