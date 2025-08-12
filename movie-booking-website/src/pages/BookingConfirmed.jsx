import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookingConfirmed.css";

const BookingConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-card">
        <div className="checkmark-icon">
          <span>✔</span>
        </div>
        <h2>
          Your Booking has been <span className="highlight">confirmed</span>
        </h2>
        <button className="view-btn" onClick={() => navigate("/")}>
          View Your Booking
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmed;
