import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheckCircle,
  FaEye,
  FaBed,
  FaHotel
} from "react-icons/fa";
import Modal from "../Modal/Modal";
import "./HotelQuickViewModal.css";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop";

function HotelQuickViewModal({ isOpen, onClose, hotel }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const navigate = useNavigate();

  if (!hotel) return null;

  const images = hotel.images && hotel.images.length > 0 ? hotel.images : [FALLBACK_IMG];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={hotel.name}
      subtitle={`${hotel.city || ""}, ${hotel.state || ""}`}
      icon={FaHotel}
      badge={hotel.rating > 0 ? `★ ${Number(hotel.rating).toFixed(1)}` : undefined}
      size="lg"
    >
      <div className="quickview-grid">
        {/* LEFT: GALLERY */}
        <div className="quickview-gallery">
          <div className="quickview-main-img-wrap">
            <img
              src={images[activeImgIndex] || FALLBACK_IMG}
              alt={hotel.name}
              className="quickview-main-img"
              onError={(e) => {
                e.target.src = FALLBACK_IMG;
              }}
            />
            {hotel.rating > 0 && (
              <span className="quickview-rating-badge">
                <FaStar /> {Number(hotel.rating).toFixed(1)}
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="quickview-thumbnails">
              {images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`quickview-thumb-btn ${activeImgIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveImgIndex(idx)}
                >
                  <img src={img} alt="" onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="quickview-details">
          <div className="quickview-location">
            <FaMapMarkerAlt className="loc-icon" />
            <span>
              {hotel.address ? `${hotel.address}, ` : ""}
              {hotel.city}, {hotel.state} {hotel.pincode ? `- ${hotel.pincode}` : ""}
            </span>
          </div>

          <div className="quickview-price-box">
            <div className="quickview-price-left">
              <span className="quickview-currency">₹</span>
              <span className="quickview-amount">
                {hotel.pricePerNight?.toLocaleString()}
              </span>
              <span className="quickview-period">/ night</span>
            </div>
            <span className="quickview-tax-note">Includes taxes & fees</span>
          </div>

          {hotel.description && (
            <div className="quickview-description">
              <h4>Overview</h4>
              <p>{hotel.description}</p>
            </div>
          )}

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="quickview-amenities">
              <h4>Popular Amenities</h4>
              <div className="quickview-amenities-tags">
                {hotel.amenities.map((item, idx) => (
                  <span key={idx} className="quickview-amenity-tag">
                    <FaCheckCircle className="check-icon" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="quickview-actions">
            <button
              className="quickview-btn-details"
              onClick={() => {
                onClose();
                navigate(`/hotel/${hotel._id}`);
              }}
            >
              View Full Details
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default HotelQuickViewModal;
