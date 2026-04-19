import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaUserFriends,
  FaBed,
  FaWifi,
  FaCoffee,
  FaParking,
  FaDumbbell,
  FaSwimmingPool,
  FaUtensils,
  FaCheckCircle,
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
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // ✅ FIXED Wishlist Toggle
  const toggleWishlist = async () => {
    if (!user) return navigate("/login");

    try {
      if (wishlistAdded) {
        await API.delete(`/wishlist/${id}`);
        setWishlistAdded(false);
      } else {
        await API.post("/wishlist", { hotel: id });
        setWishlistAdded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Direct booking
  const handleBooking = (room) => {
    if (!user) return navigate("/login");

    navigate(`/booking/${room._id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    return stars;
  };

  if (!hotel) return <div className="loading-screen">Loading...</div>;

  const images =
    hotel.images?.length > 0 ? hotel.images : [FALLBACK_IMG];

  const amenities = [
    { icon: FaWifi, name: "Free WiFi" },
    { icon: FaCoffee, name: "Breakfast" },
    { icon: FaParking, name: "Free Parking" },
    { icon: FaSwimmingPool, name: "Swimming Pool" },
    { icon: FaDumbbell, name: "Fitness Center" },
    { icon: FaUtensils, name: "Restaurant" },
  ];

  return (
    <div className="hotel-page">
      {/* HERO */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{hotel.name}</h1>

          <div className="hero-location">
            <FaMapMarkerAlt />
            <span>
              {hotel.city}, {hotel.state}
            </span>
          </div>

          <div className="hero-rating">
            {renderStars(hotel.rating)}
            <span>{Number(hotel.rating).toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="main-grid">
          <div className="left-column">
            {/* GALLERY */}
            <div className="gallery-section">
              <div className="main-image-container">
                <img
                  src={images[activeImg]}
                  alt={hotel.name}
                />

                <button
                  onClick={toggleWishlist}
                  className={`wishlist-btn ${
                    wishlistAdded ? "active" : ""
                  }`}
                >
                  {wishlistAdded ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <div className="thumbnail-strip">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className={
                      activeImg === i ? "active" : ""
                    }
                    onClick={() => setActiveImg(i)}
                    alt=""
                  />
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="description-section">
              <h2>About This Hotel</h2>
              <p>{hotel.description}</p>
            </div>

            {/* AMENITIES */}
            <div className="amenities-section">
              <h2>Amenities</h2>
              <div className="amenities-grid">
                {amenities.map((a, i) => (
                  <div key={i} className="amenity-item">
                    <a.icon />
                    <span>{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROOMS */}
            <div className="rooms-section">
              <h2>Available Rooms</h2>

              {rooms.length === 0 ? (
                <div>No Rooms Available</div>
              ) : (
                <div className="rooms-list">
                  {rooms.map((room) => (
                    <div
                      key={room._id}
                      className="room-card"
                    >
                      <div className="room-card-left">
                        <img
                          src={
                            room.images?.[0] ||
                            FALLBACK_IMG
                          }
                          alt=""
                        />
                      </div>

                      <div className="room-card-middle">
                        <h3>{room.roomType}</h3>

                        <div className="room-features">
                          <span>
                            <FaUserFriends />{" "}
                            {room.maxGuests} Guests
                          </span>
                          <span>
                            <FaBed />{" "}
                            {room.totalRooms} Rooms
                          </span>
                        </div>

                        <ul>
                          <li>
                            <FaCheckCircle /> AC
                          </li>
                          <li>
                            <FaCheckCircle /> Bathroom
                          </li>
                          <li>
                            <FaCheckCircle /> TV
                          </li>
                        </ul>
                      </div>

                      <div className="room-card-right">
                        <div className="room-price">
                          ₹{room.price}
                        </div>
                        <div>per night</div>

                        <button
                          className="book-room-btn"
                          onClick={() =>
                            handleBooking(room)
                          }
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* REVIEWS */}
            <div className="reviews-section">
              <h2>Guest Reviews</h2>

              {user && (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  await API.post("/reviews", {
                    hotel: id,
                    rating: Number(rating),
                    comment,
                  });

                  setComment("");
                  setRating(5);

                  const res = await API.get(`/reviews/${id}`);
                  setReviews(res.data);
                }}>
                  <select
                    value={rating}
                    onChange={(e) =>
                      setRating(e.target.value)
                    }
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n}>
                        {n} Star
                      </option>
                    ))}
                  </select>

                  <textarea
                    value={comment}
                    onChange={(e) =>
                      setComment(e.target.value)
                    }
                    placeholder="Write review..."
                  />

                  <button type="submit">
                    Submit
                  </button>
                </form>
              )}

              {reviews.map((r) => (
                <div key={r._id}>
                  <h4>{r.user?.name || "User"}</h4>
                  {renderStars(r.rating)}
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;