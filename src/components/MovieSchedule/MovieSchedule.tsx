import { FC, useState } from "react";
import s from "./MovieSchedule.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { Movie } from "../../types/movie";

interface MovieScheduleProps {
  movie: Movie;
}

const daysOfWeeks = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const MovieSchedule: FC<MovieScheduleProps> = ({ movie }) => {
  const currentDayIndex = new Date().getDay();
  const initialDay =
    currentDayIndex == 0 ? "sunday" : daysOfWeeks[currentDayIndex - 1];
  console.log(initialDay);

  const [dateSelect, setDateSelect] = useState(initialDay);
  const [chosenDay, setChosenDay] = useState(initialDay);
  const [showDaysOfWeek, setShowDaysOfWeek] = useState(false);

  return (
    <div className={s.schedule}>
      <div className={s.date}>
        <h2 className={s.heading}>Session schedule </h2>
        <div className={s.daysWrap}>
          <button
            onClick={() => setShowDaysOfWeek((prev) => !prev)}
            className={s.selectScheduleDate}
          >
            {Object.entries(movie.schedule)
              .filter(([day]) => day === chosenDay)
              .map(([day]) => {
                return (
                  <div key={day}>
                    {day == dateSelect && day == chosenDay
                      ? `Today (${initialDay})`
                      : day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                );
              })}
            <IoIosArrowDown className={s.arrowOpen} />
          </button>

          {showDaysOfWeek && (
            <div className={s.dropDown}>
              {Object.entries(movie.schedule).map(([day]) => {
                return (
                  <button
                    className={
                      day === chosenDay ? `${s.days} ${s.activeDay}` : s.days
                    }
                    onClick={() => {
                      setChosenDay(day);
                      setShowDaysOfWeek(false);
                    }}
                    key={day}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className={s.scheduleBody}>
        {Object.entries(movie.schedule)
          .filter(([day]) => day === chosenDay)
          .map(([day, times]) => {
            return (
              <div key={day} className={s.timesRow}>
                {(times as string[]).map((time: string) => (
                  <Link
                    key={time}
                    to={`/movie/${movie.id}/buy?day=${day}&time=${time}`}
                    className={s.timeLink}
                  >
                    {time}
                  </Link>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
};
