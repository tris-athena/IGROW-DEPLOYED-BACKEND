import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../../CSS/Header.css';
import axios from 'axios';
function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem('user'); // Directly check sessionStorage
  const userName = isLoggedIn ? JSON.parse(isLoggedIn).name : ''; // Get user name from sessionStorage

  useEffect(() => {
    // Optionally, you can log or do something when the component loads
    // But since no state is necessary here, we don't need to update state based on sessionStorage.
  }, []);

  const handleLoginHover = () => setShowLoginForm(true);
  const handleLoginHoverOut = () => setShowLoginForm(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/v1/login', { email, password });
      sessionStorage.setItem('user', JSON.stringify(response.data));
      setEmail('');
      setPassword('');
      navigate("/testimonials");
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Login Failed. Please try again.');
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
            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>Home</NavLink></li>
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
                    <Link to="/forgot-password">FORGOT PASSWORD?</Link>
                    <p>DON'T HAVE AN ACCOUNT YET? <Link to="/registration">SIGN UP</Link></p>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default Header;
