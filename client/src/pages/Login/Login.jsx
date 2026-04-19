import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaHotel, 
  FaEnvelope, 
  FaLock, 
  FaArrowRight,
  FaShieldAlt,
  FaStar,
  FaRegHeart,
  FaCheckCircle,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import "./Login.css";

function Login() {
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section - Brand/Info */}
        <div className="login-left">
          <div className="login-left-content">
            <div className="brand-header">
              <FaHotel className="brand-icon" />
              <span className="brand-name">StayEase</span>
            </div>

            <div className="brand-message">
              <h1>Welcome Back</h1>
              <p>Sign in to access your account and manage your bookings.</p>
            </div>

            <div className="brand-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Hotels</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50k+</div>
                <div className="stat-label">Happy Guests</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>

            <div className="brand-features">
              <div className="feature-item">
                <FaCheckCircle />
                <span>Best Price Guarantee</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle />
                <span>Free Cancellation</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle />
                <span>Secure Payments</span>
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
              <p>"Amazing platform! Found the best deals and easy booking process."</p>
              <div className="testimonial-author">
                <strong>Priya Sharma</strong>
                <span>Verified Traveler</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="login-right">
          <div className="login-card">
            <div className="login-header">
              <div className="login-logo">
                <FaHotel />
                <span>StayEase</span>
              </div>
              <h2>Sign In</h2>
              <p>Access your account to manage bookings</p>
            </div>

            {error && (
              <div className="error-message">
                <FaLock />
                {error}
              </div>
            )}

            <form onSubmit={submit} className="login-form">
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
                  <FaLock />
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="login-divider">
              <span>OR</span>
            </div>

            {/* <div className="demo-credentials">
              <p className="demo-title">Demo Credentials</p>
              <div className="demo-item">
                <span>Email:</span>
                <code>user@example.com</code>
              </div>
              <div className="demo-item">
                <span>Password:</span>
                <code>password123</code>
              </div>
            </div> */}

            <div className="login-footer">
              <p>
                Don't have an account? <Link to="/register">Create Account</Link>
              </p>
            </div>

            {/* <div className="secure-note">
              <FaShieldAlt />
              <span>Secure login with 256-bit encryption</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;