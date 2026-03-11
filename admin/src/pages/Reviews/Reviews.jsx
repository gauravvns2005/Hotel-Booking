import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import API from "../../services/api";

function Reviews() {
  const { adminToken } = useContext(AdminContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await API.get("/admin/reviews");
      setReviews(res.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await API.delete(`/admin/reviews/${id}`);
      fetchReviews();
    } catch {}
  };

  const renderStars = (n) => "⭐".repeat(Math.min(n, 5));

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Reviews</h1><p className="page-subtitle">{reviews.length} total reviews</p></div>
      </div>

      {loading ? <div className="loading-screen">Loading reviews...</div> : (
        <div className="card" style={{ overflowX: "auto" }}>
          {reviews.length === 0 ? (
            <p style={{ color: "var(--text-muted)", padding: "2rem 0", textAlign: "center" }}>No reviews yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Hotel</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r._id}>
                    <td style={{ fontWeight: 600, fontSize: "0.88rem" }}>{r.user?.name}</td>
                    <td style={{ fontSize: "0.88rem" }}>{r.hotel?.name}</td>
                    <td>{renderStars(r.rating)}</td>
                    <td style={{ maxWidth: "250px", fontSize: "0.85rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.comment}</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{new Date(r.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => deleteReview(r._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Reviews;