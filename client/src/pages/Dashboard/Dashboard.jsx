import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import API from "../../services/api";
import "./Dashboard.css";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      setSuccessMsg("Payment successful! Your booking is confirmed.");
    }

    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch {}

    setLoading(false);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchBookings();
    } catch {}
  };

  const getStatusBadge = (status, payStatus) => {
    if (status === "cancelled")
      return <span className="badge badge-danger">Cancelled</span>;

    if (payStatus === "paid")
      return <span className="badge badge-success">Confirmed</span>;

    return <span className="badge badge-warning">Pending</span>;
  };

  if (loading)
    return <div className="loading-screen">Loading your bookings...</div>;

  return (
    <div className="dashboard-page page-wrapper">
      <div className="container">
        <h1 className="section-heading">My Bookings</h1>

        <p className="section-subheading">Manage all your hotel reservations</p>

        {successMsg && (
          <div className="success-box">
            <FaCheckCircle />

            {successMsg}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <FaClipboardList className="empty-icon" />

            <h3>No bookings yet</h3>

            <p>Start exploring hotels and make your first booking</p>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((b) => (
              <div key={b._id} className="booking-item">
                <div className="booking-img-wrap">
                  <img
                    src={b.hotel?.images?.[0] || FALLBACK_IMG}
                    alt={b.hotel?.name}
                    className="booking-img"
                    onError={(e) => {
                      e.target.src = FALLBACK_IMG;
                    }}
                  />
                </div>

                <div className="booking-content">
                  <div className="booking-top">
                    <div>
                      <h3 className="booking-hotel">{b.hotel?.name}</h3>

                      <p className="booking-location">
                        <FaMapMarkerAlt /> {b.hotel?.city}
                      </p>
                    </div>

                    {getStatusBadge(b.bookingStatus, b.paymentStatus)}
                  </div>

                  <div className="booking-meta">
                    <div className="meta-item">
                      <span className="meta-label">Room</span>
                      <span>{b.room?.roomType}</span>
                    </div>

                    <div className="meta-item">
                      <span className="meta-label">Check-In</span>
                      <span>{new Date(b.checkIn).toLocaleDateString()}</span>
                    </div>

                    <div className="meta-item">
                      <span className="meta-label">Check-Out</span>
                      <span>{new Date(b.checkOut).toLocaleDateString()}</span>
                    </div>

                    <div className="meta-item">
                      <span className="meta-label">Guests</span>
                      <span>{b.guests}</span>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <span className="booking-price">
                      ₹{b.totalPrice?.toLocaleString()}
                    </span>

                    {b.bookingStatus !== "cancelled" && (
                      <button
                        className="cancel-btn"
                        onClick={() => cancelBooking(b._id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
