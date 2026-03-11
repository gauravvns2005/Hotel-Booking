import { useState } from "react"
import { FaFilter } from "react-icons/fa"
import "./FilterSidebar.css"

function FilterSidebar({ apply }) {

const [minPrice,setMinPrice] = useState("")
const [maxPrice,setMaxPrice] = useState("")
const [rating,setRating] = useState("")

const submit = () => {

apply({minPrice,maxPrice,rating})

}

return(

<div className="filters">

<h3 className="filter-title">
<FaFilter /> Filters
</h3>


<div className="filter-group">

<label>Min Price</label>

<input
type="number"
placeholder="0"
value={minPrice}
onChange={(e)=>setMinPrice(e.target.value)}
/>

</div>


<div className="filter-group">

<label>Max Price</label>

<input
type="number"
placeholder="5000"
value={maxPrice}
onChange={(e)=>setMaxPrice(e.target.value)}
/>

</div>


<div className="filter-group">

<label>Rating</label>

<input
type="number"
placeholder="4"
value={rating}
onChange={(e)=>setRating(e.target.value)}
/>

</div>


<button className="filter-btn" onClick={submit}>
Apply Filters
</button>

</div>

)

}

export default FilterSidebar