import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import HotelCard from "../../components/HotelCard/HotelCard";
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
FaMapMarkerAlt
} from "react-icons/fa";

const AMENITIES = [
  { icon: <FaSwimmingPool />, label: "Swimming Pool" },
  { icon: <FaDumbbell />, label: "Fitness Center" },
  { icon: <FaUtensils />, label: "Restaurant" },
  { icon: <FaParking />, label: "Free Parking" },
  { icon: <FaWifi />, label: "Free WiFi" },
  { icon: <FaSpa />, label: "Spa & Wellness" },
  { icon: <FaDice />, label: "Casino Lounge" },
  { icon: <FaPlaneDeparture />, label: "Airport Transfer" }
];

function Home() {

  const { hotels } = useContext(AppContext);
  const [city,setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if(city.trim()) navigate(`/hotels?city=${city.trim()}`)
    else navigate("/hotels")
  }

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <h1 className="hero-title">
          Find Your Perfect Hotel
        </h1>

        <p className="hero-subtitle">
          Discover the best hotels across India.
        </p>

        <div className="hero-search">

          <div className="search-input-wrap">
            <FaMapMarkerAlt className="search-icon"/>
            <input
              placeholder="Search city"
              value={city}
              onChange={(e)=>setCity(e.target.value)}
              onKeyDown={(e)=> e.key==="Enter" && handleSearch()}
            />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

        </div>

      </section>


      {/* HOTELS */}

      <section className="featured-section">

        <h2 className="section-title">Featured Hotels</h2>

        {hotels.length === 0 ? (
          <p className="no-data">No Hotels Available</p>
        ) : (
          <div className="hotels-grid">
            {hotels.slice(0,6).map((hotel)=>(
              <HotelCard key={hotel._id} hotel={hotel}/>
            ))}
          </div>
        )}

      </section>


      {/* AMENITIES */}

      <section className="amenities-section">

        <h2 className="section-title">Amenities</h2>

        <div className="amenities-grid">

          {AMENITIES.map((a)=>(
            <div className="amenity-card" key={a.label}>
              <div className="amenity-icon">{a.icon}</div>
              <p>{a.label}</p>
            </div>
          ))}

        </div>

      </section>

    </div>
  )
}

export default Home