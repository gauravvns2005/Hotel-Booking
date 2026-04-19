import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaCreditCard,
  FaShieldAlt,
  FaLock,
  FaHotel,
  FaMapMarkerAlt,
  FaBed,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
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
        theme: { color: "#000000" },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Try again.");
      setLoading(false);
    }
  };

  if (!booking && !error) {
    return (
      <div className="payment-loading">
        <div className="loading-spinner"></div>
        <p>Loading payment details...</p>
      </div>
    );
  }

  const calculateNights = () => {
    if (booking?.checkIn && booking?.checkOut) {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const nights = calculateNights();
  const subtotal = booking?.totalPrice || 0;
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax;

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Header Section */}
        <div className="payment-header-section">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
            Back
          </button>
          <div className="payment-header-content">
            <div className="payment-icon-wrapper">
              <FaCreditCard />
            </div>
            <h1>Secure Payment</h1>
            <p>Complete your booking with secure payment</p>
          </div>
        </div>

        {error && (
          <div className="error-alert">
            <FaLock />
            {error}
          </div>
        )}

        {booking && (
          <div className="payment-main-grid">
            {/* Left Column - Booking Summary */}
            <div className="payment-left">
              <div className="summary-card">
                <div className="summary-card-header">
                  <h3>Booking Summary</h3>
                  <div className="secure-badge">
                    <FaShieldAlt />
                    Secure
                  </div>
                </div>

                {/* Hotel Info */}
                <div className="hotel-summary">
                  <div className="hotel-summary-icon">
                    <FaHotel />
                  </div>
                  <div className="hotel-summary-details">
                    <h4>{booking.hotel?.name}</h4>
                    <p>
                      <FaMapMarkerAlt />
                      {booking.hotel?.city}, {booking.hotel?.state}
                    </p>
                  </div>
                </div>

                {/* Room Info */}
                <div className="room-summary">
                  <div className="room-summary-item">
                    <FaBed />
                    <div>
                      <span>Room Type</span>
                      <strong>{booking.room?.roomType}</strong>
                    </div>
                  </div>
                  <div className="room-summary-item">
                    <FaUsers />
                    <div>
                      <span>Guests</span>
                      <strong>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</strong>
                    </div>
                  </div>
                </div>

                {/* Date Summary */}
                <div className="date-summary">
                  <div className="date-item">
                    <FaCalendarAlt />
                    <div>
                      <span>Check-in</span>
                      <strong>
                        {new Date(booking.checkIn).toLocaleDateString("en-US", {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </strong>
                    </div>
                  </div>
                  <div className="date-arrow">→</div>
                  <div className="date-item">
                    <FaCalendarAlt />
                    <div>
                      <span>Check-out</span>
                      <strong>
                        {new Date(booking.checkOut).toLocaleDateString("en-US", {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Night Count */}
                <div className="night-count">
                  <span>Total Nights</span>
                  <strong>{nights} night{nights > 1 ? 's' : ''}</strong>
                </div>
              </div>

              {/* Payment Methods */}
              {/* <div className="payment-methods-card">
                <h3>Payment Methods</h3>
                <div className="payment-methods">
                  <div className="payment-method active">
                    <FaCreditCard />
                    <span>Credit / Debit Card</span>
                    <FaCheckCircle className="check-icon" />
                  </div>
                  <div className="payment-method">
                    <div className="upi-icon">UPI</div>
                    <span>UPI / QR Code</span>
                  </div>
                  <div className="payment-method">
                    <div className="netbanking-icon">NB</div>
                    <span>Net Banking</span>
                  </div>
                  <div className="payment-method">
                    <div className="wallet-icon">W</div>
                    <span>Mobile Wallet</span>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Column - Payment Details */}
            <div className="payment-right">
              <div className="payment-details-card">
                <h3>Payment Details</h3>

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Room Rent</span>
                    <span>₹{booking.room?.price?.toLocaleString()} × {nights} nights</span>
                  </div>
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>Taxes & Fees (18% GST)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="price-divider"></div>
                  
                  <div className="price-total">
                    <span>Total Amount</span>
                    <div className="total-amount">
                      <FaRupeeSign />
                      {grandTotal.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="payment-security">
                  <FaLock />
                  <div>
                    <strong>Secure Payment</strong>
                    <p>Your transaction is encrypted and secure</p>
                  </div>
                </div>

                <button
                  className="pay-now-button"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="button-spinner"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <FaCreditCard />
                      Pay ₹{grandTotal.toLocaleString()}
                    </>
                  )}
                </button>

                {/* <div className="payment-footer">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                    alt="Visa"
                    className="payment-card-icon"
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                    alt="Mastercard"
                    className="payment-card-icon"
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/RuPay.svg/1200px-RuPay.svg.png" 
                    alt="RuPay"
                    className="payment-card-icon"
                  />
                  <span>+ More</span>
                </div> */}
              </div>

              {/* Cancellation Policy */}
              {/* <div className="policy-card">
                <h4>Cancellation Policy</h4>
                <p>Free cancellation up to 24 hours before check-in. Cancel within 24 hours and get 50% refund.</p>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;