import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../CSS/Header.css';
import axios from 'axios';
import {
  FaBars,
  FaTachometerAlt,
  FaWater,
  FaFilter,
  FaRecycle,
  FaFish,
  FaSolarPanel,
  FaUsers,
  FaHome,
  FaSignOutAlt,
} from 'react-icons/fa';

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem('user');
  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const handleLoginHover = () => setShowLoginForm(true);
  const handleLoginHoverOut = () => setShowLoginForm(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/v1/login', { email, password });
      sessionStorage.setItem('user', JSON.stringify(response.data));
      const user = response.data;

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/landing');
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Login Failed. Please try again.');
    }
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/landing');
    } else {
      navigate('/');
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt className="sidebar-icon" /> },
    { label: 'Water Collection', path: '/admin/water-collection', icon: <FaWater className="sidebar-icon" /> },
    { label: 'Water Supply', path: '/admin/water-supply', icon: <FaWater className="sidebar-icon" /> },
    { label: 'Water Filtration', path: '/admin/water-filtration', icon: <FaFilter className="sidebar-icon" /> },
    { label: 'Water Drain', path: '/admin/water-drain', icon: <FaRecycle className="sidebar-icon" /> },
    { label: 'Fish Feeding', path: '/admin/fish-feeding', icon: <FaFish className="sidebar-icon" /> },
    { label: 'Solar Power', path: '/admin/solar-panel', icon: <FaSolarPanel className="sidebar-icon" /> },
    { label: 'User Management', path: '/admin/user-management', icon: <FaUsers className="sidebar-icon" /> },
    { label: 'Home', path: '/', icon: <FaHome className="sidebar-icon" /> },
    { label: 'Logout', path: '/login', icon: <FaSignOutAlt className="sidebar-icon" /> },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Clear user data from sessionStorage
    navigate("/"); // Navigate to the home page after logout
  };

  return (
    <div className="header-container">
      {/* Sidebar toggle button */}
      {isLoggedIn && JSON.parse(isLoggedIn)?.role === 'admin' && (
        <>
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars size={24} />
          </div>
          <div className={`sidebar ${isSidebarVisible ? 'active' : ''}`}>
            <div className="sidebar-header">
              <img src="/images/logoIGROW.png" alt="iGROW Logo" className="logo" />
              <span className="logo-text">iGROW</span>
            </div>

            <ul>
              {navItems.map(({ label, path, icon }) => (
                <li key={path} onClick={path === "/login" ? () => handleLogout() : () => {
                  navigate(path)

                }}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <header className="header">
        <div className="logo-section">
          <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/images/logoIGROW.png" alt="iGROW Logo" className="logo" />
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
                to={isLoggedIn ? "/landing" : "/"}
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

        <div className="login-wrapper" onMouseEnter={handleLoginHover} onMouseLeave={handleLoginHoverOut}>
          {!isLoggedIn ? (
            <>
              <a href="#login" className="login-button">LOGIN</a>
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
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default Header;
