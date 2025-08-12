import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ComingSoon from "./pages/CommingSoon";
import Cinemas from "./pages/Cinemas";
import About from "./pages/About";
import Movies from "./pages/Movies";
import Trailers from "./pages/Trailers";
import BookingPage from "./pages/BookingPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import CheckoutPage from "./pages/CheckoutPage";
import BookingConfirmed from "./pages/BookingConfirmed";
import Signup from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coming-soon" element={<ComingSoon />}/>
        <Route path="/cinemas" element={<Cinemas />}/>
        <Route path="/about" element={<About />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/trailers" element={<Trailers />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking/:category/:movieId" element={<BookingPage />}/>
        <Route path="/seats" element={<SeatSelectionPage />}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/confirmed" element={<BookingConfirmed/>}/>
      </Routes>
    </Router>
  );
}

export default App;
