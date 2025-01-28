import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
          <a href="/">
            <img src="images/logoIGROW.png" alt="iGROW Logo" className="logo" />
          </a>
          <div className="website-name">
            <h2 className="website-name__main">iGROW</h2>
            <p className="website-name__sub">Transforming Agriculture with Smart Solutions</p>
          </div>
        </div>

        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/testimonials"
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
              >
                Testimonials
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Login hover wrapper */}
        <div
          className="login-wrapper"
          onMouseEnter={handleLoginHover}
          onMouseLeave={handleLoginHoverOut}
        >
          <a href="#login" className="login-button">
            LOGIN
          </a>

          {/* Conditionally render the login form when hovered */}
          {showLoginForm && (
            <div className="login-form">
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
        </div>
      </header>
    </div>
  );
}

export default Header;
