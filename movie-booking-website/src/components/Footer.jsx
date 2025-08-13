import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    const navigate = useNavigate();
  
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
            <li><span onClick={() => navigate('/now-playing')} >Now Playing</span></li>
            <li><span onClick={() => navigate('/coming-soon')}>Coming Soon</span></li>
            <li><span onClick={() => navigate('/cinemas')} >Find Cinemas</span></li>
          </ul>   
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4 className="column-title">Support</h4>
          <ul className="footer-links">
            <li><span onClick={() => navigate('/help-center')}>Help Center</span></li>
            <li><span onClick={() => navigate('/contact-us')}>Contact Us</span></li>
            <li><span onClick={() => navigate('/faqs')}>FAQs</span></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4 className="column-title">Legal</h4>
          <ul className="footer-links">
            <li><span onClick={() => navigate('/terms-service')}>Terms of Service</span></li>
            <li><span onClick={() => navigate('/privacy-policy')}>Privacy Policy</span></li>
            <li><span onClick={() => navigate('/cookies-policy')}>Cookies Policy</span></li>
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
