import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏨</span>
          StayEase
        </Link>

        {/* Desktop Nav */}
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/hotels" onClick={() => setMenuOpen(false)}>Hotels</Link>
          {user && (
            <>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>My Bookings</Link>
            </>
          )}
        </div>

        <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          ) : (
            <>
              <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <button className="btn btn-sm" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/hotels" onClick={() => setMenuOpen(false)}>Hotels</Link>
          {user ? (
            <>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>My Bookings</Link>
              <button className="mobile-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;