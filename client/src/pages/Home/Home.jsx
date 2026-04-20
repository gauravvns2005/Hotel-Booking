import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import HotelCard from "../../components/HotelCard/HotelCard";
import { ReactTyped } from "react-typed";
import "./Home.css";

import {
  FaSwimmingPool,
  FaDumbbell,
  FaUtensils,
  FaParking,
  FaWifi,
  FaSpa,
  FaPlaneDeparture,
  FaDice,
} from "react-icons/fa";

const AMENITIES = [
  { icon: <FaSwimmingPool />, label: "Swimming Pool" },
  { icon: <FaDumbbell />, label: "Fitness Center" },
  { icon: <FaUtensils />, label: "Restaurant" },
  { icon: <FaParking />, label: "Free Parking" },
  { icon: <FaWifi />, label: "Free WiFi" },
  { icon: <FaSpa />, label: "Spa & Wellness" },
  { icon: <FaDice />, label: "Casino Lounge" },
  { icon: <FaPlaneDeparture />, label: "Airport Transfer" },
];

function Home() {
  const { hotels } = useContext(AppContext);
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim()) navigate(`/hotels?city=${city}`);
    else navigate("/hotels");
  };

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero-modern">
        {/* LEFT */}
        <div className="hero-left">
          <h1>
            Find Your Perfect Stay
            <br />
            <span>
              <ReactTyped
              strings={[
                "Luxury hotels across India",
                "Comfort that feels like home",
                "Best prices, guaranteed",
                "Book stays in seconds",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
            </span>
          </h1>

          <p>
            Discover premium hotels across India with comfort, trust and luxury.
          </p>

          <div className="hero-search-modern">
            <div className="field">
              <span>City</span>
              <input
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="field">
              <span>Check In</span>
              <input type="date" />
            </div>

            <div className="field">
              <span>Check Out</span>
              <input type="date" />
            </div>

            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        {/* <div className="hero-right"></div> */}
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Hotels Listed</p>
          </div>

          <div className="stat-card">
            <h3>10K+</h3>
            <p>Happy Guests</p>
          </div>

          <div className="stat-card">
            <h3>100+</h3>
            <p>Cities Covered</p>
          </div>
        </div>
      </section>

      {/* HOTELS */}
      <section className="featured-section">
        <h2 className="section-title">Featured Hotels</h2>

        {hotels.length === 0 ? (
          <p className="no-data">No Hotels Available</p>
        ) : (
          <div className="hotels-grid">
            {hotels.slice(0, 12).map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>

      {/* AMENITIES */}
      <section className="amenities-section">
        <h2 className="section-title">Amenities</h2>

        <div className="amenities-grid">
          {AMENITIES.map((a) => (
            <div className="amenity-card" key={a.label}>
              <div className="amenity-icon">{a.icon}</div>
              <p>{a.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
