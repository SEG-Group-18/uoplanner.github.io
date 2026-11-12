"use client";

import type { CSSProperties } from "react";
import { useSite } from "@/components/SiteProvider";
import { scheduleBlocks } from "@/lib/schedule";

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
                  {scheduleBlocks
                    .filter((block) => block.day === dayIndex)
                    .map((block, blockIndex) => (
                      <span
                        className="calendar-motion-block"
                        key={`${block.day}-${block.start}`}
                        style={{
                          "--calendar-delay": `${dayIndex * 100 + blockIndex * 80 + 300}ms`,
                          height: `${Math.max(14, (block.end - block.start) * 0.34)}px`,
                        } as CSSProperties}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="calendar-motion-footer">
            <span>{message.scheduleBlocksNote}</span>
            <span className="calendar-motion-mark" />
          </div>
        </div>
        <span className="calendar-motion-caption">{message.scheduleKicker}</span>
      </div>
    </div>
  );
}
