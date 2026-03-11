import { useState, useContext } from "react";
import { FaHotel, FaEnvelope, FaLock } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import "./Login.css";

function AdminLogin() {
  const { adminLogin } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await adminLogin(email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* LEFT IMAGE */}

        <div className="admin-login-left">
          <div className="admin-login-overlay">
            <h2>StayEase Admin</h2>

            <p>Manage hotels, bookings and users from your admin dashboard.</p>
          </div>
        </div>

        {/* RIGHT FORM */}

        <div className="admin-login-right">
          <div className="admin-login-logo">
            <FaHotel /> StayEase
          </div>

          <h1>Admin Login</h1>

          <p className="admin-login-sub">Sign in to manage your platform</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrap">
                <FaEnvelope />

                <input
                  className="form-control"
                  type="email"
                  placeholder="admin@stayease.com"
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

            <button
              className="btn btn-primary login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
