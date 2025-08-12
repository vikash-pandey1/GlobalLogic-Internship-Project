import React from "react";
import "./Banner.css";
import bannerImg from "../assets/banner-bg.jpeg"
import {Link} from 'react-router-dom'

const Banner = () => {
  return (
    <section className="banner" style={{ backgroundImage: `url(${bannerImg})` }}>
      <div className="overlay"></div>
      <div className="banner-content">
        <h1>
          Book Your <span>Next</span>
          <br />
          Movie Night
        </h1>
        <p>
          Discover the latest releases and reserve your seats in seconds.
          <br />
          Experience cinema the way it’s meant to be.
        </p>
        <div className="banner-buttons">
          <Link to="/movies" className="browse-btn">
            Browse Movies →
          </Link>
          <Link to="/trailers" className="trailer-btn">
            Watch Trailers 🎬
          </Link>
        </div>
        
        <div className="icons">
          <div><i className="fas fa-star"></i> Top Rated Movies</div>
          <div><i className="fas fa-mobile-alt"></i> Mobile Tickets</div>
          <div><i className="fas fa-lock"></i> Secure Booking</div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
