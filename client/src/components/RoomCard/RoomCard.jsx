import { Link } from "react-router-dom"
import "./RoomCard.css"

function RoomCard({room}){

 return(

  <div className="room-card">

   <img src={room.images[0]} />

   <div className="room-info">

    <h3>{room.roomType}</h3>

    <p>Max Guests: {room.maxGuests}</p>

    <p>₹{room.price}</p>

    <Link to={`/booking/${room._id}`}>
     <button>Book Room</button>
    </Link>

   </div>

  </div>

 )

}

export default RoomCard