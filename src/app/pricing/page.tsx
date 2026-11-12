"use client";

import Link from "next/link";
import { useSite } from "@/components/SiteProvider";

export default function PricingPage() {
  const { message } = useSite();

  return (
    <main>
      <section className="content-hero">
        <div className="content-hero-inner">
          <p className="eyebrow">{message.pricingKicker}</p>
          <h1>{message.pricingTitle}</h1>
          <p>{message.pricingText}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="pricing-cards">
          <article className="plan-card">
            <p className="plan-label">{message.freeName}</p>
            <h2>{message.freeName}</h2>
            <p className="plan-price">$0 <span>{message.perMonth}</span></p>
            <p className="plan-description">{message.freeDescription}</p>
            <ul className="plan-features">
              {message.freeFeatures.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <Link className="plan-button" href="/#schedule">{message.freeAction}</Link>
          </article>
          <article className="plan-card plan-card-premium">
            <p className="plan-label">{message.planned}</p>
            <h2>{message.premiumName}</h2>
            <p className="plan-price">$10 <span>{message.perMonth}</span></p>
            <p className="plan-description">{message.premiumDescription}</p>
            <ul className="plan-features">
              {message.premiumFeatures.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
            <a className="plan-button" href="#faq" aria-disabled="true" onClick={(event) => event.preventDefault()}>
              {message.premiumAction}
            </a>
          </article>
        </div>

        <section className="faq-section" id="faq" aria-labelledby="faq-title">
          <p className="eyebrow">{message.faqKicker}</p>
          <h2 className="content-heading" id="faq-title">{message.faqTitle}</h2>
          {message.faqQuestions.map(({ question, answer }) => (
            <article className="faq-item" key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
