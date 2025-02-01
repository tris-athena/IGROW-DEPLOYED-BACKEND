import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CSS/Header.css';

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in (you can use sessionStorage, localStorage, or context)
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleLoginHover = () => {
    setShowLoginForm(true);
  };

  const handleLoginHoverOut = () => {
    setShowLoginForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4001/api/v1/login', {
        email,
        password,
      });

      console.log('Login Successful:', response.data);
      sessionStorage.setItem('user', JSON.stringify(response.data)); // Store user data in sessionStorage
      setIsLoggedIn(true); // Update login state
      navigate("/testimonials");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Login Failed. Please try again.');
      }
    }
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
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
              >
               Profile
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Login/Profile button wrapper */}
        <div
          className="login-wrapper"
          onMouseEnter={handleLoginHover}
          onMouseLeave={handleLoginHoverOut}
        >
          {!isLoggedIn ? (
            <>
              <a href="#login" className="login-button">
                LOGIN
              </a>

              {/* Conditionally render the login form when hovered */}
              {showLoginForm && (
                <div className="login-form">
                  <h2>LOGIN</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                  </form>
                  {errorMessage && <p className="error-message">{errorMessage}</p>}
                  <div className="form-links">
                    <Link to="/forgot-password">FORGOT PASSWORD?</Link>
                    <p>DON'T HAVE AN ACCOUNT YET? <Link to="/registration">SIGN UP</Link></p>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Show profile button after login, without the logout button
            <div className="form-group">
              {/* <a href="/profile" className="profile-button">
                Profile
              </a> */}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
