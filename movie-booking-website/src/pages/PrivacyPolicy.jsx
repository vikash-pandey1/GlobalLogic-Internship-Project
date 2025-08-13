import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>Last updated: August 13, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          CineSpot respects your privacy and is committed to protecting your personal
          information. This policy explains how we collect, use, and safeguard your
          data when you use our services.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We collect information you provide during ticket booking such as your name,
          email, phone number, and payment details. We may also collect data about
          your interactions with our site.
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To process your ticket bookings</li>
          <li>To send booking confirmations and updates</li>
          <li>To improve our website and services</li>
          <li>To comply with legal requirements</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of Information</h2>
        <p>
          We do not sell your personal data. We may share necessary details with
          cinemas and payment processors to complete your booking.
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data from
          unauthorized access, disclosure, or misuse.
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. You may
          disable cookies in your browser settings, but some features may not work
          properly.
        </p>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal data. Contact
          us if you wish to exercise these rights.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          For any questions regarding this Privacy Policy, please email us at{" "}
          <a href="mailto:support@cinespot.com">support@cinespot.com</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
