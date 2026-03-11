import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaHotel,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";

import { AdminContext } from "../../context/AdminContext";
import "./Dashboard.css";

function Dashboard() {
  const { stats, bookings, fetchStats, fetchBookings } =
    useContext(AdminContext);

  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, []);

  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? "—",
      icon: <FaUsers />,
      className: "users-card",
    },

    {
      label: "Total Hotels",
      value: stats?.totalHotels ?? "—",
      icon: <FaHotel />,
      className: "hotels-card",
    },

    {
      label: "Total Bookings",
      value: stats?.totalBookings ?? "—",
      icon: <FaClipboardList />,
      className: "bookings-card",
    },

    {
      label: "Total Revenue",
      value: stats?.totalRevenue
        ? `₹${Number(stats.totalRevenue).toLocaleString()}`
        : "₹0",
      icon: <FaMoneyBillWave />,
      className: "revenue-card",
    },
  ];

  const recentBookings = bookings.slice(0, 5);

  const getStatusBadge = (status, payStatus) => {
    if (status === "cancelled")
      return <span className="badge badge-danger">Cancelled</span>;

    if (payStatus === "paid")
      return <span className="badge badge-success">Paid</span>;

    return <span className="badge badge-warning">Pending"</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>

          <p className="page-subtitle">
            Welcome back! Here's what's happening.
          </p>
        </div>

        <Link to="/add-hotel" className="btn btn-primary">
          Add Hotel
        </Link>
      </div>

      {/* STAT CARDS */}

      <div className="stat-cards">
        {statCards.map((s) => (
          <div key={s.label} className={`stat-card ${s.className}`}>
            <div className="stat-icon">{s.icon}</div>

            <div className="stat-val">{s.value}</div>

            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* RECENT BOOKINGS */}

      <div className="card">
        <div className="dashboard-table-header">
          <h2 className="dashboard-table-title">Recent Bookings</h2>

          <Link to="/bookings" className="btn btn-sm btn-secondary">
            View All
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="dashboard-empty">No bookings yet.</p>
        ) : (
          <div className="table-wrapper">
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
                      <div className="guest-name">{b.user?.name}</div>

                      <div className="guest-email">{b.user?.email}</div>
                    </td>

                    <td>{b.hotel?.name}</td>

                    <td>{b.room?.roomType}</td>

                    <td>
                      {new Date(b.checkIn).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </td>

                    <td className="dashboard-amount">
                      ₹{b.totalPrice?.toLocaleString()}
                    </td>

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
