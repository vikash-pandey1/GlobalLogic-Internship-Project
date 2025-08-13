import React from "react";
import "./FAQs.css";

const FAQs = () => {
  const faqData = [
    {
      question: "How do I book movie tickets?",
      answer:
        "Simply browse our Now Playing section, select your movie, choose a cinema and showtime, then proceed to book your tickets."
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Cancellations are allowed up to 1 hour before the showtime. Refunds will be processed to your original payment method within 3-5 business days."
    },
    {
      question: "Do I need to create an account to book?",
      answer:
        "No, you can book tickets without creating an account. However, signing up gives you access to exclusive offers and faster booking."
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, UPI, net banking, and various e-wallets for your convenience."
    },
    {
      question: "Are there any extra charges for online booking?",
      answer:
        "A minimal convenience fee is charged for online bookings to maintain our service and technology."
    },
    {
      question: "Can I choose my own seats?",
      answer:
        "Yes, you can choose your preferred seats during the booking process."
    },
    {
      question: "Do you offer student or senior discounts?",
      answer:
        "Yes, selected cinemas offer special discounts for students and senior citizens. Please carry a valid ID."
    },
    {
      question: "Is there a mobile app for booking?",
      answer:
        "Yes, our mobile app is available for both Android and iOS for an even smoother booking experience."
    }
  ];

  return (
    <div className="faqs-container">
      <h1 className="faqs-heading">Frequently Asked Questions</h1>
      <div className="faqs-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
