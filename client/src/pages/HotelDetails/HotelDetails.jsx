import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaUserFriends,
  FaBed,
} from "react-icons/fa";
import API from "../../services/api";
import { AppContext } from "../../context/AppContext";
import "./HotelDetails.css";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800";

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

  useEffect(() => {
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
      } catch {}
    };

    fetchData();
  }, [id]);

  const addWishlist = async () => {
    if (!user) return navigate("/login");

    try {
      await API.post("/wishlist", { hotel: id });
      setWishlistAdded(true);
    } catch {
      setWishlistAdded(true);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!user) return navigate("/login");

    setReviewLoading(true);
    setError("");

    try {
      await API.post("/reviews", {
        hotel: id,
        rating: Number(rating),
        comment,
      });

      setComment("");
      setRating(5);

      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit review");
    }

    setReviewLoading(false);
  };

  if (!hotel) return <div className="loading-screen">Loading hotel...</div>;

  const images = hotel.images?.length > 0 ? hotel.images : [FALLBACK_IMG];

  return (
    <div className="hotel-details-page page-wrapper">
      <div className="container">
        {/* GALLERY */}

        <div className="hotel-gallery">
          <div className="gallery-main">
            <img
              src={images[activeImg]}
              alt={hotel.name}
              className="gallery-main-img"
            />
          </div>

          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className={`gallery-thumb ${activeImg === i ? "active" : ""}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* HOTEL INFO */}

        <div className="hotel-info-card">
          <div className="hotel-info-left">
            <div className="hotel-info-header">
              <h1 className="hotel-name">{hotel.name}</h1>

              <button className="wishlist-btn" onClick={addWishlist}>
                {wishlistAdded ? <FaHeart /> : <FaRegHeart />}
                Wishlist
              </button>
            </div>

            <p className="hotel-location">
              <FaMapMarkerAlt />
              {hotel.address}, {hotel.city}, {hotel.state}
            </p>

            <div className="hotel-rating">
              <FaStar />

              {Number(hotel.rating).toFixed(1)}
            </div>

            <p className="hotel-desc">{hotel.description}</p>

            {hotel.amenities?.length > 0 && (
              <div className="hotel-amenities">
                <h3>Amenities</h3>

                <div className="amenities-list">
                  {hotel.amenities.map((a, i) => (
                    <span key={i} className="amenity-pill">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hotel-price-card">
            <p className="hotel-price-label">Starting from</p>

            <p className="hotel-price">
              ₹{hotel.pricePerNight}
              <span>/night</span>
            </p>

            <button
              className="book-btn"
              onClick={() => {
                if (rooms.length > 0) navigate(`/booking/${rooms[0]._id}`);
                else alert("No rooms available");
              }}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* ROOMS */}

        <section className="rooms-section">
          <h2>Available Rooms</h2>

          <div className="rooms-grid">
            {rooms.map((room) => (
              <div key={room._id} className="room-card">
                <img
                  src={room.images?.[0] || FALLBACK_IMG}
                  className="room-img"
                />

                <div className="room-body">
                  <h3>{room.roomType}</h3>

                  <div className="room-meta">
                    <span>
                      <FaUserFriends /> {room.maxGuests} guests
                    </span>

                    <span>
                      <FaBed /> {room.totalRooms} rooms
                    </span>
                  </div>

                  <div className="room-footer">
                    <span className="room-price">₹{room.price}/night</span>

                    <button
                      className="book-room-btn"
                      onClick={() => navigate(`/booking/${room._id}`)}
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS */}

        <section className="reviews-section">
          <h2>Guest Reviews</h2>

          {user && (
            <form className="review-form" onSubmit={submitReview}>
              <div className="form-group">
                <label>Rating</label>

                <select
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Comment</label>

                <textarea
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button className="submit-review-btn" type="submit">
                {reviewLoading ? "Submitting" : "Submit Review"}
              </button>
            </form>
          )}

          <div className="reviews-list">
            {reviews.map((r) => (
              <div key={r._id} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">{r.user?.name?.charAt(0)}</div>

                  <div>
                    <p className="review-author">{r.user?.name}</p>
                  </div>

                  <span className="review-stars">
                    <FaStar /> {r.rating}
                  </span>
                </div>

                <p className="review-comment">{r.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HotelDetails;
