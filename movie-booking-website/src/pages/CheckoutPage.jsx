import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (!cardRegex.test(formData.card)) newErrors.card = "Card number must be 16 digits";
    if (!expiryRegex.test(formData.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format";
    } else {
      // Check expiry is not past
      const [mm, yy] = formData.expiry.split("/");
      const expiryDate = new Date(`20${yy}`, mm); // First day of next month
      const now = new Date();
      if (expiryDate < now) newErrors.expiry = "Card is expired";
    }
    if (!cvvRegex.test(formData.cvv)) newErrors.cvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/confirmed");
    }
  };

  return (
    <div className="checkout-wrapper">
      <header className="checkout-header">
        <button onClick={() => navigate(-1)} className="back-button">←</button>
        <h2>Checkout</h2>
      </header>

      <div className="checkout-main">
        <div className="checkout-left">
          <h3>Booking Summary</h3>
          <div className="movie-section">
            <img src={state?.poster} alt={state?.title} />
            <div>
              <h4>{state?.title}</h4>
              <p className="movie-tags">
                {state?.genre?.join(" ● ")} ● {state?.duration}
              </p>
            </div>
          </div>

          <div className="info-rows">
            <div className="info-row"><span>🎬 Cinema:</span><span>{state?.cinema}</span></div>
            <div className="info-row"><span>📅 Date:</span><span>{state?.date}</span></div>
            <div className="info-row"><span>⏰ Time:</span><span>{state?.time}</span></div>
            <div className="info-row"><span>👤 Seats:</span><span>{state?.seats?.join(", ")}</span></div>
          </div>

          <div className="total-row">
            <span>Total Amount</span>
            <span className="price">${state?.total}</span>
          </div>
        </div>

        <div className="checkout-right">
          <h3>Payment Details</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </label>

            <label>
              Email Address
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </label>

            <label>
              Card Number
              <input type="text" name="card" value={formData.card} onChange={handleChange} placeholder="1234 5678 9876 5432" />
              {errors.card && <p className="error-text">{errors.card}</p>}
            </label>

            <div className="form-row">
              <label>
                Expiry Date
                <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" />
                {errors.expiry && <p className="error-text">{errors.expiry}</p>}
              </label>
              <label>
                CVV
                <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" />
                {errors.cvv && <p className="error-text">{errors.cvv}</p>}
              </label>
            </div>

            <button type="submit" className="confirm-btn">Confirm</button>
            <p className="secure-text">Your payment information is secure and encrypted</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
