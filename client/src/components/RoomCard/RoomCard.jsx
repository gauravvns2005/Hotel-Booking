import { Link } from "react-router-dom";
import { FaUserFriends, FaBed } from "react-icons/fa";
import "./RoomCard.css";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop";

function RoomCard({ room }) {
  if (!room) return null;

  const img =
    room.images && room.images.length > 0 ? room.images[0] : FALLBACK_IMG;

  return (
    <div className="room-card">
      <div className="room-image-wrap">
        <img
          src={img}
          alt={room.roomType}
          onError={(e) => {
            e.target.src = FALLBACK_IMG;
          }}
        />
      </div>

      <div className="room-info">
        <h3 className="room-title">
          <FaBed /> {room.roomType}
        </h3>

        <p className="room-guests">
          <FaUserFriends /> Max Guests: {room.maxGuests}
        </p>

        <p className="room-price">
          ₹{room.price}
          <span>/ night</span>
        </p>

        <Link to={`/booking/${room._id}`}>
          <button className="room-btn">Book Room</button>
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;
