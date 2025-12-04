import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movies } from "../../data/movies";
import s from "./MovieDetails.module.css";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MovieSchedule } from "../../components/MovieSchedule/MovieSchedule";
import { IoCloseCircle } from "react-icons/io5";
import { Movie } from "../../types/movie";

interface MovieDetailsProps {
  movies: Movie[];
}

const getRandomMoviesByGenre = (currentMovie: Movie, count: number) => {
  const filteredMovies = movies.filter((movie) => {
    return (
      movie.id !== currentMovie.id &&
      movie.released &&
      movie.genre.some((genre) => currentMovie.genre.includes(genre))
    );
  });

  const shuffledMovies = filteredMovies.sort(() => Math.random() - 0.5);

  return shuffledMovies.slice(0, count);
};

export const MovieDetails: FC<MovieDetailsProps> = ({ movies }) => {
  const [toggletrailer, setToggleTrailer] = useState(false);

  useEffect(() => {}, [toggletrailer]);

  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className={s.movieDetails}>Movie not found!</div>;
  }

  const movie = movies.find((movie) => movie.id === parseInt(id));
  if (!movie) {
    return <div>Movie not found!</div>;
  }

  const recommendedMovies = getRandomMoviesByGenre(movie, 4);

  return (
    <div>
      <div className={s.movieDetails}>
        <div className={s.movieDetailsColumn1}>
          <div className={s.imgWrap}>
            <img src={movie.image} />
            <span className={s.ratingSign}>{movie.rating}+</span>
          </div>
          <button
            onClick={() => setToggleTrailer(true)}
            className={s.trailerBtn}
          >
            <FaPlay className={s.playIcon} />
            Watch trailer
          </button>
        </div>
        <div className={s.movieDetailsColumn2}>
          <h1 className={s.movieTitle}>{movie.title}</h1>
          <ul className={s.details}>
            <li>
              <p className={s.key}>Rating</p>
              <p className={s.value}>{movie.rating}+</p>
            </li>
            <li>
              <p className={s.key}>Year</p>
              <p className={s.value}>{movie.year}</p>
            </li>
            {movie.released && (
              <>
                <li>
                  <p className={s.key}>Viewer rating</p>
                  <p className={s.value}>{movie["viewer rating"]}</p>
                </li>
                <li>
                  <p className={s.key}>Critics rating</p>
                  <p className={s.value}>{movie["criics rating"]}</p>
                </li>
              </>
            )}

            <li>
              <p className={s.key}>Director</p>
              <p className={s.value}>{movie.director}</p>
            </li>
            <li>
              <p className={s.key}>Genre</p>
              <p className={s.value}>
                {movie.genre.map((el: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => {
                  return (
                    <>
                      <Link className={s.genreLink} to='/genre'>
                        {el}
                      </Link>
                      ,&nbsp;
                    </>
                  );
                })}
              </p>
            </li>
            <li>
              <p className={s.key}>Duration</p>
              <p className={s.value}>{movie.duration}</p>
            </li>
            <li>
              <p className={s.key}>Producer</p>
              <p className={s.value}>{movie.producer}</p>
            </li>
            <li>
              <p className={s.key}>Starring</p>
              <p className={s.value}>{movie.starring}</p>
            </li>
          </ul>
          <div className={s.descr}>{movie.description}</div>
          <div className={s.watchAlso}>
            {recommendedMovies.length > 0 && <h3>Watch also:</h3>}
            <div className={s.recommendedMovies}>
              {recommendedMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`}>
                  <div key={movie.id} className='movie-card'>
                    <img
                      className={s.recommendedMoviesIMG}
                      src={movie.image}
                      alt={movie.title}
                    />
                    <p className={s.watchAlsotitle}>{movie.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={s.movieDetailsColumn3}>
          <MovieSchedule movie={movie} />
        </div>
        {toggletrailer && (
          <div className={s.trailer}>
            <div className={s.trailerHeader}>
              <p>Trailer: {movie.title}</p>
              <div
                onClick={() => setToggleTrailer(false)}
                className={s.closeTrailer}
              >
                Close <IoCloseCircle className={s.closeIcon} />
              </div>
            </div>
            <iframe
              width='100%'
              height='100%'
              src={movie.trailer}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
