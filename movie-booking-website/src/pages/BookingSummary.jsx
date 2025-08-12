import React from "react";
import "./BookingSummary.css";

const BookingSummary = () => {
  const summary = {
    movie: "Oppenheimer",
    cinema: "Mega Cineplex",
    time: "7:30 PM",
    seats: ["R2S2", "R2S3"],
    pricePerSeat: 14
  };

  const total = summary.seats.length * summary.pricePerSeat;

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>
      <p><strong>Movie:</strong> {summary.movie}</p>
      <p><strong>Cinema:</strong> {summary.cinema}</p>
      <p><strong>Showtime:</strong> {summary.time}</p>
      <p><strong>Seats:</strong> {summary.seats.join(", ")}</p>
      <p><strong>Total Price:</strong> ${total}</p>
      <button className="confirm-button">Confirm Booking</button>
    </div>
  );
};

export default BookingSummary;