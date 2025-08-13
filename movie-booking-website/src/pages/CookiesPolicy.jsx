import React from "react";
import "./CookiesPolicy.css";

const CookiesPolicy = () => {
  return (
    <div className="cookies-container">
      <h1>Cookies Policy</h1>
      <p>Last updated: August 13, 2025</p>

      <section>
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit
          our website. They help us improve your browsing experience and provide
          personalized features.
        </p>
      </section>

      <section>
        <h2>2. How We Use Cookies</h2>
        <ul>
          <li>To remember your preferences</li>
          <li>To keep you signed in</li>
          <li>To analyze site traffic and performance</li>
          <li>To display relevant movie recommendations</li>
        </ul>
      </section>

      <section>
        <h2>3. Types of Cookies We Use</h2>
        <p>
          We use both session cookies (deleted when you close your browser) and
          persistent cookies (stored until they expire or are deleted).
        </p>
      </section>

      <section>
        <h2>4. Managing Cookies</h2>
        <p>
          You can control or delete cookies through your browser settings. However,
          disabling cookies may limit some features of our site.
        </p>
      </section>

      <section>
        <h2>5. Updates to This Policy</h2>
        <p>
          We may update this Cookies Policy from time to time. Any changes will be
          posted on this page with the updated date.
        </p>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          If you have questions about our Cookies Policy, please email{" "}
          <a href="mailto:support@cinespot.com">support@cinespot.com</a>.
        </p>
      </section>
    </div>
  );
};

export default CookiesPolicy;
