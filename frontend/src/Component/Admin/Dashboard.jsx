import React from 'react';
import './dashboard.css';
import Sidebar from '../Layout/Sidebar'; // Adjusted import path


const Dashboard = () => {
  return (
    <div className="content">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="dashboard-box">
          <h2>Water Collection</h2>
          <p>100 Liters</p>
        </div>

        <div className="dashboard-box">
          <h2>Battery Charge</h2>
          <p>85%</p>
        </div>

        <div className="dashboard-box">
          <h2>Water pH Level</h2>
          <p>7.5</p>
        </div>
      </div>

      <div className="row">
        <div className="dashboard-box">
          <h2>Water Supply Usage</h2>
          <p>50%</p>
        </div>

        <div className="dashboard-box">
          <h2>Solar Power</h2>
          <p>75%</p>
        </div>

        <div className="dashboard-box">
          <h2>Water Filter Usage</h2>
          <p>30 Days</p>
        </div>
      </div>

      <div className="row">
        <div className="dashboard-box">
          <h2>Drainage Events</h2>
          <p>5 Events</p>
        </div>

        <div className="dashboard-box">
          <h2>Power Usage</h2>
          <p>50 kWh</p>
        </div>

        <div className="dashboard-box">
          <h2>Fish Feeding</h2>
          <p>25 Releases</p>
          <p>Fish Food Storage: 150 kg</p>
        </div>
      </div>

      {/* Big Graph for User Management */}
      <div className="dashboard-box">
        <h2>User Management</h2>
        {/* You can integrate a chart library like Chart.js or Recharts here */}
        <p>Graph will go here</p>
      </div>
    </div>
  );
}

export default Dashboard;
