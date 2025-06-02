import React from 'react'
import './loginpage.css'
import Cookies from "js-cookie";
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const loginpage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) =>{
        e.preventDefault();
        const details = {
            username,
            password
        }
        const url = "/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details)
        }
        const response = await fetch(url,options)
        const data = await response.json();
        console.log("Login successful", data.jwt_token);
        if(response.status === 200){
            Cookies.set("token", data.jwt_token, { expires: 30 });
            navigate("/home" ,{replace: true});
        } else {
            alert("Invalid credentials");
        }
        
    }
    
  return (
    <div className='loginpage'>
        <div className='logincontainer'>
            <div className='card'>
                <div className='logo'>
                    <img src="https://res.cloudinary.com/ddlrkl4jy/image/upload/v1748684753/WhatsApp_Image_2025-05-31_at_15.15.43_1e65a17d_jpiauk.jpg"/>
                    <p className='name'>Tasty Kitchens</p>
                </div>
                <h1>Login</h1>
                <form className='loginform'>
                    <p>USERNAME</p>
                    <input type="text" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <p>PASSWORD</p>
                    <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className='login-button' type='submit' onClick={handleLogin} >Login</button>
                </form>
            </div>
        </div>
        <div className='loginimage'> 
            <img src='https://res.cloudinary.com/ddlrkl4jy/image/upload/v1748684608/ceff20e8367d1981f2a409a617ac848670d29c7e_yx513m.jpg'/>
        </div>
    </div>
  )
}

export default loginpage
