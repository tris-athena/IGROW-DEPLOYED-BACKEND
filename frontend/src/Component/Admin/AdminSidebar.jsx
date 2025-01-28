import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaWater, FaFish, FaSolarPanel, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Hamburger Menu Button */}
      <div
        style={hamburgerMenuStyle}
        onClick={toggleSidebar}
      >
        <FaBars size={30} color="#fff" />
      </div>

      {/* Sidebar */}
      <div style={{ ...sidebarStyle, left: isSidebarOpen ? '0' : '-250px' }}>
        <div style={sidebarItemStyle}>
          <Link to="/dashboard" style={linkStyle}>
            <FaHome size={20} /> Dashboard
          </Link>
        </div>
        <div style={sidebarItemStyle}>
          <Link to="/water-collection" style={linkStyle}>
            <FaWater size={20} /> Water Collection
          </Link>
        </div>
        <div style={sidebarItemStyle}>
          <Link to="/water-supply" style={linkStyle}>
            <FaWater size={20} /> Water Supply
          </Link>
        </div>
        <div style={sidebarItemStyle}>
          <Link to="/water-filtration" style={linkStyle}>
            <FaWater size={20} /> Water Filtration
          </Link>
        </div>
        <div style={sidebarItemStyle}>
          <Link to="/water-drain" style={linkStyle}>
            <FaWater size={20} /> Water Drain
          </Link>
        </div>
        <div style={sidebarItemStyle}>
          <Link to="/fish-feeding" style={linkStyle}>
            <FaFish size={20} /> Fish Feeding
          </Link>
        </div>
        <div style={sidebarItemStyle}>
          <Link to="/solar-panel" style={linkStyle}>
            <FaSolarPanel size={20} /> Solar Panel
          </Link>
        </div>
        <div style={sidebarItemStyle}>
          <Link to="/usermanagement" style={linkStyle}>
            <FaUsers size={20} /> User Management
          </Link>
        </div>
        <div style={sidebarItemStyle}>
          <Link to="/logout" style={linkStyle}>
            <FaSignOutAlt size={20} /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

// Sidebar Styles
const sidebarStyle = {
  width: '250px',
  height: '100vh',
  backgroundColor: '#2c3e50',
  color: '#fff',
  padding: '20px 10px',
  position: 'fixed',
  top: '0',
  left: '-250px',  // Initially hidden off-screen
  transition: 'left 0.3s ease-in-out',
};

const sidebarItemStyle = {
  marginBottom: '20px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  fontSize: '18px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const hamburgerMenuStyle = {
  fontSize: '30px',
  color: '#fff',
  position: 'absolute',
  top: '20px',
  left: '20px',
  cursor: 'pointer',
  zIndex: '10',
};

export default AdminSidebar;
