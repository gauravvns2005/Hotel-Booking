import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaStar, FaPlus } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import API from "../../services/api";
import "./Hotels.css";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400";

function Hotels() {
  const { hotels, fetchHotels } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

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

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-hotel")}
        >
          <FaPlus />
          Add Hotel
        </button>
      </div>

      <div className="card hotels-card">
        {hotels.length === 0 ? (
          <p className="hotels-empty">No hotels yet. Add your first hotel!</p>
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
                    <div className="hotel-info">
                      <img
                        src={h.images?.[0] || FALLBACK_IMG}
                        alt={h.name}
                        className="hotel-thumb"
                        onError={(e) => {
                          e.target.src = FALLBACK_IMG;
                        }}
                      />

                      <span className="hotel-name">{h.name}</span>
                    </div>
                  </td>

                  <td>{h.city}</td>

                  <td>{h.state}</td>

                  <td className="hotel-price">
                    ₹{h.pricePerNight?.toLocaleString()}
                  </td>

                  <td className="hotel-rating">
                    {h.rating > 0 ? (
                      <>
                        <FaStar />
                        {Number(h.rating).toFixed(1)}
                      </>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteHotel(h._id)}
                    >
                      <FaTrash />
                      Delete
                    </button>
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
