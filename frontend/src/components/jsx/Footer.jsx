// src/components/Footer.jsx

import "../css/Footer.css";
import {Link} from 'react-router-dom';

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP SECTION */}
        <div className="footer-top">

          {/* BUSINESS INFO */}
          <div>
            <h2 className="footer-title main">Chillie Haven</h2>

            <p className="footer-text">
              Fresh farm chillies delivered across Nairobi. We supply
              quality chillies to homes, restaurants, and businesses in
              South B, Syokimau, Pipeline, Embakasi South and surrounding areas.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className="footer-title small">Quick Links</h2>

            <ul className="footer-links">
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/about'}>About us</Link></li>
              <li><Link to={'/products'}>Products</Link></li>
              <li><Link to={'/clientele'}>Clientele</Link></li>
              <li><Link to={'/blogs'}>Blogs</Link></li>
              <li><Link to={'/contact'}>Contact us</Link></li>
            </ul>
          </div>

          {/* HOURS & LOCATION */}
          <div>
            <h2 className="footer-title small">Working Hours</h2>

            <div className="footer-hours">
              <p>Mon - Fri: 7AM - 7PM</p>
              <p>Saturday: 8AM - 5PM</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="footer-location">
              <h2 className="footer-title small">Location</h2>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="footer-middle">

          {/* SOCIALS */}
          <div>
            <h2 className="footer-title small">Follow Us</h2>

            <div className="footer-socials">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>

              <a href="#" className="social-icon">
                <FaInstagram />
              </a>

              <a href="#" className="social-icon">
                <FaTwitter />
              </a>

              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* WHATSAPP */}
          <div>
            <h2 className="footer-title small">Join Our Channel</h2>

            <a
              href="https://wa.me/254703433014"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <FaWhatsapp />
              Join WhatsApp
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Chillie Haven.
            All Rights Reserved.
          </p>

          <p>Fresh Chillies from Nairobi �️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;