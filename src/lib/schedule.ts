export type ScheduleBlock = {
  day: number;
  start: number;
  end: number;
};

export const scheduleBlocks: ScheduleBlock[] = [
  { day: 0, start: 60, end: 150 },
  { day: 0, start: 300, end: 390 },
  { day: 1, start: 30, end: 120 },
  { day: 1, start: 360, end: 450 },
  { day: 1, start: 510, end: 600 },
  { day: 2, start: 60, end: 150 },
  { day: 2, start: 240, end: 360 },
  { day: 3, start: 120, end: 210 },
  { day: 3, start: 330, end: 420 },
  { day: 3, start: 480, end: 600 },
  { day: 4, start: 60, end: 150 },
  { day: 4, start: 360, end: 450 },
];
