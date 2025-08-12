import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SeatSelectionPage.css";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 12;
const vipRows = ["F", "G"];
const vipPrice = 18;

const occupiedSeats = ["A4", "A5", "B6", "C7", "D8"];

const SeatSelectionPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (occupiedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const getPrice = (seat) => {
  const isVIP = vipRows.includes(seat.charAt(0));
  const normalPrice = Number(state?.price) || 10; 
  return isVIP ? vipPrice : normalPrice;
};


const total = selectedSeats.reduce((sum, seat) => sum + getPrice(seat), 0);

const handlePay = () => {
  console.log("click")
  navigate("/checkout", {
    state: {
      title: state.movieTitle,
      poster: state.poster,
      genre: state.genre,
      duration: state.duration,
      cinema: state.cinema,
      date: state.date,
      time: state.time,
      seats: selectedSeats,
      total: total

    }
  });
};


  return (
    <div className="seats-container">
      <div className="seats-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <div>
          <h2>Select Your Seats</h2>
          <div className="meta">
            <span>{state.cinema}</span>
            <span className="dot" />
            <span>{state.date}</span>
            <span className="dot" />
            <span>{state.duration}</span>
          </div>
        </div>
      </div>

      <div className="screen">Screen</div>

      <div className="seats-grid">
        {rows.map((row) => (
          <div key={row} className="row">
            <span className="row-label">{row}</span>
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seat = `${row}${i + 1}`;
              const isVIP = vipRows.includes(row);
              const isOccupied = occupiedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              return (
                <div
                  key={seat}
                  className={`seat ${isVIP ? "vip" : ""} ${isOccupied ? "occupied" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleSeat(seat)}
                />
              );
            })}
            <span className="row-label">{row}</span>
          </div>
        ))}
      </div>

      <div className="legend">
        <div><span className="box available" /> Available</div>
        <div><span className="box selected" /> Selected</div>
        <div><span className="box occupied" /> Occupied</div>
        <div><span className="box vip" /> VIP (${vipPrice})</div>
      </div>

      <div className="checkout">
        <div className="checkout-header">
          <span>👤 Selected Seats</span>
          <span>{selectedSeats.length} Seat(s)</span>
        </div>

        <div className="checkout-seats">
          {selectedSeats.map((seat) => (
            <span className="seat-pill" key={seat}>{seat}</span>
          ))}
        </div>

        <div className="checkout-total">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <button className="pay-button" onClick={handlePay}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
