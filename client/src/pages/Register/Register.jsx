import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaHotel, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaLock, 
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaStar,
  FaRegSmile
} from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import "./Register.css";

function Register() {
  const { registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (!agreeTerms) {
      return setError("Please agree to the Terms & Conditions");
    }

    setLoading(true);

    try {
      await registerUser({ name, email, phone, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length >= 6 && password.length < 8) return 2;
    return 3;
  };

  const getStrengthText = () => {
    const strength = passwordStrength();
    if (strength === 0) return "";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Medium";
    return "Strong";
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Section - Brand/Info */}
        <div className="register-left">
          <div className="register-left-content">
            <div className="brand-header">
              <FaHotel className="brand-icon" />
              <span className="brand-name">StayEase</span>
            </div>

            <div className="brand-message">
              <h1>Join the StayEase Community</h1>
              <p>Create an account to unlock exclusive deals and manage your bookings effortlessly.</p>
            </div>

            <div className="brand-features">
              <div className="feature-item">
                <FaCheckCircle />
                <div>
                  <h4>Exclusive Member Rates</h4>
                  <p>Get up to 20% off on hotel bookings</p>
                </div>
              </div>
              <div className="feature-item">
                <FaCheckCircle />
                <div>
                  <h4>Easy Booking Management</h4>
                  <p>View and manage all your reservations</p>
                </div>
              </div>
              <div className="feature-item">
                <FaCheckCircle />
                <div>
                  <h4>Secure Payments</h4>
                  <p>100% secure payment gateway</p>
                </div>
              </div>
              <div className="feature-item">
                <FaCheckCircle />
                <div>
                  <h4>24/7 Customer Support</h4>
                  <p>We're here to help anytime</p>
                </div>
              </div>
            </div>

            <div className="brand-testimonial">
              <div className="testimonial-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p>"Best hotel booking platform! Amazing deals and excellent service."</p>
              <div className="testimonial-author">
                <FaRegSmile />
                <span>Rahul Sharma</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="register-right">
          <div className="register-card">
            <div className="register-header">
              <h2>Create Account</h2>
              <p>Start your journey with us today</p>
            </div>

            {error && (
              <div className="error-message">
                <FaLock />
                {error}
              </div>
            )}

            <form onSubmit={submit} className="register-form">
              <div className="form-group">
                <label>
                  <FaUser />
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope />
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaPhone />
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaLock />
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {password && (
                  <div className="password-strength">
                    <div className={`strength-bar strength-${passwordStrength()}`}></div>
                    <span className={`strength-text strength-${passwordStrength()}`}>
                      {getStrengthText()} password
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span className="checkbox-text">
                    I agree to the <Link to="/terms">Terms & Conditions</Link> and 
                    <Link to="/privacy"> Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="register-divider">
              <span>OR</span>
            </div>

            <div className="register-footer">
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>

            {/* <div className="secure-note">
              <FaShieldAlt />
              <span>Your information is secure with us</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;