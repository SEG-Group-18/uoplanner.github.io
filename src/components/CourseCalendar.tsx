"use client";

import { useSite } from "@/components/SiteProvider";
import { ScrollReveal } from "@/components/ScrollReveal";
import { scheduleBlocks } from "@/lib/schedule";

export function CourseCalendar() {
  const { message, locale } = useSite();

  return (
    <section className="calendar-section" id="schedule" aria-labelledby="schedule-title">
      <ScrollReveal variant="left">
        <div className="section-heading">
          <p className="eyebrow">{message.scheduleKicker}</p>
          <h2 id="schedule-title">{message.scheduleTitle}</h2>
          <p>{message.scheduleDescription}</p>
        </div>
      </ScrollReveal>
      <ScrollReveal className="calendar-reveal" variant="scale" delayMs={120}>
      <div className="calendar-card">
        <div className="calendar-title-row">
          <div className="calendar-title">
            <span className="calendar-icon" aria-hidden="true">▦</span>
            <span>{message.scheduleTitle}</span>
          </div>
          <span className="calendar-badge">{message.scheduleBadge}</span>
        </div>
        <div className="calendar-scroll">
          <div className="calendar-grid">
            <div className="calendar-heading calendar-time-heading">{message.timeLabel}</div>
            {message.weekdays.map((day) => (
              <div className="calendar-heading" key={day}>{day}</div>
            ))}
            <div className="time-rail" aria-hidden="true">
              {Array.from({ length: 15 }, (_, index) => {
                const hour = index + 8;
                const labelHour = hour % 12 || 12;
                const period = hour >= 12 ? "PM" : "AM";
                return (
                  <span className="time-label" key={hour} style={{ top: `${index * 54 - 8}px` }}>
                    {locale === "fr" ? `${labelHour} h` : `${labelHour}:00 ${period}`}
                  </span>
                );
              })}
            </div>
            {message.weekdays.map((day, dayIndex) => (
              <div
                className="day-column"
                key={day}
                aria-label={day}
                role="group"
              >
                {scheduleBlocks.filter((block) => block.day === dayIndex).map((block) => (
                  <div
                    className="schedule-block"
                    key={`${block.day}-${block.start}`}
                    style={{
                      top: `${block.start * 0.9}px`,
                      height: `${(block.end - block.start) * 0.9}px`,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="calendar-notes">
          <p><span className="note-dot" aria-hidden="true" />{message.scheduleBlocksNote}</p>
          <p>{message.scheduleNote}</p>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
