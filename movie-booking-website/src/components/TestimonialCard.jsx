import React from "react";
import "./TestimonialCard.css";

const TestimonialCard = ({ user, quote }) => {
  return (
    <div className="testimonial-card">
      <p className="quote">"{quote}"</p>
      <p className="user">- {user}</p>
    </div>
  );
};

export default TestimonialCard;