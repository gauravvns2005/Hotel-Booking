import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHotel, FaUser } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
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
          <FaHotel />
          StayEase
        </Link>

        {/* LINKS */}

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/hotels" onClick={() => setMenuOpen(false)}>
            Hotels
          </Link>
          

          {user && (
            <>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist
              </Link>

              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                My Bookings
              </Link>
              
            </>
          )}
          <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
        </div>

        {/* ACTIONS */}

        <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>

              <Link to="/register" className="btn btn-sm">
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="user-avatar">
                <FaUser />
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE ICON */}

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes/> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}

      {/* {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/hotels" onClick={() => setMenuOpen(false)}>
            Hotels
          </Link>

          {user ? (
            <>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist
              </Link>

              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                My Bookings
              </Link>

              <button className="mobile-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>

              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
          <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
        </div>
      )} */}

      {menuOpen && (
  <div className="mobile-menu">
    <Link to="/hotels" onClick={() => setMenuOpen(false)}>
      Hotels
    </Link>

    {/* USER BASED LINKS */}
    {user ? (
      <>
        <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
          Wishlist
        </Link>

        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
          My Bookings
        </Link>
      </>
    ) : (
      <>
        <Link to="/login" onClick={() => setMenuOpen(false)}>
          Login
        </Link>

        <Link to="/register" onClick={() => setMenuOpen(false)}>
          Register
        </Link>
      </>
    )}

    {/* ALWAYS VISIBLE */}
    <Link to="/about" onClick={() => setMenuOpen(false)}>
      About
    </Link>

    <Link to="/contact" onClick={() => setMenuOpen(false)}>
      Contact
    </Link>

    {/* ONLY WHEN LOGGED IN (LAST POSITION) */}
    {user && (
      <button className="mobile-logout" onClick={handleLogout}>
        Logout
      </button>
    )}
  </div>
)}
    </nav>
  );
}

export default Navbar;
