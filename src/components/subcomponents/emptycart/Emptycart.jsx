import React from 'react'
import "./Emptycart.css" // 
import { useNavigate } from 'react-router-dom'

const Emptycart = () => {
    const navigate = useNavigate();
  return (
    <div className='emptycart-container'>
            <img src='https://res.cloudinary.com/ddlrkl4jy/image/upload/v1748753112/afa06a92-dfea-426d-9324-521ba7ff3dad.png' className='emptycartimage'/>
      <h1>No Orders Yet!</h1>
      <p>Your cart is empty. Add something from the menu.</p>
      <button onClick={()=>navigate("/home")} className='orderbutton'>order Now</button>
    </div>
  )
}

export default Emptycart
