import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaBed,
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

  const totalPrice = nights * (room?.price || 0);

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
      });

      navigate(`/payment/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Try again.");
    }

    setLoading(false);
  };

  if (!room && !error)
    return <div className="loading-screen">Loading room details...</div>;

  return (
    <div className="booking-page page-wrapper">
      <div className="container">
        <h1 className="section-heading">Book Your Stay</h1>

        {error && <div className="error-msg">{error}</div>}

        {room && (
          <div className="booking-layout">
            {/* FORM */}

            <div className="booking-form-card">
              <h2>Select Dates & Guests</h2>

              <div className="form-group">
                <label>
                  <FaCalendarAlt /> Check-In Date
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
                  <FaCalendarAlt /> Check-Out Date
                </label>

                <input
                  className="form-control"
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  <FaUserFriends /> Guests (Max: {room.maxGuests})
                </label>

                <input
                  className="form-control"
                  type="number"
                  min={1}
                  max={room.maxGuests}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </div>

              <button
                className="btn btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                onClick={createBooking}
                disabled={loading}
              >
                {loading ? "Creating Booking..." : "Proceed to Payment"}
              </button>
            </div>

            {/* SUMMARY */}

            <div className="booking-summary-card">
              <h3>Booking Summary</h3>

              <div className="summary-hotel">
                <p className="summary-hotel-name">
                  <FaBed /> {room.hotel?.name}
                </p>

                <p className="summary-location">
                  <FaMapMarkerAlt /> {room.hotel?.city}
                </p>
              </div>

              <div className="summary-divider" />

              <div className="summary-row">
                <span>Room Type</span>

                <span className="summary-val">{room.roomType}</span>
              </div>

              <div className="summary-row">
                <span>Price per night</span>

                <span className="summary-val">
                  ₹{room.price?.toLocaleString()}
                </span>
              </div>

              <div className="summary-row">
                <span>Nights</span>

                <span className="summary-val">{nights || "—"}</span>
              </div>

              <div className="summary-row">
                <span>Guests</span>

                <span className="summary-val">{guests}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>Total</span>

                <span className="total-price">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <p className="summary-note">
                * Final price after tax may vary at payment
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
