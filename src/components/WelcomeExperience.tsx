"use client";

import { useEffect, useRef, useState, type AnimationEvent, type ReactNode } from "react";
import { RotatingGlobe } from "@/components/RotatingGlobe";
import { useSite } from "@/components/SiteProvider";

export function WelcomeExperience({ children }: { children: ReactNode }) {
  const { message } = useSite();
  const [entered, setEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const enterButton = useRef<HTMLButtonElement>(null);
  const enterTimeout = useRef<number | null>(null);

  useEffect(() => () => {
    if (enterTimeout.current !== null) {
      window.clearTimeout(enterTimeout.current);
    }
  }, []);

  function enterSite() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }

    setIsEntering(true);
    enterTimeout.current = window.setTimeout(() => setEntered(true), 950);
  }

  function finishTransition(event: AnimationEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || event.animationName !== "welcome-page-exit") {
      return;
    }
    if (enterTimeout.current !== null) {
      window.clearTimeout(enterTimeout.current);
    }
    setEntered(true);
  }

  useEffect(() => {
    if (entered) {
      document.querySelector<HTMLElement>(".site-header .brand")?.focus();
    } else {
      enterButton.current?.focus();
    }
  }, [entered]);

  return (
    <>
      <div
        className={`website-shell${isEntering && !entered ? " is-entering" : ""}`}
        inert={!entered}
        aria-hidden={!entered}
      >
        {children}
      </div>
      {!entered && (
        <main
          className={`welcome-screen${isEntering ? " is-leaving" : ""}`}
          onAnimationEnd={finishTransition}
        >
          <div className="welcome-ambient welcome-ambient-one" aria-hidden="true" />
          <div className="welcome-ambient welcome-ambient-two" aria-hidden="true" />
          <div className="welcome-stars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div
            className="welcome-layout"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
          >
            <div className="welcome-copy">
              <span className="welcome-brand">
                <span className="welcome-brand-mark" aria-hidden="true">UO</span>
                UOPlanner
              </span>
              <p className="welcome-eyebrow">{message.welcomeEyebrow}</p>
              <h1 id="welcome-title">{message.welcomeTitle}</h1>
              <p className="welcome-description">{message.welcomeText}</p>
              <button
                className="welcome-action"
                ref={enterButton}
                type="button"
                onClick={enterSite}
                disabled={isEntering}
              >
                {message.welcomeAction}
                <span aria-hidden="true">→</span>
              </button>
              <p className="welcome-note">{message.welcomeNote}</p>
            </div>
            <div className="welcome-globe">
              <RotatingGlobe />
              <span className="welcome-orbit-label" aria-hidden="true">
                PLAN · COMPARE · BREATHE
              </span>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
