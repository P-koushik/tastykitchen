import React from 'react'
import {useNavigate} from 'react-router-dom'
// import Cookies from 'js-cookie'
import './Notfound.css'

const Notfound = () => {
    const navigate = useNavigate();
  return (
    <div className='notfound-container'>
        <img src="https://assets.ccbp.in/frontend/react-js/not-found-img.png" alt="not found" className='notfoundimage' />
        <p>We are sorry, the page you requested could not be found.<br></br>Please go back to the homepage</p>
        <button onClick={() => navigate("/home")} className='notfound-button'>Go to Home</button>
    </div>
  )
}

export default Notfound
