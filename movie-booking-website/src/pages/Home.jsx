import React from "react";
import "./Home.css";
import Banner from "../components/Banner";
import NowPlaying from "./NowPlaying";
import ComingSoon from "./CommingSoon";
import Cinemas from "./Cinemas";
import About from "./About";
import Feedback from "./Feedback";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="home">
      <Banner/>
      <NowPlaying/>
      <ComingSoon/>
      <Cinemas/>
      <About/>
      <Feedback/>
      <Footer/>
    </div>
  );
};

export default Home;
