"use client";

import { useState } from "react";
import { useSite } from "@/components/SiteProvider";

export function QuestionAssistant() {
  const { message } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  return (
    <div className="assistant-widget">
      {isOpen && (
        <section
          className="assistant-panel"
          id="planner-assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="planner-assistant-title"
          aria-label={message.assistantTitle}
        >
          <div className="assistant-heading">
            <span className="assistant-avatar" aria-hidden="true">✦</span>
            <div>
              <h2 id="planner-assistant-title">{message.assistantTitle}</h2>
              <p>{message.assistantIntro}</p>
            </div>
            <button
              className="assistant-close"
              type="button"
              aria-label={message.assistantClose}
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <p className="assistant-disclosure">{message.assistantDisclosure}</p>
          <div className="assistant-questions" aria-label={message.assistantPrompt}>
            {message.assistantQuestions.map((item, index) => (
              <button
                type="button"
                key={item.question}
                className={selectedQuestion === index ? "selected" : undefined}
                aria-pressed={selectedQuestion === index}
                onClick={() => setSelectedQuestion(index)}
              >
                {item.question}
              </button>
            ))}
          </div>
          <div className="assistant-answer" aria-live="polite">
            {selectedQuestion === null
              ? message.assistantPrompt
              : message.assistantQuestions[selectedQuestion].answer}
          </div>
        </section>
      )}
      <button
        className="assistant-launcher"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={isOpen ? "planner-assistant-panel" : undefined}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="assistant-launcher-icon" aria-hidden="true">✦</span>
        <span>{isOpen ? message.assistantClose : message.assistantTitle}</span>
      </button>
    </div>
  );
}
