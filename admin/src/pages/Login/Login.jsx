import { useState, useContext } from "react";
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
      setError(err.response?.data?.message || err.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">🏨 StayEase Admin</div>
        <h1>Admin Login</h1>
        <p className="admin-login-sub">Sign in to manage your hotel platform</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email Address</label>
            <input className="form-control" type="email" placeholder="admin@stayease.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" placeholder="Enter admin password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary login-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In to Admin Panel"}
          </button>
        </form>

        <div className="admin-credentials-hint">
          <p>Default credentials:</p>
          <code>admin@stayease.com</code> / <code>Admin@123</code>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Run <code>POST /api/auth/seed-admin</code> if first time
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
