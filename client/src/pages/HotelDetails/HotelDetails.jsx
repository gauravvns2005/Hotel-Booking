import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../../services/api";
import { AppContext } from "../../context/AppContext";
import "./HotelDetails.css";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800";

function HotelDetails() {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [hotelRes, roomRes, reviewRes] = await Promise.all([
        API.get(`/hotels/${id}`),
        API.get(`/rooms/hotel/${id}`),
        API.get(`/reviews/${id}`),
      ]);
      setHotel(hotelRes.data);
      setRooms(roomRes.data);
      setReviews(reviewRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const addWishlist = async () => {
    if (!user) return navigate("/login");
    try {
      await API.post("/wishlist", { hotel: id });
      setWishlistAdded(true);
    } catch {
      setWishlistAdded(true); // might already be in wishlist
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    setReviewLoading(true);
    setError("");
    try {
      await API.post("/reviews", { hotel: id, rating: Number(rating), comment });
      setComment("");
      setRating(5);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit review");
    }
    setReviewLoading(false);
  };

  if (!hotel) return <div className="loading-screen">Loading hotel details...</div>;

  const images = hotel.images?.length > 0 ? hotel.images : [FALLBACK_IMG];

  return (
    <div className="hotel-details-page page-wrapper">
      <div className="container">
        {/* Gallery */}
        <div className="hotel-gallery">
          <div className="gallery-main">
            <img
              src={images[activeImg] || FALLBACK_IMG}
              alt={hotel.name}
              className="gallery-main-img"
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
            />
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className={`gallery-thumb ${activeImg === i ? "active" : ""}`}
                  onClick={() => setActiveImg(i)}
                  onError={(e) => { e.target.src = FALLBACK_IMG; }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hotel Info */}
        <div className="hotel-info-card">
          <div className="hotel-info-left">
            <div className="hotel-info-header">
              <h1 className="hotel-name">{hotel.name}</h1>
              <button
                className={`wishlist-btn ${wishlistAdded ? "added" : ""}`}
                onClick={addWishlist}
                title="Add to Wishlist"
              >
                {wishlistAdded ? "❤️" : "🤍"} Wishlist
              </button>
            </div>
            <p className="hotel-location">📍 {hotel.address}, {hotel.city}, {hotel.state} - {hotel.pincode}</p>
            {hotel.rating > 0 && (
              <div className="hotel-rating">
                <span className="stars">{"⭐".repeat(Math.round(hotel.rating))}</span>
                <span className="rating-num">{Number(hotel.rating).toFixed(1)}</span>
                <span className="rating-count">({hotel.totalReviews} reviews)</span>
              </div>
            )}
            <p className="hotel-desc">{hotel.description}</p>

            {hotel.amenities?.length > 0 && (
              <div className="hotel-amenities">
                <h3>Amenities</h3>
                <div className="amenities-list">
                  {hotel.amenities.map((a, i) => (
                    <span key={i} className="amenity-pill">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hotel-price-card">
            <p className="hotel-price-label">Starting from</p>
            <p className="hotel-price">₹{hotel.pricePerNight?.toLocaleString()}<span>/night</span></p>
            <button className="btn btn-primary" style={{ width: "100%" }}
              onClick={() => {
                if (rooms.length > 0) navigate(`/booking/${rooms[0]._id}`);
                else alert("No rooms available currently");
              }}>
              Book Now
            </button>
          </div>
        </div>

        {/* Rooms */}
        <section className="rooms-section">
          <h2>Available Rooms</h2>
          {rooms.length === 0 ? (
            <p className="no-data">No rooms available for this hotel.</p>
          ) : (
            <div className="rooms-grid">
              {rooms.map((room) => (
                <div key={room._id} className="room-card">
                  {room.images?.[0] && (
                    <img src={room.images[0]} alt={room.roomType} className="room-img"
                      onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                  )}
                  <div className="room-body">
                    <h3>{room.roomType}</h3>
                    <div className="room-meta">
                      <span>👥 {room.maxGuests} guests</span>
                      <span>🛏️ {room.totalRooms} rooms</span>
                    </div>
                    {room.amenities?.map((a, i) => <span key={i} className="amenity-pill">{a}</span>)}
                    <div className="room-footer">
                      <span className="room-price">₹{room.price?.toLocaleString()}<small>/night</small></span>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate(`/booking/${room._id}`)}>
                        Book Room
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="reviews-section">
          <h2>Guest Reviews</h2>

          {/* Add Review */}
          {user && (
            <form className="review-form" onSubmit={submitReview}>
              <h3>Write a Review</h3>
              {error && <div className="error-msg">{error}</div>}
              <div className="form-group">
                <label>Rating</label>
                <select className="form-control" value={rating} onChange={(e) => setRating(e.target.value)}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{"⭐".repeat(n)} ({n} stars)</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea className="form-control" rows={3} placeholder="Share your experience..." value={comment}
                  onChange={(e) => setComment(e.target.value)} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={reviewLoading}>
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}

          {reviews.length === 0 ? (
            <p className="no-data">No reviews yet. Be the first!</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((r) => (
                <div key={r._id} className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">{r.user?.name?.charAt(0)}</div>
                    <div>
                      <p className="review-author">{r.user?.name}</p>
                      <p className="review-date">{new Date(r.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
                    </div>
                    <span className="review-stars">{"⭐".repeat(r.rating)}</span>
                  </div>
                  <p className="review-comment">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HotelDetails;