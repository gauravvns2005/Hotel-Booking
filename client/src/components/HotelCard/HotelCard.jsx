import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaArrowRight } from "react-icons/fa";
import "./HotelCard.css";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop";

function HotelCard({ hotel }) {
  if (!hotel) return null;

  const img =
    hotel.images && hotel.images.length > 0 ? hotel.images[0] : FALLBACK_IMG;

  return (
    <Link to={`/hotel/${hotel._id}`} className="hotel-card">
      <div className="hotel-card-img-wrap">
        <img
          src={img}
          alt={hotel.name}
          className="hotel-card-img"
          onError={(e) => {
            e.target.src = FALLBACK_IMG;
          }}
        />

        {hotel.rating > 0 && (
          <div className="hotel-card-rating">
            <FaStar /> {Number(hotel.rating).toFixed(1)}
          </div>
        )}
      </div>

      <div className="hotel-card-body">
        <h3 className="hotel-card-name">{hotel.name}</h3>

        <p className="hotel-card-location">
          <FaMapMarkerAlt /> {hotel.city}, {hotel.state}
        </p>

        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="hotel-card-amenities">
            {hotel.amenities.slice(0, 3).map((a, i) => (
              <span key={i} className="amenity-pill">
                {a}
              </span>
            ))}
          </div>
        )}

        <div className="hotel-card-footer">
          <div className="hotel-card-price">
            <span className="price-amount">
              ₹{hotel.pricePerNight?.toLocaleString()}
            </span>

            <span className="price-label">/ night</span>
          </div>

          <span className="hotel-card-btn">
            View Details <FaArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
