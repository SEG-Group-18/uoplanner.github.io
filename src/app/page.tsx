"use client";

import Link from "next/link";
import { CalendarMotion } from "@/components/CalendarMotion";
import { CourseCalendar } from "@/components/CourseCalendar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useSite } from "@/components/SiteProvider";

export default function HomePage() {
  const { message } = useSite();
  const steps = [
    { title: message.stepOneTitle, text: message.stepOneText },
    { title: message.stepTwoTitle, text: message.stepTwoText },
    { title: message.stepThreeTitle, text: message.stepThreeText },
  ];
  const benefits = [
    { title: message.benefitOneTitle, text: message.benefitOneText },
    { title: message.benefitTwoTitle, text: message.benefitTwoText },
    { title: message.benefitThreeTitle, text: message.benefitThreeText },
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <ScrollReveal variant="left">
            <div className="hero-copy">
              <p className="eyebrow">{message.heroKicker}</p>
              <h1>{message.heroTitle}</h1>
              <p className="hero-description">{message.heroText}</p>
              <div className="hero-actions">
                <a className="button-primary" href="#schedule">{message.heroPrimary}</a>
                <a className="button-secondary" href="#how-it-works">{message.heroSecondary} <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal className="hero-art-space hero-calendar-art" variant="scale" delayMs={160}>
            <CalendarMotion />
          </ScrollReveal>
        </div>
      </section>

      <div className="page-content">
        <ScrollReveal variant="up">
          <section id="how-it-works" aria-labelledby="intro-title">
            <div className="section-heading">
              <p className="eyebrow">{message.introKicker}</p>
              <h2 id="intro-title">{message.introTitle}</h2>
              <p>{message.introText}</p>
            </div>
            <div className="steps-grid">
              {steps.map((step, index) => (
                <ScrollReveal key={step.title} delayMs={index * 100} variant="up">
                  <article className="step-card">
                    <span className="step-number">0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal className="benefits-section" variant="right">
          <section aria-labelledby="benefits-title">
            <div className="section-heading">
              <p className="eyebrow">{message.benefitsKicker}</p>
              <h2 id="benefits-title">{message.benefitsTitle}</h2>
              <p>{message.benefitsText}</p>
            </div>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={benefit.title} delayMs={index * 110} variant="up">
                  <article className="benefit-card">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal variant="scale" delayMs={180}>
              <Link className="premium-teaser" href="/pricing/">
                <span>
                  <strong>{message.premiumTeaserTitle}</strong>
                  <span>{message.premiumTeaserText}</span>
                </span>
                <span className="premium-arrow" aria-hidden="true">→</span>
              </Link>
            </ScrollReveal>
          </section>
        </ScrollReveal>

        <CourseCalendar />
      </div>
    </main>
  );
}
