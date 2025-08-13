import React from "react";
import "./Banner.css";
import bannerImg from "../assets/banner-bg.jpeg";

const Banner = () => {
  const handleOpenLink = (url) => {
    if (url) {
      window.open(url, "_blank"); // Open in a new tab
    }
  };

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
          <button
            className="browse-btn"
            onClick={() => handleOpenLink("https://www.imdb.com/movies-in-theaters/")}
          >
            Browse Movies →
          </button>
          <button
            className="trailer-btn"
            onClick={() => handleOpenLink("https://www.youtube.com/results?search_query=movie+trailers")}
          >
            Watch Trailers 🎬
          </button>
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
