"use client";

import { useSite } from "@/components/SiteProvider";
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
  const closeTimeout = useRef<number | null>(null);

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
      <section className="content-hero">
        <div className="content-hero-inner">
          <p className="eyebrow">{message.productKicker}</p>
          <h1>{message.productTitle}</h1>
          <p>{message.productText}</p>
        </div>
      </section>
      <section className="content-section">
        <ol className="feature-list">
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
