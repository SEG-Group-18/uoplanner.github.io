export type CourseEvent = {
  day: number;
  start: number;
  end: number;
  code: string;
  kind: "lecture" | "lab" | "discussion" | "tutorial";
  room: string;
  locations?: string[];
};

export const courseEvents: CourseEvent[] = [
  { day: 0, start: 120, end: 200, code: "MAT 1720 · B00", kind: "lecture", room: "Virtual Building · VIRT" },
  { day: 1, start: 30, end: 110, code: "PHY 1721 · A00", kind: "lecture", room: "Learning Crossroads · C140" },
  { day: 1, start: 390, end: 470, code: "ITI 1520 · B00", kind: "lecture", room: "SITE · B0138" },
  { day: 1, start: 660, end: 740, code: "SEG 2900 · A00", kind: "lecture", room: "Learning Crossroads · C442" },
  {
    day: 1,
    start: 750,
    end: 830,
    code: "SEG 2900 · A01",
    kind: "tutorial",
    room: "Choose one location",
    locations: ["Learning Crossroads · C442", "SITE · J0106", "SITE · C0136"],
  },
  { day: 2, start: 30, end: 110, code: "MAT 1720 · B00", kind: "lecture", room: "Virtual Building · VIRT" },
  { day: 2, start: 210, end: 380, code: "ITI 1520 · B02", kind: "lab", room: "SITE · 2060" },
  { day: 3, start: 300, end: 380, code: "SEG 2900 · A00", kind: "lecture", room: "Learning Crossroads · C442" },
  { day: 3, start: 570, end: 650, code: "MAT 1720 · B04", kind: "discussion", room: "SITE · J0106" },
  { day: 3, start: 660, end: 830, code: "FRA 1528 · A00", kind: "lecture", room: "Social Science Building · 2005" },
  { day: 4, start: 120, end: 200, code: "PHY 1721 · A00", kind: "lecture", room: "Learning Crossroads · C140" },
  { day: 4, start: 480, end: 560, code: "ITI 1520 · B00", kind: "lecture", room: "SITE · B0138" },
];

export function formatScheduleTime(minutesAfterEight: number) {
  const total = minutesAfterEight + 8 * 60;
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}
