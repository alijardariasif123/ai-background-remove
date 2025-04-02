// Footer.jsx
import React from 'react';
import { assets } from '../assets/assets';
import '../styles/Footer.css'; // Ensure to include the CSS file

const Footer = () => {
  return (
    <div className="footer-container">
      <img className="footer-logo" src={assets.logo} alt="Logo" />
      <p className="footer-text">Copyright @BgRemoval.dev | All rights reserved.</p>
      <div className="footer-icons">
        <img className="footer-icon" src={assets.facebook_icon} alt="Facebook" />
        <img className="footer-icon" src={assets.twitter_icon} alt="Twitter" />
        <img className="footer-icon" src={assets.google_plus_icon} alt="Google Plus" />
      </div>
    </div>
  );
};

export default Footer;
