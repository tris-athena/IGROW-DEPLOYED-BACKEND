import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const AdminHeader = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <h1 style={logoTextStyle}>Admin Dashboard</h1>
      </div>
      <nav style={navStyle}>
        <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
        <Link to="/users" style={navLinkStyle}>User Management</Link>
        <Link to="/settings" style={navLinkStyle}>Settings</Link>
      </nav>
      <div style={profileSectionStyle}>
        <FaUserCircle size={30} style={{ marginRight: '10px' }} />
        <span style={profileTextStyle}>Admin</span>
      </div>
    </header>
  );
};

// Styling for the Admin Header
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#333',
  color: '#fff',
};

const logoStyle = {
  flex: 1,
};

const logoTextStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const navStyle = {
  display: 'flex',
  gap: '20px',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#fff',
  fontSize: '18px',
  padding: '10px 20px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

const profileSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
};

const profileTextStyle = {
  fontSize: '18px',
  marginLeft: '5px',
};

export default AdminHeader;
