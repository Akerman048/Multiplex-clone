import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { movies } from "../../data/movies";
import { IoMdInformation } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import soldOut from "../../assets/images/soldout.png";

import s from "./PostersList.module.css";
import { MovieSchedule, WeekDays } from "../../types/schedule";

export const PostersList = () => {
  const postersListRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef(0);

  const weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;

  type DayToShow = WeekDays | "today";

  const [dayByMovie, setDayByMovie] = useState<Record<number, DayToShow>>({});

  const now = new Date();
  const todayIndex = now.getDay();
  const todayKey = weekDays[now.getDay()];

  function getNextDayWithSession(schedule: MovieSchedule): WeekDays | null {
    for (let i = 1; i <= 7; i++) {
      const nextIndex = (todayIndex + i) % 7;
      const dayKey = weekDays[nextIndex];

      if (schedule[dayKey] && schedule[dayKey].length > 0) {
        return dayKey;
      }
    }

    return null;
  }

  function capitalize(str: string | null): string {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
  }

  // Which trailer is currently open
  const [activeTrailer, setActiveTrailer] = useState<null | {
    title: string;
    url: string;
  }>(null);

  // width calculation
  useEffect(() => {
    if (!postersListRef.current) return;
    const item = postersListRef.current.querySelector(`.${s.linkWrap}`) as HTMLDivElement | null;
    itemWidthRef.current = item?.getBoundingClientRect().width || 0;
  }, []);
  
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!postersListRef.current || !itemWidthRef.current) return;
  
    const direction = e.deltaY > 0 ? 1 : -1; // вниз – вправо, вгору – вліво
  
    postersListRef.current.scrollTo({
      left: postersListRef.current.scrollLeft + direction * itemWidthRef.current,
      behavior: "smooth",
    });
  };
  return (
    <div className={s.postersList} ref={postersListRef} onWheel={handleWheel}>
      {movies.map((movie) => {
        const todaySchedule = movie.schedule[todayKey] || [];
        const nextDayKey = getNextDayWithSession(movie.schedule);

        // sessions today that haven't expired yet
        const upcomingToday = todaySchedule.filter((timeStr) => {
          const [h, m] = timeStr.split(":").map(Number);
          const showTime = new Date();
          showTime.setHours(h, m, 0, 0);
          return showTime.getTime() > now.getTime();
        });

        // what day we are  currently showing for a SPECIFIC movie
        const currentDay: DayToShow = dayByMovie[movie.id] ?? "today";

        const scheduleForCurrentDay =
          currentDay === "today"
            ? upcomingToday
            : movie.schedule[currentDay] || [];

        const hasSchedule = Object.values(movie.schedule).some(
          (day) => day.length > 0
        );
        if (!hasSchedule) return null;

        // що за день насправді (ключ із schedule)
        const scheduleDayKey: WeekDays =
          currentDay === "today" ? todayKey : currentDay;

        return (
          <div
            key={movie.id}
            className={s.linkWrap}
            style={{ backgroundImage: `url(${movie.image})` }}
          >
            <Link
              to={`/movie/${movie.id}`}
              className={s.openMovieMobile}
              aria-label={`Open ${movie.title} page`}
            />
            {/* movie details */}
            <div className={s.movieDetailsWrap}>
              {/* info & trailer btns */}
              <div className={s.infoNtrailer}>
                {/* btn info */}
                <Link to={`/movie/${movie.id}`} className={s.infoNtrailerItem}>
                  <IoMdInformation className={s.detailsIcon} />
                  <span>More details about the movie</span>
                </Link>

                {/* btn "Watch trailer" */}
                <button
                  type='button'
                  className={s.infoNtrailerItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTrailer({
                      title: movie.title,
                      url: movie.trailer,
                    });
                  }}
                >
                  <IoIosPlay className={s.detailsIcon} />
                  <span>Watch trailer</span>
                </button>
              </div>
              {/* next session condition */}
              {/* schedule block */}
              {currentDay === "today" && upcomingToday.length === 0 ? (
                // ❌ There are no more sessions today
                <>
                  <p className={s.noMoreSessions}>
                    Sorry, no more sessions for today
                  </p>
                  <div>
                    <img src={soldOut} />
                  </div>
                  <p className={s.closestSession}>Closest sessions</p>

                  {nextDayKey && (
                    <button
                      className={s.tomorrowLink}
                      onClick={() => {
                        // when clicked, we switch the day for this movie
                        setDayByMovie((prev) => ({
                          ...prev,
                          [movie.id]: nextDayKey,
                        }));
                      }}
                    >
                      {capitalize(nextDayKey)}
                    </button>
                  )}
                </>
              ) : (
                // ✅ showing the schedule for the current day (today або nextDayKey)
                <>
                  <p className={s.currentDay}>
                    {currentDay === "today" ? "Today" : capitalize(currentDay)}
                  </p>
                  <p className={s.ClosestSession}>Closest session</p>
                  <div className={s.buyTicketForTodayWrap}>
                    <div className={s.sessionTime}>
                      <span className={s.time}>{scheduleForCurrentDay[0]}</span>
                      <span className={s.hall}>SDH</span>
                    </div>

                    <Link
                      to={`/movie/${movie.id}/buy?day=${scheduleDayKey}&time=${scheduleForCurrentDay[0]}`}
                      className={s.buyTicketBtn}
                    >
                      <span className={s.buyMain}>BUY TICKET</span>
                      <span className={s.buyPrice}>FROM {movie.price}€</span>
                    </Link>
                  </div>

                  <p className={s.SessionSchedule}>Session schedule</p>

                  <div className={s.scheduleListWrap}>
                    <div className={s.scheduleList}>
                      {scheduleForCurrentDay.map((time) => (
                        <Link
                          to={`/movie/${movie.id}/buy?day=${scheduleDayKey}&time=${time}`}
                          key={time}
                        >
                          {time}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* movie title */}
            <div className={s.movieTitle}>{movie.title}</div>
          </div>
        );
      })}

      {/* separeted overlay for trailer  */}
      {activeTrailer && (
        <div className={s.trailer}>
          <div className={s.trailerHeader}>
            <p>Trailer: {activeTrailer.title}</p>
            <button
              type='button'
              onClick={() => setActiveTrailer(null)}
              className={s.closeTrailer}
            >
              Close <IoCloseCircle className={s.closeIcon} />
            </button>
          </div>
          <iframe
            width='100%'
            height='100%'
            src={activeTrailer.url}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};
