import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../CSS/Header.css';
import axios from 'axios';

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem('user'); // Check sessionStorage for login state

  const handleLoginHover = () => setShowLoginForm(true);
  const handleLoginHoverOut = () => setShowLoginForm(false);

  // Handle form submission for login
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/v1/login', { email, password });
      
      // Log the response data to check the role
      console.log('Login response:', response.data);
  
      sessionStorage.setItem('user', JSON.stringify(response.data)); // Store user info in sessionStorage
  
      const user = response.data;
  
      // Check user role and redirect accordingly
      if (user.role === 'admin') {
        console.log('Redirecting to dashboard...');
        navigate('/admin/dashboard'); // Redirect to dashboard if admin
      } else {
        console.log('Redirecting to landing...');
        navigate('/landing'); // Redirect to landing page for regular user
      }
  
      // Clear form fields after successful login
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Login Failed. Please try again.');
    }
  };
  

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/landing'); // Redirect to landing page if logged in
    } else {
      navigate('/'); // Redirect to homepage if not logged in
    }
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className="logo-section">
          {/* Replace the anchor tag with a div and handle click with a function */}
          <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="images\logoIGROW.png" alt="iGROW Logo" className="logo" />
          </div>
          <div className="website-name">
            <h2 className="website-name__main">iGROW</h2>
            <p className="website-name__sub">Transforming Agriculture with Smart Solutions</p>
          </div>
        </div>

        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <NavLink
                to={isLoggedIn ? "/landing" : "/"} // Redirect to landing page if logged in, else to default home
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
              >
                Home
              </NavLink>
            </li>
            <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>About</NavLink></li>
            <li><NavLink to="/testimonials" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>Testimonials</NavLink></li>
            {isLoggedIn && (
              <li><NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>Profile</NavLink></li>
            )}
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
                    <NavLink to="/forgot-password">FORGOT PASSWORD?</NavLink>
                    <br />
                    <NavLink to="/registration">DON'T HAVE AN ACCOUNT YET? SIGN UP</NavLink>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Only show login button when not logged in
            <></>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
