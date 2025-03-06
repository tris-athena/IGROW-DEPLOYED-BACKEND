import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Hamburger icon for mobile view

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Sidebar visibility state
  const navigate = useNavigate();
  const location = useLocation(); // Track the current route

  const isLoggedIn = sessionStorage.getItem('user'); // Check sessionStorage for login state

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Log out the user
    navigate('/'); // Redirect to the home page after logging out
  };

  // Highlight the active link
  const activeLinkStyle = {
    backgroundColor: '#575757',
  };

  // Sidebar styles as a const object
  const styles = {
    sidebarContainer: {
      position: 'relative',
      zIndex: 10,
    },
    sidebar: {
      position: 'fixed',
      top: '105px', // Adjust top to be below the header
      right: '-250px', // Initially off the screen to the right
      width: '250px',
      height: '100%',
      backgroundColor: '#f8f9f0', // Correct color applied here
      color: 'white',
      transition: 'right 0.3s ease', // Smooth transition for the right property
      zIndex: 999,
    },
    sidebarActive: {
      right: '0', // Sidebar slides in from the right
    },
    sidebarMenu: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    sidebarLink: {
      display: 'block',
      padding: '15px',
      color: '#105d5e', // Color of the links in the sidebar
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      transition: 'background-color 0.2s ease',
    },
    sidebarLinkHover: {
      backgroundColor: 'white',
    },
    sidebarToggleRight: {
      position: 'fixed',
      top: '20px', // Align button to the top of the screen, adjust if necessary
      right: '20px', // Align button to the right side
      cursor: 'pointer',
      zIndex: 1000,
      backgroundColor: '#f8f9f0', // Button background color
      padding: '10px',
      borderRadius: '50%',
    },
    sidebarToggleRightHover: {
      backgroundColor: '#105d5e', // Change background on hover
    },
  };

  return (
    <div style={styles.sidebarContainer}>
      {/* Button to toggle sidebar on the right */}
      <div
        onClick={toggleSidebar}
        style={styles.sidebarToggleRight}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.sidebarToggleRightHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.sidebarToggleRight.backgroundColor)}
      >
        <FaBars size={30} />
      </div>

      {/* Sidebar */}
      <div style={isSidebarVisible ? { ...styles.sidebar, ...styles.sidebarActive } : styles.sidebar}>
        <ul style={styles.sidebarMenu}>
          <li>
            <NavLink
              to="/admin/dashboard"
              className="sidebar-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : styles.sidebarLink)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/water-collection"
              className="sidebar-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : styles.sidebarLink)}
            >
              Water Collection
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/water-supply"
              className="sidebar-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : styles.sidebarLink)}
            >
              Water Supply
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/water-filtration"
              className="sidebar-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : styles.sidebarLink)}
            >
              Water Filtration
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/water-drain"
              className="sidebar-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : styles.sidebarLink)}
            >
              Water Drain
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/fish-feeding"
              className="sidebar-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : styles.sidebarLink)}
            >
              Fish Feeding
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/solar-panel"
              className="sidebar-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : styles.sidebarLink)}
            >
              Solar Power
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/user-management"
              className="sidebar-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : styles.sidebarLink)}
            >
              User Management
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
