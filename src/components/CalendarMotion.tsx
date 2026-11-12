"use client";

import type { CSSProperties } from "react";
import { useSite } from "@/components/SiteProvider";
import { courseEvents, formatScheduleTime } from "@/lib/schedule";

export function CalendarMotion() {
  const { message } = useSite();

  return (
    <div className="calendar-motion" aria-hidden="true">
      <div className="calendar-motion-backdrop">
        <span className="calendar-motion-orbit calendar-motion-orbit-one" />
        <span className="calendar-motion-orbit calendar-motion-orbit-two" />
        <div className="calendar-motion-paper">
          <div className="calendar-motion-topline">
            <span className="calendar-motion-brand">UO / PLANNER</span>
            <span className="calendar-motion-edition">{message.scheduleBadge}</span>
          </div>
          <h2>{message.scheduleTitle}</h2>
          <div className="calendar-motion-grid">
            {message.weekdays.map((day, dayIndex) => (
              <div className="calendar-motion-day" key={day}>
                <span className="calendar-motion-day-name">{day.slice(0, 3)}</span>
                <span className="calendar-motion-rule" />
                <div className="calendar-motion-events">
                  {courseEvents
                    .filter((event) => event.day === dayIndex)
                    .slice(0, 3)
                    .map((event, eventIndex) => (
                      <span
                        className={`calendar-motion-event calendar-motion-${event.kind}`}
                        key={`${event.code}-${event.start}`}
                        style={{
                          "--calendar-delay": `${dayIndex * 100 + eventIndex * 80 + 300}ms`,
                        } as CSSProperties}
                      >
                        <strong>{event.code.split(" · ")[0]}</strong>
                        <small>{formatScheduleTime(event.start)}</small>
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="calendar-motion-footer">
            <span>{message.alternativesNote.split(".")[0]}.</span>
            <span className="calendar-motion-mark" />
          </div>
        </div>
        <span className="calendar-motion-caption">{message.scheduleKicker}</span>
      </div>
    </div>
  );
}
