import { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import API from "../../services/api";
import HotelCard from "../../components/HotelCard/HotelCard";
import "./Wishlist.css";

function Wishlist(){

const [list,setList] = useState([]);
const [loading,setLoading] = useState(true);

const fetchWishlist = async ()=>{

try{

const res = await API.get("/wishlist");
setList(res.data);

}catch{}

setLoading(false);

};

const removeFromWishlist = async (hotelId)=>{

try{

await API.delete(`/wishlist/${hotelId}`);

setList(prev =>
prev.filter(item => item.hotel?._id !== hotelId)
);

}catch{}

};

useEffect(()=>{

fetchWishlist();

},[]);


if(loading)
return <div className="loading-screen">Loading wishlist...</div>;


return(

<div className="wishlist-page page-wrapper">

<div className="container">

<h1 className="section-heading">
My Wishlist
</h1>

<p className="section-subheading">
Hotels you've saved for later
</p>


{list.length === 0 ? (

<div className="no-wishlist">

<FaHeart className="empty-icon"/>

<h3>Your wishlist is empty</h3>

<p>
Explore hotels and save your favorites
</p>

</div>

) : (

<div className="wishlist-grid">

{list.map(item => (

item.hotel && (

<div key={item._id} className="wishlist-item-wrap">

<HotelCard hotel={item.hotel}/>

<button
className="remove-btn"
onClick={()=>removeFromWishlist(item.hotel._id)}
>

<FaTrash />

Remove

</button>

</div>

)

))}

</div>

)}

</div>

</div>

)

}

export default Wishlist