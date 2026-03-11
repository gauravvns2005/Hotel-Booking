import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">🏨 StayEase</Link>
          <p className="footer-desc">Your trusted hotel booking platform. Find and book the best hotels across India.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/hotels">All Hotels</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/dashboard">My Bookings</Link>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Create Account</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>support@stayease.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} StayEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;