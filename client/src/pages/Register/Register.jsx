import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHotel, FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import "../Login/Login.css";

function Register() {
  const { registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
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

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* LEFT IMAGE */}

        <div className="auth-left">
          <div className="auth-left-overlay">
            <h2>Start Your Journey</h2>

            <p>
              Discover amazing hotels and book your perfect stay with StayEase.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}

        <div className="auth-right">
          <div className="auth-logo">
            <FaHotel /> StayEase
          </div>

          <h2 className="auth-title">Create Account</h2>

          <p className="auth-subtitle">Join thousands of travelers</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-wrap">
                <FaUser />

                <input
                  className="form-control"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrap">
                <FaEnvelope />

                <input
                  className="form-control"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <div className="input-wrap">
                <FaPhone />

                <input
                  className="form-control"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-wrap">
                <FaLock />

                <input
                  className="form-control"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?
            <Link to="/login"> Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
