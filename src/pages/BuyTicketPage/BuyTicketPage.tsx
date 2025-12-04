import { useSearchParams, useParams, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

import s from "./BuyTicketPage.module.css";
import { movies } from "../../data/movies";
import { WeekDays } from "../../types/schedule";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { IoCalendarOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { useState } from "react";
import PurchaseForm from "../../components/PurchaseForm/PurchaseForm";

export const BuyTicketPage = () => {
  const weekDays: WeekDays[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const navigate = useNavigate();

  const [purchaseFormToggle, setPurchaseFormToggle] = useState(false);

  function isWeekDay(value: string): value is WeekDays {
    return weekDays.includes(value as WeekDays);
  }

  const { id } = useParams();
  const movieId = Number(id);

  const movie = movies.find((m) => m.id === movieId);
  const [searchParams] = useSearchParams();

  const rawDay = searchParams.get("day");
  const time = searchParams.get("time");

  const day = rawDay && isWeekDay(rawDay) ? rawDay : null;

  function toggleSeat(index: number) {
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((n) => n !== index) : [...prev, index]
    );
  }

  if (!movie) {
    return <div className={s.pageWrap}>Movie not found</div>;
  }
  return (
    <div className={s.pageWrap}>
      <div>
        <div className={s.nav}>
          <Link className={s.logolink} to='/'>
            <img src={logo} alt='Logo' />
          </Link>
          <button className={s.backBtn} onClick={()=> navigate(-1)}>
            {" "}
            <IoArrowBackCircleOutline />
            Back
          </button>
        </div>
        <div className={s.movieInfoWrap}>
          {" "}
          <img src={movie.image} alt={movie.title} className={s.poster} />
          <div className={s.movieInfoSchedule}>
            <h2>{movie.title}</h2>
            <div className={s.dateNtime}>
              {" "}
              <div className={s.sessionCard}>
                <div className={s.sessionCardIcon}>
                  <IoCalendarOutline />
                </div>

                <div className={s.sessionCardContent}>
                  <span className={s.sessionCardLabel}>Day</span>
                  <span className={s.sessionCardValue}>{day}</span>
                </div>
              </div>
              <div className={s.sessionCard}>
                <div className={s.sessionCardIcon}>
                  <MdAccessTime />
                </div>

                <div className={s.sessionCardContent}>
                  <span className={s.sessionCardLabel}>Time</span>
                  <span className={s.sessionCardValue}>{time}</span>
                </div>
              </div>
            </div>
            <p className={s.descr}>{movie.description}</p>
          </div>
        </div>
        <div className={s.screenWrap}>
          <div className={s.seatPriceWrap}>
            <button className={`${s.seat}  ${s.selected}`}></button>
            <span>{movie.price}€</span>
          </div>
          <div className={s.screenLine}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 806 21'
              fill='#b1b0b0'
            >
              <path d='M3.2,20l-2,0.2l-0.3-4l2-0.2C136.2,5.3,269.6,0,403,0s266.8,5.3,400.2,16l2,0.2l-0.3,4l-2-0.2 C669.5,9.3,536.3,4,403,4S136.4,9.3,3.2,20z'></path>
            </svg>
            <p className={s.screenLabel}>SCREEN</p>
          </div>

          <div className={s.seats}>
            {Array.from({ length: 50 }, (_, i) => {
              const isSelected = selectedSeats.includes(i);

              return (
                <button
                  key={i}
                  className={`${s.seat} ${isSelected ? s.selected : ""}`}
                  onClick={() => toggleSeat(i)}
                  disabled={i === 10 || i === 11}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className={s.form}>
        <div className={s.selectedSeatsWrap}>
          <h3 className={s.selectedSeatsTitle}>Tickets</h3>
          {selectedSeats.map((seat) => (
            <div className={s.selectedSeat} key={seat}>
              Seat {seat + 1}{" "}
              <span className={s.ticketPrice}>{movie.price}€</span>
              <IoIosCloseCircleOutline
                onClick={() =>
                  setSelectedSeats(selectedSeats.filter((s) => s !== seat))
                }
                className={s.removeSeat}
              />
            </div>
          ))}
        </div>
        <div>
          <div className={s.totalPriceWrap}>
            Total payable: <span>{movie.price * selectedSeats.length}€</span>
          </div>
          <button
            onClick={() => setPurchaseFormToggle((prev) => !prev)}
            className={s.buyBtn}
          >
            Buy
          </button>
        </div>
      </div>
      {purchaseFormToggle && selectedSeats.length > 0 && (
        <div className={s.purchaseFormModal}>
          <IoIosCloseCircleOutline onClick={()=> setPurchaseFormToggle(prev => !prev)} className={s.purchaseFormClose} />
          <span className={s.purchaseFormWrap}><PurchaseForm /></span>
        </div>
      )}
    </div>
  );
};
