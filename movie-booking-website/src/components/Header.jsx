import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        Cine<span className="highlight">Spot</span>
      </div>

      <nav className="navbar-links">
        <span onClick={() => navigate('/')}>Home</span>
        <span onClick={() => navigate('/coming-soon')}>Coming Soon</span>
        <span onClick={() => navigate('/cinemas')}>Cinemas</span>
        <span onClick={() => navigate('/about')}>About</span>
      </nav>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search Movies"
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </header>
  );
};

export default Header;
