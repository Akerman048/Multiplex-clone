export type WeekDays =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type MovieSchedule = Record<WeekDays, string[]>;
