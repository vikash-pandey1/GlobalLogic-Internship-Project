import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* CineSpot Info */}
        <div className="footer-column info-column">
          <h3 className="footer-logo">Cine <span className='highlight' >Spot</span> </h3>
          <p className="footer-description">
            Your ultimate destination for discovering and booking the latest movies
            at cinemas near you.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4 className="column-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/now-playing">Now Playing</Link></li>
            <li><Link to="/coming-soon">Coming Soon</Link></li>
            <li><Link to="/cinemas">Find Cinemas</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4 className="column-title">Support</h4>
          <ul className="footer-links">
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4 className="column-title">Legal</h4>
          <ul className="footer-links">
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/cookies">Cookies Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="footer-bottom">
        <div className="social-icons">
          {/* Using Font Awesome icons. Make sure you have Font Awesome linked in your index.html */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-x-twitter"></i> {/* 'fab fa-x-twitter' for the new X logo */}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="copyright">&copy; 2025 CineSpot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
