import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../../CSS/Header.css';

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginHover = () => {
    setShowLoginForm(true);
  };

  const handleLoginHoverOut = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className="logo-section">
          <img src="images/Logo.png" alt="iGROW Logo" className="logo" />
          <div className="website-name">
            <h1 className="website-name__main">iGROW</h1>
            <p className="website-name__sub">Transforming Agriculture with Smart Solutions</p>
          </div>
        </div>

        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><a href="/testimonials">Testimonials</a></li>
          </ul>
          <a 
            href="#login" 
            className="login-button" 
            onMouseEnter={handleLoginHover} 
            
          >
            LOGIN
          </a>

          {/* Conditionally render the login form when hovered */}
          {showLoginForm && (
            <div className="login-form" onMouseLeave={handleLoginHoverOut}>
              <h2>LOGIN</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="login-btn">Login</button>
              </form>
              <div className="form-links">
                <Link to="/forgot-password">FORGOT PASSWORD?</Link>
                <p>DON'T HAVE AN ACCOUNT YET? <Link to="/registration">SIGN UP</Link></p>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
