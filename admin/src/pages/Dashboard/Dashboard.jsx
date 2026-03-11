import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

function Dashboard() {
  const { stats, bookings, fetchStats, fetchBookings } = useContext(AdminContext);

  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, []);

  const statCards = [
    { label: "Total Users", value: stats?.totalUsers ?? "—", icon: "👥", color: "#6366f1" },
    { label: "Total Hotels", value: stats?.totalHotels ?? "—", icon: "🏨", color: "#f59e0b" },
    { label: "Total Bookings", value: stats?.totalBookings ?? "—", icon: "📋", color: "#22c55e" },
    { label: "Total Revenue", value: stats?.totalRevenue ? `₹${Number(stats.totalRevenue).toLocaleString()}` : "₹0", icon: "💰", color: "#ec4899" },
  ];

  const recentBookings = bookings.slice(0, 5);

  const getStatusBadge = (status, payStatus) => {
    if (status === "cancelled") return <span className="badge badge-danger">Cancelled</span>;
    if (payStatus === "paid") return <span className="badge badge-success">Paid</span>;
    return <span className="badge badge-warning">Pending</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening.</p>
        </div>
        <Link to="/add-hotel" className="btn btn-primary">+ Add Hotel</Link>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        {statCards.map((s) => (
          <div key={s.label} className="stat-card" style={{ "--card-accent": s.color }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-val">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <div className="page-header" style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700 }}>Recent Bookings</h2>
          <Link to="/bookings" className="btn btn-sm btn-secondary">View All</Link>
        </div>

        {recentBookings.length === 0 ? (
          <p style={{ color: "var(--text-muted)", padding: "1rem 0" }}>No bookings yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Hotel</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.user?.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{b.user?.email}</div>
                    </td>
                    <td>{b.hotel?.name}</td>
                    <td>{b.room?.roomType}</td>
                    <td>{new Date(b.checkIn).toLocaleDateString("en-IN", { dateStyle: "medium" })}</td>
                    <td style={{ fontWeight: 600, color: "var(--primary-light)" }}>₹{b.totalPrice?.toLocaleString()}</td>
                    <td>{getStatusBadge(b.bookingStatus, b.paymentStatus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;