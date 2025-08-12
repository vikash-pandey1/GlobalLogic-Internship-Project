import React from "react";
import "./CinemaCard.css";

const CinemaCard = ({ cinema }) => {
  return (
    <div className="cinema-card">
      <h3>{cinema.name}</h3>
      <p>{cinema.location} - {cinema.zip || ""}</p>
      <div className="showtimes">
        {cinema.shows.map((time, idx) => (
          <span key={idx} className="showtime">{time}</span>
        ))}
      </div>
    </div>
  );
};

export default CinemaCard;
