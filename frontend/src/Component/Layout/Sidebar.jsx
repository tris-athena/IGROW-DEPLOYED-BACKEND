import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
import './Sidebar.css';

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  const closeSidebar = () => setSidebarVisible(false); // hides sidebar immediately

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
    { label: 'Logout', path: '/logout', icon: <FaSignOutAlt className="sidebar-icon" />, isLogout: true },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // Optional: clear tokens, cleanup here
    navigate('/login');
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars size={24} />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarVisible ? 'active' : ''}`}>
        <div className="sidebar-header">
          <img src="/images/logoIGROW.png" alt="iGROW Logo" className="logo" />
          <span className="logo-text">iGROW</span>
        </div>

        <ul className="sidebar-nav">
          {navItems.map(({ label, path, icon, isLogout }) => (
            <li key={label} className="sidebar-item">
              {isLogout ? (
                <button
                  className="sidebar-link logout-button"
                  onClick={() => {
                    closeSidebar();   // hide sidebar immediately
                    handleLogout();
                  }}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                  }
                  onClick={closeSidebar}  // hide sidebar immediately on nav click
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
