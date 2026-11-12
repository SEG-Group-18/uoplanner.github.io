import { describe, expect, it } from "vitest";
import { messages } from "./messages";
import { courseEvents, formatScheduleTime } from "./schedule";

describe("sample schedule", () => {
  it("preserves the classes and times from the supplied weekly schedule", () => {
    expect(courseEvents).toHaveLength(12);
    expect(formatScheduleTime(120)).toBe("10:00 AM");
    expect(courseEvents).toContainEqual(
      expect.objectContaining({
        day: 2,
        start: 210,
        end: 380,
        code: "ITI 1520 · B02",
        kind: "lab",
      }),
    );
    expect(courseEvents).toContainEqual(
      expect.objectContaining({
        day: 3,
        start: 660,
        end: 830,
        code: "FRA 1528 · A00",
      }),
    );
  });

  it("shows tutorial rooms as alternatives instead of simultaneous sections", () => {
    const tutorials = courseEvents.filter((event) => event.code === "SEG 2900 · A01");
    expect(tutorials).toHaveLength(1);
    expect(tutorials[0].locations).toHaveLength(3);
  });

  it("keeps the sample course meetings conflict-free each day", () => {
    for (let day = 0; day < 5; day += 1) {
      const dailyEvents = courseEvents
        .filter((event) => event.day === day)
        .sort((left, right) => left.start - right.start);
      for (let index = 1; index < dailyEvents.length; index += 1) {
        expect(dailyEvents[index].start).toBeGreaterThanOrEqual(
          dailyEvents[index - 1].end,
        );
      }
    }
  });
});

describe("localized product information", () => {
  it("explains the planned Premium price and unavailable checkout in both languages", () => {
    expect(messages.en.faqQuestions[1].answer).toContain("$10-per-month");
    expect(messages.en.faqQuestions[2].answer).toContain("not available");
    expect(messages.fr.faqQuestions[1].answer).toContain("10 $ par mois");
    expect(messages.fr.faqQuestions[2].answer).toContain("n’est pas disponible");
  });

  it("provides team challenge descriptions in both languages", () => {
    expect(messages.en.teamChallenges.length).toBeGreaterThan(0);
    expect(messages.fr.teamChallenges.length).toBe(messages.en.teamChallenges.length);
    expect(messages.en.teamChallenges.every((challenge) => challenge.text.length > 0)).toBe(true);
    expect(messages.fr.teamChallenges.every((challenge) => challenge.text.length > 0)).toBe(true);
  });

  it("provides five localized assistant answers", () => {
    expect(messages.en.assistantQuestions).toHaveLength(5);
    expect(messages.fr.assistantQuestions).toHaveLength(5);
    expect(messages.en.assistantQuestions.every(({ answer }) => answer.length > 0)).toBe(true);
    expect(messages.fr.assistantQuestions.every(({ answer }) => answer.length > 0)).toBe(true);
  });

  it("provides five localized feature explanations and welcome copy", () => {
    expect(messages.en.productFeatures).toHaveLength(5);
    expect(messages.fr.productFeatures).toHaveLength(5);
    expect(messages.en.productFeatures.every(({ title, detail }) => title && detail)).toBe(true);
    expect(messages.fr.productFeatures.every(({ title, detail }) => title && detail)).toBe(true);
    expect(messages.en.productFeatureAction).toBe("Learn more");
    expect(messages.fr.productFeatureAction).toBe("En savoir plus");
    expect(messages.en.productDialogClose).toBe("Close");
    expect(messages.fr.productDialogClose).toBe("Fermer");
    expect(messages.en.welcomeTitle).toContain("struggled");
    expect(messages.fr.welcomeTitle).toContain("horaire");
    expect(messages.en.welcomeAction.length).toBeGreaterThan(0);
    expect(messages.fr.welcomeAction.length).toBeGreaterThan(0);
  });

  it("uses a catchy localized headline for the schedule preview", () => {
    expect(messages.en.scheduleTitle).toBe("Your week, without the scheduling scramble.");
    expect(messages.fr.scheduleTitle).toBe("Votre semaine, sans casse-tête d’horaire.");
  });
});
