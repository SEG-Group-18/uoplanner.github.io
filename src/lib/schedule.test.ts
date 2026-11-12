import { describe, expect, it } from "vitest";
import { messages } from "./messages";
import { scheduleBlocks } from "./schedule";

describe("generic weekly schedule illustration", () => {
  it("uses unlabeled blocks without associating them with a course or major", () => {
    expect(scheduleBlocks).toHaveLength(12);
    for (const block of scheduleBlocks) {
      expect(Object.keys(block).sort()).toEqual(["day", "end", "start"]);
      expect(block.day).toBeGreaterThanOrEqual(0);
      expect(block.day).toBeLessThan(5);
      expect(block.start).toBeGreaterThanOrEqual(0);
      expect(block.end).toBeGreaterThan(block.start);
    }
  });

  it("keeps the placeholder blocks from overlapping within each day", () => {
    for (let day = 0; day < 5; day += 1) {
      const dailyBlocks = scheduleBlocks
        .filter((block) => block.day === day)
        .sort((left, right) => left.start - right.start);
      for (let index = 1; index < dailyBlocks.length; index += 1) {
        expect(dailyBlocks[index].start).toBeGreaterThanOrEqual(
          dailyBlocks[index - 1].end,
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
    expect(messages.en.assistantQuestions[1].answer).toContain("empty blocks");
    expect(messages.fr.assistantQuestions[1].answer).toContain("cases vides");
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
    expect(messages.en.scheduleBlocksNote).toContain("Empty blocks");
    expect(messages.fr.scheduleBlocksNote).toContain("cases vides");
  });
});
