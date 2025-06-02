import "./Header.css";
import Cookies from "js-cookie";
import {useNavigate,Link} from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove("token");
        navigate("/login"); // Redirect to login page
    };

    return (
        <header className="header">
            <h1 className="header-title">Tasty Kitchens</h1>
            <nav className="header-nav">
                <Link to="/home" className="header-link">Home</Link>
                <Link to="/cart" className="header-link">cart</Link>
                <button className="header-button" onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
}

export default Header;