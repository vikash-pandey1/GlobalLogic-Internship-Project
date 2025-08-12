import React, { useState } from "react";
import "./Feedback.css";
import testimonials from '../data/Feedback'

const Feedback = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex < testimonials.length - 3) setStartIndex(startIndex + 1);
  };

  return (
    <div className="feedback-section">
      <h2 className="feedback-title">What Our Users Say</h2>
      <div className="slider-wrapper">
        <div className="feedback-cards-container">
          {testimonials.slice(startIndex, startIndex + 3).map((item, index) => (
            <div className="feedback-card" key={index}>
              <img src={item.image} alt={item.name} className="user-image" />
              <div className="user-info">
                <h3 className="user-name">{item.name}</h3>
                <div className="stars">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="feedback-text">"{item.text}"</p>
              </div>
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <button onClick={handlePrev} disabled={startIndex === 0}>❮</button>
          <button onClick={handleNext} disabled={startIndex >= testimonials.length - 3}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
