import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import "./Bookings.css";

function Bookings() {
  const { bookings, fetchBookings } = useContext(AdminContext);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const filtered = bookings.filter((b) => {
    if (filter === "paid") return b.paymentStatus === "paid";

    if (filter === "pending") return b.paymentStatus === "pending";

    if (filter === "cancelled") return b.bookingStatus === "cancelled";

    return true;
  });

  const getStatusBadge = (status, payStatus) => {
    if (status === "cancelled")
      return <span className="badge badge-danger">Cancelled</span>;

    if (payStatus === "paid")
      return <span className="badge badge-success">Paid</span>;

    return <span className="badge badge-warning">Pending</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Bookings</h1>

          <p className="page-subtitle">{bookings.length} total bookings</p>
        </div>
      </div>

      {/* FILTER */}

      <div className="booking-filters">
        {["all", "paid", "pending", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-secondary"}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="card booking-card">
        {filtered.length === 0 ? (
          <p className="booking-empty">No bookings found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Guest</th>

                <th>Hotel</th>

                <th>Room</th>

                <th>Check-In</th>

                <th>Check-Out</th>

                <th>Guests</th>

                <th>Amount</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((b) => (
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

                  <td>
                    {new Date(b.checkOut).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </td>

                  <td>{b.guests}</td>

                  <td className="booking-amount">
                    ₹{b.totalPrice?.toLocaleString()}
                  </td>

                  <td>{getStatusBadge(b.bookingStatus, b.paymentStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Bookings;
