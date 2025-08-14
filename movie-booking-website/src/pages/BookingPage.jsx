import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import nowMovies from "../data/nowMovies";
import upcomingMovies from "../data/upcomingMovies";
import cinemas from "../data/cinemas";
import "./BookingPage.css";

const LOCAL_KEY = "bookingSelection";

const saveWithExpiry = (data) => {
  const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
  const item = { data, expiry };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(item));
};

const loadIfNotExpired = () => {
  const itemStr = localStorage.getItem(LOCAL_KEY);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (now > item.expiry) {
      localStorage.removeItem(LOCAL_KEY);
      return null;
    }
    return item.data;
  } catch {
    return null;
  }
};

const BookingPage = () => {
  const { category, movieId } = useParams();
  const allMovies = category === "nowplaying" ? nowMovies : upcomingMovies;
  const movie = allMovies.find((m) => m.id.toString() === movieId);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [cinemaSearch, setCinemaSearch] = useState("");
  const [cinemaDropdownOpen, setCinemaDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Filter cinemas based on search
  const filteredCinemas = cinemas.filter((c) =>
    c.name.toLowerCase().includes(cinemaSearch.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCinemaDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load saved state
  useEffect(() => {
    const saved = loadIfNotExpired();
    if (saved) {
      if (saved.date) setSelectedDate(new Date(saved.date));
      if (saved.cinema) setSelectedCinema(saved.cinema);
      if (saved.showtime) setSelectedShowtime(saved.showtime);
    }
  }, []);

  // Save state
  useEffect(() => {
    saveWithExpiry({
      date: selectedDate,
      cinema: selectedCinema,
      showtime: selectedShowtime,
    });
  }, [selectedDate, selectedCinema, selectedShowtime]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const showtimes = ["2:30 PM", "4:45 PM", "7:30 PM", "10:30 PM"];

  const handleBooking = () => {
    if (!selectedCinema || !selectedShowtime) {
      alert("Please select a cinema and showtime.");
      return;
    }

    navigate("/seats", {
      state: {
        movieTitle: movie.title,
        poster: movie.poster,
        genre: movie.genre,
        duration: movie.duration,
        cinema: selectedCinema,
        date: selectedDate.toLocaleDateString(),
        time: selectedShowtime,
        price: movie.price,
      },
    });
  };

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="booking-wrapper">
      <div className="top-info">
        <button className="back-btn" onClick={() => window.history.back()}>
          &larr;
        </button>
        <div>
          <div className="top-meta">
            <h1>{movie.title}</h1>
            <span className="star">⭐ {movie.rating}</span>
            <span className="price">/ {movie.price}</span>
          </div>
          <div className="genres-time">
            {movie.genre?.map((genre, i) => (
              <span key={i} className="genre-tag">
                {genre}
              </span>
            ))}
            <span className="dot">•</span>
            <span className="duration">{movie.duration}</span>
          </div>
        </div>
      </div>

      <div className="booking-main">
        <img src={movie.poster} alt={movie.title} className="booking-poster" />

        <div className="booking-options">
          <div className="date-selector">
            {days.map((day, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(day)}
                className={`date-btn ${
                  day.toDateString() === selectedDate.toDateString()
                    ? "active"
                    : ""
                }`}
              >
                {day.toLocaleDateString("en-US", { weekday: "short" })}
                <br />
                {day.getDate()}
              </button>
            ))}
          </div>

          {/* Custom searchable dropdown */}
          <div className="dropdown-group" ref={dropdownRef}>
            <label>
              <span role="img" aria-label="location">
                📍
              </span>{" "}
              Select Cinema
            </label>
            <div
              className="custom-select"
              onClick={() => setCinemaDropdownOpen((prev) => !prev)}
            >
              {selectedCinema || "-- Select --"}
              <span className="arrow">{cinemaDropdownOpen ? "▲" : "▼"}</span>
            </div>

            {cinemaDropdownOpen && (
              <div className="dropdown-menu">
                <input
                  type="text"
                  placeholder="Search cinema..."
                  value={cinemaSearch}
                  onChange={(e) => setCinemaSearch(e.target.value)}
                  className="cinema-search-input"
                  onClick={(e) => e.stopPropagation()}
                />
                <ul className="dropdown-list">
                  {filteredCinemas.length > 0 ? (
                    filteredCinemas.map((cinema) => (
                      <li
                        key={cinema.id}
                        onClick={() => {
                          setSelectedCinema(cinema.name);
                          setCinemaDropdownOpen(false);
                        }}
                      >
                        {cinema.name}
                      </li>
                    ))
                  ) : (
                    <li className="no-results">No cinemas found</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="dropdown-group">
            <label>
              <span role="img" aria-label="clock">
                ⏰
              </span>{" "}
              Select Showtime
            </label>
            <div className="showtimes">
              {showtimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedShowtime(time)}
                  className={`time-btn ${
                    selectedShowtime === time ? "active" : ""
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button className="continue-btn" onClick={handleBooking}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
