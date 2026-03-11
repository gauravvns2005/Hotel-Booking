import { FaStar, FaUser } from "react-icons/fa";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user">
          <FaUser className="review-icon" />

          <span>{review.user?.name}</span>
        </div>

        <div className="review-rating">
          <FaStar className="star" />

          {review.rating}
        </div>
      </div>

      <p className="review-comment">{review.comment}</p>
    </div>
  );
}

export default ReviewCard;
