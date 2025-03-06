import React, { useState } from 'react';
import '../../CSS/WaterFiltration.css';
import Sidebar from '../Layout/Sidebar';

const WaterFiltration = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-01-01', time: '08:00 AM', phLevel: 7.2, usage: 30 },
    { id: 2, date: '2025-01-02', time: '09:00 AM', phLevel: 6.9, usage: 40 },
    { id: 3, date: '2025-01-03', time: '10:00 AM', phLevel: 7.4, usage: 25 },
    { id: 4, date: '2025-01-04', time: '11:00 AM', phLevel: 7.0, usage: 35 },
    { id: 5, date: '2025-01-05', time: '12:00 PM', phLevel: 6.8, usage: 20 },
    { id: 6, date: '2025-01-06', time: '01:00 PM', phLevel: 7.1, usage: 45 },
  ]);

  const deleteEntry = (id) => {
    setData(data.filter(entry => entry.id !== id));
  };

  return (
    <div className="water-filtration-container">
      <Sidebar />

      <div className="content">
        {/* Header Section */}
        <div className="header-container">
          <h2>Water Filtration Management</h2>
          <button className="create-button">Create</button>
        </div>

        {/* Data Grid */}
        <div className="grid-container">
          <div className="grid-header">Date</div>
          <div className="grid-header">Time</div>
          <div className="grid-header">pH Level</div>
          <div className="grid-header">Usage (Days)</div>
          <div className="grid-header">Action</div>

          {data.map((entry) => (
            <>
              <div className="grid-item">{entry.date}</div>
              <div className="grid-item">{entry.time}</div>
              <div className="grid-item">{entry.phLevel}</div>
              <div className="grid-item">{entry.usage}</div>
              <div className="grid-item">
                <button className="delete-button" onClick={() => deleteEntry(entry.id)}>Delete</button>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterFiltration;
