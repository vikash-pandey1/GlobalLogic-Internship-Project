import React, { useState } from "react";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const topics = [
    {
      question: "How do I book movie tickets?",
      answer:
        "Browse movies, select your preferred showtime, choose your seats, and proceed to payment. Once confirmed, your ticket will be emailed to you."
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, UPI, net banking, and popular e-wallets."
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule before the showtime depending on cinema policy. Refunds may take 5-7 business days."
    },
    {
      question: "Do I need to print my ticket?",
      answer:
        "No, you can show your e-ticket QR code on your phone at the cinema entrance."
    },
    {
      question: "Are there any discounts for students or senior citizens?",
      answer:
        "Yes, some cinemas offer special discounts. Check the details on the booking page."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-center">
      <input
        type="text"
        placeholder="Search for help..."
        className="help-search"
      />

      <div className="help-topics">
        {topics.map((item, index) => (
          <div
            key={index}
            className={`help-topic ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="help-question"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="help-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>

      <div className="help-contact">
        <h2>Need More Help?</h2>
        <p>
          Email us at <a href="mailto:support@cinespot.com">support@cinespot.com</a>
        </p>
        <p>
          Call us at <a href="tel:+911234567890">+91 12345 67890</a>
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
