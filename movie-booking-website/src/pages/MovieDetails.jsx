import React from "react";
import movies from "../data/movies";
import "./MovieDetails.css";

const MovieDetails = ({ movieId = 1 }) => {
  const movie = movies.find((m) => m.id === movieId);
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="movie-details">
      <div className="poster">
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div className="details">
        <h2>{movie.title}</h2>
        <p><strong>Genre:</strong> {movie.genre.join(", ")}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Description:</strong> {movie.description}</p>
        <p><strong>Duration:</strong> {movie.duration || "2h 30min"}</p>
        <button className="book-btn">Book Now</button>
      </div>
    </div>
  );
};

export default MovieDetails;