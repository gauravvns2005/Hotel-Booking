import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaBed,
  FaHotel,
  FaCheckCircle,
  FaCreditCard,
  FaShieldAlt,
  FaClock,
  FaArrowLeft,
  FaInfoCircle,
} from "react-icons/fa";
import API from "../../services/api";
import "./Booking.css";

function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await API.get(`/rooms/${roomId}`);
        setRoom(res.data);
      } catch {
        setError("Could not load room details. Please go back and try again.");
      }
    };

    fetchRoom();
  }, [roomId]);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const subtotal = nights * (room?.price || 0);
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax;

  const createBooking = async () => {
    if (!checkIn || !checkOut)
      return setError("Please select check-in and check-out dates.");

    if (nights <= 0) return setError("Check-out must be after check-in.");

    if (guests > room.maxGuests)
      return setError(`Max ${room.maxGuests} guests allowed.`);

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/bookings", {
        hotel: room.hotel._id,
        room: room._id,
        checkIn,
        checkOut,
        guests,
        specialRequests,
      });

      navigate(`/payment/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Try again.");
    }

    setLoading(false);
  };

  if (!room && !error)
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading room details...</p>
      </div>
    );

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="booking-hero-overlay"></div>
        <div className="booking-hero-content">
          {/* <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
            Back
          </button> */}
          <h1 className="booking-hero-title">Complete Your Booking</h1>
          <p className="booking-hero-subtitle">
            Secure your stay in just a few steps
          </p>
        </div>
      </div>

      <div className="booking-container">
        {error && (
          <div className="error-message">
            <FaInfoCircle />
            {error}
          </div>
        )}

        {room && (
          <div className="booking-main-layout">
            {/* Left Column - Booking Form */}
            <div className="booking-left">
              {/* Hotel Info Card */}
              <div className="info-card">
                <div className="hotel-basic-info">
                  <div className="hotel-icon">
                    <FaHotel />
                  </div>
                  <div>
                    <h2 className="hotel-name">{room.hotel?.name}</h2>
                    <p className="hotel-location">
                      <FaMapMarkerAlt />
                      {room.hotel?.city}, {room.hotel?.state}
                    </p>
                  </div>
                </div>
              </div>

              {/* Room Details Card */}
              <div className="info-card">
                <h3 className="card-title">Room Details</h3>
                <div className="room-details-grid">
                  <div className="room-detail-item">
                    <FaBed className="detail-icon" />
                    <div>
                      <div className="detail-label">Room Type</div>
                      <div className="detail-value">{room.roomType}</div>
                    </div>
                  </div>
                  <div className="room-detail-item">
                    <FaUserFriends className="detail-icon" />
                    <div>
                      <div className="detail-label">Max Guests</div>
                      <div className="detail-value">{room.maxGuests} guests</div>
                    </div>
                  </div>
                  <div className="room-detail-item">
                    <FaCheckCircle className="detail-icon" />
                    <div>
                      <div className="detail-label">Available Rooms</div>
                      <div className="detail-value">{room.totalRooms} left</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form Card */}
              <div className="info-card">
                <h3 className="card-title">Select Your Dates</h3>
                
                <div className="dates-grid">
                  <div className="form-group">
                    <label>
                      <FaCalendarAlt />
                      Check-in Date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaCalendarAlt />
                      Check-out Date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <FaUserFriends />
                    Number of Guests
                  </label>
                  <div className="guest-selector">
                    <button
                      type="button"
                      onClick={() => guests > 1 && setGuests(guests - 1)}
                      disabled={guests <= 1}
                    >
                      -
                    </button>
                    <span>{guests}</span>
                    <button
                      type="button"
                      onClick={() => guests < room.maxGuests && setGuests(guests + 1)}
                      disabled={guests >= room.maxGuests}
                    >
                      +
                    </button>
                  </div>
                  <div className="form-hint">
                    Max {room.maxGuests} guests allowed
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests (Optional)</label>
                  <textarea
                    className="form-control textarea"
                    placeholder="Any special requests or preferences?"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows="3"
                  />
                </div>
              </div>

              {/* Policies Card */}
              <div className="info-card">
                <h3 className="card-title">Important Information</h3>
                <div className="policies-list">
                  <div className="policy-item">
                    <FaClock />
                    <div>
                      <strong>Check-in:</strong> 2:00 PM
                    </div>
                  </div>
                  <div className="policy-item">
                    <FaClock />
                    <div>
                      <strong>Check-out:</strong> 11:00 AM
                    </div>
                  </div>
                  <div className="policy-item">
                    <FaShieldAlt />
                    <div>
                      <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before check-in
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="booking-right">
              <div className="summary-card">
                <div className="summary-header">
                  <h3>Booking Summary</h3>
                  <div className="summary-badge">Secure Booking</div>
                </div>

                <div className="room-preview">
                  {room.images?.[0] && (
                    <img 
                      src={room.images[0]} 
                      alt={room.roomType}
                      className="room-preview-image"
                    />
                  )}
                  <div className="room-preview-info">
                    <h4>{room.roomType}</h4>
                    <p>₹{room.price?.toLocaleString()} / night</p>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Room Price</span>
                    <span>₹{room.price?.toLocaleString()} × {nights} nights</span>
                  </div>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Taxes & Fees (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="summary-divider" />

                  <div className="summary-total">
                    <span>Total Amount</span>
                    <span className="total-price">₹{totalPrice.toLocaleString()}</span>
                  </div>

                  {nights > 0 && (
                    <div className="per-night-breakdown">
                      Average per night: ₹{(totalPrice / nights).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="booking-dates">
                  {checkIn && checkOut && (
                    <>
                      <div className="date-badge">
                        <FaCalendarAlt />
                        <div>
                          <div>Check-in</div>
                          <strong>{new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                        </div>
                      </div>
                      <div className="date-badge">
                        <FaCalendarAlt />
                        <div>
                          <div>Check-out</div>
                          <strong>{new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  className="confirm-booking-btn"
                  onClick={createBooking}
                  disabled={loading || !checkIn || !checkOut || nights <= 0}
                >
                  {loading ? (
                    <>
                      <div className="btn-spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard />
                      Confirm & Proceed to Payment
                    </>
                  )}
                </button>

                <div className="secure-note">
                  <FaShieldAlt />
                  Your payment is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;