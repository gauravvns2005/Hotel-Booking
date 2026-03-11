import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Payment.css";

const RAZORPAY_KEY = "rzp_test_SLvcr6LP058gTz";

function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load Razorpay script if not already there
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const fetchBooking = async () => {
      try {
        const res = await API.get(`/bookings/${bookingId}`);
        setBooking(res.data);
      } catch {
        setError("Could not load booking details.");
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const orderRes = await API.post("/payment/create-order", { bookingId });
      const order = orderRes.data;

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "StayEase",
        description: `Booking for ${booking?.hotel?.name || "Hotel"}`,
        image: "",
        handler: async (response) => {
          try {
            await API.post("/payment/verify", {
              ...response,
              bookingId,
            });
            navigate("/dashboard", { state: { paymentSuccess: true } });
          } catch {
            setError("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: { color: "#6366f1" },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Try again.");
    }
    setLoading(false);
  };

  if (!booking && !error) return <div className="loading-screen">Loading payment details...</div>;

  return (
    <div className="payment-page page-wrapper">
      <div className="container">
        <div className="payment-card">
          <div className="payment-header">
            <span className="payment-icon">💳</span>
            <h1>Complete Payment</h1>
            <p>Secure payment powered by Razorpay</p>
          </div>

          {error && <div className="error-msg">{error}</div>}

          {booking && (
            <div className="payment-details">
              <div className="payment-row">
                <span>Hotel</span>
                <span>{booking.hotel?.name}</span>
              </div>
              <div className="payment-row">
                <span>Location</span>
                <span>{booking.hotel?.city}</span>
              </div>
              <div className="payment-row">
                <span>Room Type</span>
                <span>{booking.room?.roomType}</span>
              </div>
              <div className="payment-row">
                <span>Check-In</span>
                <span>{new Date(booking.checkIn).toLocaleDateString("en-IN", { dateStyle: "long" })}</span>
              </div>
              <div className="payment-row">
                <span>Check-Out</span>
                <span>{new Date(booking.checkOut).toLocaleDateString("en-IN", { dateStyle: "long" })}</span>
              </div>
              <div className="payment-row">
                <span>Guests</span>
                <span>{booking.guests}</span>
              </div>

              <div className="payment-total-row">
                <span>Total Amount</span>
                <span className="payment-total">₹{booking.totalPrice?.toLocaleString()}</span>
              </div>
            </div>
          )}

          <button
            className="btn btn-primary pay-btn"
            onClick={handlePayment}
            disabled={loading || !booking}
          >
            {loading ? "Processing..." : `Pay ₹${booking?.totalPrice?.toLocaleString() || ""}`}
          </button>

          <p className="payment-secure">🔒 Your payment is secured by Razorpay</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;