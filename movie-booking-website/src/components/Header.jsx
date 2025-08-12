import React from 'react';
import './Header.css';
import { Link,useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="navbar">
      <div className="navbar-logo">
        Cine<span className="highlight">Spot</span>
      </div>

      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/coming-soon">Coming Soon</Link>
        <Link to="/cinemas">Cinemas</Link>
        <Link to="/about">About</Link>
      </nav>

      <div className="navbar-right">
        <input type="text" placeholder="Search Movies" className="search-box" />
        <button onClick={() => navigate('/signup')} className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;

