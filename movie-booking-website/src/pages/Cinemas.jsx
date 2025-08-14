import React, { useState } from "react";
import CinemaCard from "../components/CinemaCard";
import cinemas from "../data/cinemas";
import "./Cinemas.css";

const Cinemas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCinemas, setFilteredCinemas] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    setHasSearched(true);
    setError("");

    if (!term) {
      setFilteredCinemas([]);
      setError("Please enter a city or use current location.");
      return;
    }

    const results = cinemas.filter((cinema) =>
      cinema.location.toLowerCase() === term
    );

    if (results.length === 0) {
      setError("No cinemas found for the entered location.");
    }

    setFilteredCinemas(results);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }

    setHasSearched(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.county ||
            "";

          if (!city) {
            setError("Could not detect your city.");
            setFilteredCinemas([]);
            return;
          }

          const lowerCity = city.toLowerCase();
          setSearchTerm(city); // autofill input field

          const results = cinemas.filter(
            (cinema) => cinema.location.toLowerCase() === lowerCity
          );

          if (results.length === 0) {
            setError("No cinemas found for your current location.");
          }

          setFilteredCinemas(results);
        } catch (e) {
          alert("Failed to fetch location details.");
        }
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  const handleShowAllCinemas = () => {
    setHasSearched(true);
    setError("");

    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setFilteredCinemas([]);
      setError("Please enter a city or use current location.");
      return;
    }

    const matches = cinemas.filter(
      (cinema) => cinema.location.toLowerCase() === term
    );

    if (matches.length === 0) {
      setError("No cinemas found for the entered location.");
    }

    setFilteredCinemas(matches);
  };

  return (
    <div className="cinemas-page">
      <h1 className="cinemas-heading">Find Cinemas Near You</h1>
      <p className="cinemas-subtext">
        Enter your location to discover the closest theaters showing your favorite movies
      </p>

      <div className="cinema-search-section">
        <input
          type="text"
          placeholder="Enter City"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="cinema-search-inpu"
        />
        <button onClick={handleSearch} className="search-icon">🔍</button>
      </div>

      <div className="cinema-action-buttons">
        <button onClick={handleUseCurrentLocation} className="location-btn">
          Use current location
        </button>
        <button onClick={handleShowAllCinemas} className="show-all-btn">
          Show all cinemas
        </button>
      </div>

      <div className="cinema-grid">
        {filteredCinemas.length > 0 ? (
          filteredCinemas.map((cinema) => (
            <CinemaCard key={cinema.id} cinema={cinema} />
          ))
        ) : (
          hasSearched && error && (
            <p className="no-results">{error}</p>
          )
        )}
      </div>
    </div>
  );
};

export default Cinemas;
