import React, { useState } from "react";
import MovieCard from "../components/MovieCardUp";
import movies from "../data/upcomingMovies"; 
import "./CommingSoon.css";

const CommingSoon = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const moviesPerPage = 4;

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex < movies.length - moviesPerPage) {
      setStartIndex(startIndex + 1);
    }
  };

  const toggleSeeMore = () => {
    setShowAll(!showAll);
    setStartIndex(0);
  };

  const displayedMovies = showAll
    ? movies
    : movies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <section className="comming-soon">
      <div className="header-wrapper">
        <div className="text-content">
          <h2 className="now-title">Coming Soon</h2>
          <p className="now-subtitle">
            Be the first to know when these anticipated films hit the silver screen
          </p>
        </div>
        {!showAll && (
          <div className="now-scroll-buttons">
            <button onClick={handlePrev} disabled={startIndex === 0}>❮</button>
            <button onClick={handleNext} disabled={startIndex >= movies.length - moviesPerPage}>❯</button>
          </div>
        )}
      </div>

      <div className={`movie-grid-wrapper ${showAll ? "show-all" : ""}`}>
        <div className="movie-grid">
          {displayedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      <div className="see-more-wrapper">
        <button className="see-more" onClick={toggleSeeMore}>
          {showAll ? "Show Less" : "See More"}
        </button>
      </div>
    </section>
  );
};

export default CommingSoon;
