import { useContext, useEffect, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import API from "../../services/api";
import "./Reviews.css";

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

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await API.delete(`/admin/reviews/${id}`);
      fetchReviews();
    } catch {}
  };

  const renderStars = (n) => {
    return [...Array(Math.min(n, 5))].map((_, i) => (
      <FaStar key={i} className="review-star" />
    ));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reviews</h1>

          <p className="page-subtitle">{reviews.length} total reviews</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-screen">Loading reviews...</div>
      ) : (
        <div className="card reviews-card">
          {reviews.length === 0 ? (
            <p className="reviews-empty">No reviews yet.</p>
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
                {reviews.map((r) => (
                  <tr key={r._id}>
                    <td className="review-user">{r.user?.name}</td>

                    <td className="review-hotel">{r.hotel?.name}</td>

                    <td className="review-stars">{renderStars(r.rating)}</td>

                    <td className="review-comment">{r.comment}</td>

                    <td className="review-date">
                      {new Date(r.createdAt).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteReview(r._id)}
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
      )}
    </div>
  );
}

export default Reviews;
