import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchResults from "./pages/SearchResult";
import Home from "./pages/Home";
import NowPlaying from "./pages/NowPlaying";
import ComingSoon from "./pages/CommingSoon";
import Cinemas from "./pages/Cinemas";
import About from "./pages/About";
import Movies from "./pages/Movies";
import Trailers from "./pages/Trailers";
import BookingPage from "./pages/BookingPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import CheckoutPage from "./pages/CheckoutPage";
import BookingConfirmed from "./pages/BookingConfirmed";

import HelpCenter from "./pages/HelpCenter"
import ContactUs from "./pages/ContactUs"
import Faqs from "./pages/Faqs"

import TermsOfService from "./pages/TermsOfServices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/now-playing" element={<NowPlaying />}/>
        <Route path="/coming-soon" element={<ComingSoon />}/>
        <Route path="/cinemas" element={<Cinemas />}/>
        <Route path="/about" element={<About />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/trailers" element={<Trailers />} />
        <Route path="/booking/:category/:movieId" element={<BookingPage />}/>
        <Route path="/seats" element={<SeatSelectionPage />}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/confirmed" element={<BookingConfirmed/>}/>

        <Route path="/help-center" element={<HelpCenter/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/faqs" element={<Faqs/>}/>

        <Route path="/terms-service" element={<TermsOfService/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/cookies-policy" element={<CookiesPolicy/>}/>

      </Routes>
    </Router>
  );
}

export default App;
