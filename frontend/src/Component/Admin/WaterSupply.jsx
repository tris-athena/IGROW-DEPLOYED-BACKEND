import React, { useState } from 'react';
import '../../CSS/WaterSupply.css';
import Sidebar from '../Layout/Sidebar';

const WaterSupply = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-01-01', time: '08:00 AM', source: 'Commercial', amountUsed: 500 },
    { id: 2, date: '2025-01-02', time: '09:00 AM', source: 'Rainwater', amountUsed: 300 },
  ]);

  const deleteEntry = (id) => {
    setData(data.filter(entry => entry.id !== id));
  };

  return (
    <div className="water-supply-container">
      <Sidebar />

      <div className="content">
        {/* Header Section */}
        <div className="header-container">
          <h2>Water Supply Management</h2>
          <button className="create-button">Create</button>
        </div>

        {/* Data Grid */}
        <div className="grid-container">
          <div className="grid-header">Date</div>
          <div className="grid-header">Time</div>
          <div className="grid-header">Source</div>
          <div className="grid-header">Amount Used (L)</div>
          <div className="grid-header">Action</div>

          {data.map((entry) => (
            <>
              <div className="grid-item">{entry.date}</div>
              <div className="grid-item">{entry.time}</div>
              <div className="grid-item">{entry.source}</div>
              <div className="grid-item">{entry.amountUsed}</div>
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

export default WaterSupply;
