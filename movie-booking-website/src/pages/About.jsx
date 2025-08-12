import React from "react";
import "./About.css";
import features from "../data/aboutData";

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-heading">Why Choose CineSpot</h1>
      <p className="about-subtext">
        We’re dedicated to making your movie experience seamless from booking to watching
      </p>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
