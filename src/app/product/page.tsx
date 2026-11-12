"use client";

import { useSite } from "@/components/SiteProvider";
import { ContentHero } from "@/components/ContentHero";
import { Interactive3DScene } from "@/components/Interactive3DScene";
import {
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
} from "react";

export default function ProductPage() {
  const { message } = useSite();
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const featureDialog = useRef<HTMLDialogElement>(null);
  const featureList = useRef<HTMLOListElement>(null);
  const closeTimeout = useRef<number | null>(null);

  useEffect(() => {
    const list = featureList.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rows = Array.from(list.querySelectorAll("li"));
    if (!("IntersectionObserver" in window)) {
      rows.forEach((row) => row.classList.add("is-visible"));
      return;
    }

    list.classList.add("is-scroll-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -56px 0px" },
    );
    rows.forEach((row) => observer.observe(row));

    return () => {
      observer.disconnect();
      list.classList.remove("is-scroll-ready");
      rows.forEach((row) => row.classList.remove("is-visible"));
    };
  }, []);

  useEffect(() => {
    if (selectedFeature !== null && !featureDialog.current?.open) {
      featureDialog.current?.showModal();
      featureDialog.current?.querySelector<HTMLButtonElement>(".feature-dialog-close")?.focus();
    }
  }, [selectedFeature]);

  useEffect(() => () => {
    if (closeTimeout.current !== null) {
      window.clearTimeout(closeTimeout.current);
    }
  }, []);

  function finishClose() {
    if (closeTimeout.current !== null) {
      window.clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    featureDialog.current?.close();
    setIsClosing(false);
    setSelectedFeature(null);
  }

  function closeFeatureDialog() {
    if (!featureDialog.current?.open || isClosing || featureDialog.current.dataset.closing === "true") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }
    setIsClosing(true);
    closeTimeout.current = window.setTimeout(finishClose, 240);
  }

  function handleDialogAnimationEnd(event: AnimationEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget && event.animationName === "feature-dialog-out") {
      finishClose();
    }
  }

  return (
    <main>
      <ContentHero
        eyebrow={message.productKicker}
        title={message.productTitle}
        description={message.productText}
        scene="product"
      />
      <section className="content-section">
        <ol ref={featureList} className="feature-list">
          {message.productFeatures.map((feature, index) => (
            <li
              key={feature.title}
              style={{ "--feature-delay": `${index * 100}ms` } as CSSProperties}
            >
              <button
                className="feature-open-button"
                type="button"
                aria-haspopup="dialog"
                onClick={() => setSelectedFeature(index)}
              >
                <span className="feature-check" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="feature-copy">
                  <strong>{feature.title}</strong>
                  <span className="feature-detail">{feature.detail}</span>
                  <span className="feature-action">
                    {message.productFeatureAction}
                    <span aria-hidden="true">→</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="notice-card">{message.productDisclaimer}</p>
      </section>
      <dialog
        ref={featureDialog}
        className="feature-dialog"
        data-closing={isClosing || undefined}
        aria-labelledby="feature-dialog-title"
        onAnimationEnd={handleDialogAnimationEnd}
        onCancel={(event) => {
          event.preventDefault();
          closeFeatureDialog();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeFeatureDialog();
          }
        }}
        onClose={() => setSelectedFeature(null)}
        onClick={(event) => {
          if (event.target === featureDialog.current) {
            closeFeatureDialog();
          }
        }}
      >
        {selectedFeature !== null && (
          <div className="feature-dialog-content">
            <div className="feature-dialog-heading">
              <span className="feature-dialog-count">
                {selectedFeature + 1} / {message.productFeatures.length}
              </span>
              <button
                className="feature-dialog-close"
                type="button"
                aria-label={message.productDialogClose}
                onClick={closeFeatureDialog}
              >
                ×
              </button>
            </div>
            <div className="feature-preview">
              <Interactive3DScene kind="feature" featureIndex={selectedFeature} />
            </div>
            <span className="feature-dialog-icon" aria-hidden="true">
              {String(selectedFeature + 1).padStart(2, "0")}
            </span>
            <h2 id="feature-dialog-title">
              {message.productFeatures[selectedFeature].title}
            </h2>
            <p>{message.productFeatures[selectedFeature].detail}</p>
            <button
              className="feature-dialog-done"
              type="button"
              onClick={closeFeatureDialog}
            >
              {message.productDialogClose}
            </button>
          </div>
        )}
      </dialog>
    </main>
  );
}
