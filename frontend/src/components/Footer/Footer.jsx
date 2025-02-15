import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./style.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section footer__about">
          <h3>About Us</h3>
          <p>
            We are a company committed to providing the best services and
            products to our customers. Our mission is to innovate and deliver
            quality.
          </p>
        </div>

        <div className="footer__section footer__links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer__section footer__contact">
          <h3>Contact Us</h3>
          <p>Phone: +123 456 7890</p>
          <p>Email: contact@company.com</p>
        </div>

        <div className="footer__section footer__social">
          <h3>Follow Us</h3>
          <div className="footer__social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2025 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
