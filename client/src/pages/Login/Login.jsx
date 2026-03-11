import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHotel, FaEnvelope, FaLock } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import "./Login.css";

function Login() {
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="auth-page">
      <div className="auth-card">
        {/* LEFT IMAGE */}

        <div className="auth-left">
          <div className="auth-left-overlay">
            <h2>Find Your Perfect Stay</h2>

            <p>Book hotels easily and enjoy comfortable stays anywhere.</p>
          </div>
        </div>

        {/* RIGHT FORM */}

        <div className="auth-right">
          <div className="auth-logo">
            <FaHotel /> StayEase
          </div>

          <h2 className="auth-title">Welcome Back</h2>

          <p className="auth-subtitle">Sign in to continue</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={submit}>
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
              <label>Password</label>

              <div className="input-wrap">
                <FaLock />

                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?
            <Link to="/register"> Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
