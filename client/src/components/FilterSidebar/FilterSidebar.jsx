import { useState } from "react"
import "./FilterSidebar.css"

function FilterSidebar({apply}){

 const [minPrice,setMinPrice]=useState("")
 const [maxPrice,setMaxPrice]=useState("")
 const [rating,setRating]=useState("")

 const submit=()=>{
  apply({minPrice,maxPrice,rating})
 }

 return(

  <div className="filters">

   <h3>Filters</h3>

   <input placeholder="Min price"
   onChange={(e)=>setMinPrice(e.target.value)}/>

   <input placeholder="Max price"
   onChange={(e)=>setMaxPrice(e.target.value)}/>

   <input placeholder="Rating"
   onChange={(e)=>setRating(e.target.value)}/>

   <button onClick={submit}>Apply</button>

  </div>

 )

}

export default FilterSidebar