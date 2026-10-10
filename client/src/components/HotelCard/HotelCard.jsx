import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaArrowRight, FaEye } from "react-icons/fa";
import "./HotelCard.css";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop";

function HotelCard({ hotel, onQuickView }) {
  if (!hotel) return null;

  const img =
    hotel.images && hotel.images.length > 0 ? hotel.images[0] : FALLBACK_IMG;

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(hotel);
    }
  };

  return (
    <div className="hotel-card-wrapper">
      <Link to={`/hotel/${hotel._id}`} className="hotel-card">
        {/* IMAGE WRAPPER */}
        <div className="hotel-card-img-wrap">
          <img
            src={img}
            alt={hotel.name}
            className="hotel-card-img"
            loading="lazy"
            onError={(e) => {
              e.target.src = FALLBACK_IMG;
            }}
          />

          {hotel.rating > 0 && (
            <div className="hotel-card-rating">
              <FaStar className="star-icon-small" />
              <span>{Number(hotel.rating).toFixed(1)}</span>
            </div>
          )}

          {/* Quick View Button Hover Floating Badge */}
          {onQuickView && (
            <button
              type="button"
              className="quick-view-hover-btn"
              onClick={handleQuickViewClick}
              title="Quick View Preview"
            >
              <FaEye /> Quick View
            </button>
          )}
        </div>

        {/* CARD CONTENT */}
        <div className="hotel-card-body">
          <div className="hotel-card-location">
            <FaMapMarkerAlt className="loc-pin" />
            <span>{hotel.city}{hotel.state ? `, ${hotel.state}` : ""}</span>
          </div>

          <h3 className="hotel-card-name" title={hotel.name}>
            {hotel.name}
          </h3>

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="hotel-card-amenities">
              {hotel.amenities.slice(0, 3).map((a, i) => (
                <span key={i} className="amenity-pill">
                  {a}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="amenity-pill more">
                  +{hotel.amenities.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="hotel-card-footer">
            <div className="hotel-card-price">
              <span className="currency-mark">₹</span>
              <span className="price-amount">
                {hotel.pricePerNight?.toLocaleString()}
              </span>
              <span className="price-label">/ night</span>
            </div>

            <div className="hotel-card-actions">
              {onQuickView && (
                <button
                  type="button"
                  className="card-quick-view-btn"
                  onClick={handleQuickViewClick}
                  title="Quick Preview Modal"
                >
                  <FaEye />
                </button>
              )}

              <span className="hotel-card-btn">
                Explore <FaArrowRight className="arrow-icon" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCard;
