import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo-row">
      <span className="footer-logo" role="img" aria-label="chef-hat">👨‍🍳</span>
      <span className="footer-title">Tasty Kitchens</span>
    </div>
    <div className="footer-desc">
      The only thing we are serious about is food.<br />
      Contact us on
    </div>
    <div className="footer-social-row">
      <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="footer-social">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pinterest.svg" alt="Pinterest" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" alt="Twitter" />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" alt="Facebook" />
      </a>
    </div>
  </footer>
);

export default Footer;