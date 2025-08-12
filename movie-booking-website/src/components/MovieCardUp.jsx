import React from "react";
import "./MovieCardUp.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/upcoming/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-info">
        <div className="title-rating">
          <h3>{movie.title}</h3>
          <span>⭐ {movie.rating}</span>
        </div>
        <p className="movie-release">📅 {movie.releaseDate}</p>

        <div className="genres">
          {(movie.genre || []).map((g, i) => (
            <span key={i}>{g}</span>
          ))}
        </div>

        <button className="book-btn" onClick={handleBooking}>Book Tickets</button>
      </div>
    </div>
  );
};

export default MovieCard;
