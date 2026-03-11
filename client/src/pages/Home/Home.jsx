import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import HotelCard from "../../components/HotelCard/HotelCard";
import "./Home.css";

const AMENITIES = [
  { icon: "🏊", label: "Swimming Pool" },
  { icon: "🏋️", label: "Fitness Center" },
  { icon: "🍽️", label: "Restaurant" },
  { icon: "🅿️", label: "Free Parking" },
  { icon: "📶", label: "Free WiFi" },
  { icon: "🧖", label: "Spa & Wellness" },
  { icon: "🎰", label: "Casino Lounge" },
  { icon: "🚌", label: "Airport Transfer" },
];

function Home() {
  const { hotels } = useContext(AppContext);
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim()) navigate(`/hotels?city=${city.trim()}`);
    else navigate("/hotels");
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content container">
          <div className="hero-badge">Trusted by 50,000+ Travelers</div>
          <h1 className="hero-title">
            Find Your Perfect<br />
            <span className="hero-accent">Hotel Stay</span>
          </h1>
          <p className="hero-subtitle">
            Discover luxury hotels, cozy boutiques, and budget-friendly options across India.
          </p>

          <div className="hero-search">
            <div className="search-input-wrap">
              <span className="search-icon">📍</span>
              <input
                className="search-input"
                placeholder="Search by city (e.g. Mumbai, Delhi, Goa...)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button className="btn btn-primary search-btn" onClick={handleSearch}>
              Search Hotels
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">500+</span>
              <span className="stat-label">Hotels</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">50K+</span>
              <span className="stat-label">Happy Guests</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">100+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-heading">Featured Hotels</h2>
          <p className="section-subheading">Hand-picked stays for the best experience</p>

          {hotels.length === 0 ? (
            <p className="no-data">No hotels available yet. Check back soon!</p>
          ) : (
            <div className="hotels-grid">
              {hotels.slice(0, 6).map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}

          {hotels.length > 6 && (
            <div className="view-all-wrap">
              <button className="btn btn-secondary" onClick={() => navigate("/hotels")}>
                View All Hotels →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Amenities */}
      <section className="amenities-section">
        <div className="container">
          <h2 className="section-heading">World-Class Amenities</h2>
          <p className="section-subheading">Everything you need for a perfect stay</p>
          <div className="amenities-grid">
            {AMENITIES.map((a) => (
              <div className="amenity-card" key={a.label}>
                <span className="amenity-icon">{a.icon}</span>
                <span className="amenity-label">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Ready for Your Next Adventure?</h2>
              <p>Join thousands of travelers who trust StayEase for every trip.</p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-primary" onClick={() => navigate("/hotels")}>
                Explore Hotels
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/register")}>
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;