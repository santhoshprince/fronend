import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({onLogout}) => {
  const navigate = useNavigate();

  const handleLogout = ({}) => {
    localStorage.removeItem('token'); // Remove token (if using authentication)
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" /> {/* Add your logo here */}
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/about" className="nav-item">About Us</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
      </nav>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </header>
  );
};

export default Header;
