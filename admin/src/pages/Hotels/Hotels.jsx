import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import API from "../../services/api";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400";

function Hotels() {
  const { hotels, fetchHotels } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => { fetchHotels(); }, []);

  const deleteHotel = async (id) => {
    if (!window.confirm("Delete this hotel? This cannot be undone.")) return;
    try {
      await API.delete(`/admin/hotels/${id}`);
      fetchHotels();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Hotels</h1>
          <p className="page-subtitle">{hotels.length} hotels listed</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/add-hotel")}>+ Add Hotel</button>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        {hotels.length === 0 ? (
          <p style={{ color: "var(--text-muted)", padding: "2rem 0", textAlign: "center" }}>No hotels yet. Add your first hotel!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hotel</th>
                <th>City</th>
                <th>State</th>
                <th>Price/Night</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((h) => (
                <tr key={h._id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img src={h.images?.[0] || FALLBACK_IMG} alt={h.name}
                        style={{ width: 48, height: 36, objectFit: "cover", borderRadius: "6px" }}
                        onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                      <span style={{ fontWeight: 600 }}>{h.name}</span>
                    </div>
                  </td>
                  <td>{h.city}</td>
                  <td>{h.state}</td>
                  <td style={{ fontWeight: 600, color: "var(--primary-light)" }}>₹{h.pricePerNight?.toLocaleString()}</td>
                  <td>{h.rating > 0 ? `⭐ ${Number(h.rating).toFixed(1)}` : "—"}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteHotel(h._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Hotels;