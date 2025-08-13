import React from "react";
import "./TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>
      <p>Last updated: August 13, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to CineSpot! By accessing or using our website and services, you
          agree to comply with and be bound by these Terms of Service. Please
          read them carefully before booking tickets.
        </p>
      </section>

      <section>
        <h2>2. Ticket Booking</h2>
        <p>
          All bookings made through CineSpot are subject to seat availability and
          cinema confirmation. Once payment is processed, tickets will be sent to
          your registered email.
        </p>
      </section>

      <section>
        <h2>3. Payments</h2>
        <p>
          We accept major debit/credit cards, UPI, and wallet payments. All
          transactions are processed securely. CineSpot is not responsible for
          delays caused by payment gateways.
        </p>
      </section>

      <section>
        <h2>4. Cancellations & Refunds</h2>
        <p>
          Cancellation policies vary depending on the cinema. Refunds, if
          applicable, will be processed within 5-7 business days.
        </p>
      </section>

      <section>
        <h2>5. User Responsibilities</h2>
        <p>
          You agree to provide accurate information when booking tickets and to
          follow cinema rules during the movie screening.
        </p>
      </section>

      <section>
        <h2>6. Changes to Terms</h2>
        <p>
          CineSpot reserves the right to update these terms at any time. We will
          notify users of significant changes via email or website notices.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          For any questions, email us at{" "}
          <a href="mailto:support@cinespot.com">support@cinespot.com</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
