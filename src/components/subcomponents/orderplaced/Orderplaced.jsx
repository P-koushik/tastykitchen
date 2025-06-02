import React from 'react'
import Header from '../header/Header'
import './Orderplaced.css'
import { useNavigate } from 'react-router-dom'


const Orderplaced = () => {
    const Navigate = useNavigate();
  return (
    <div>
        <Header />
      <div className="cart-success">
        <img src="" alt="" />
        <h2 className="cart-success-title">Payment Successful!</h2>
        <p className="cart-success-msg">Thank you for ordering <br/>Your payment is successfully completed.</p>
        <button className="cart-success-btn" onClick={()=>Navigate("/home")}>Go to Home Page</button>
      </div>
    </div>
  )
}

export default Orderplaced