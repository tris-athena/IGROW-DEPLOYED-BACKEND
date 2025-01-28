// src/Component/Admin/WaterSupply.js

import React, { useState } from 'react';
import './WaterSupply.css'; // Import the CSS for styling

const WaterSupply = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-01-01', time: '08:00 AM', source: 'Commercial', amountUsed: 500 },
    { id: 2, date: '2025-01-02', time: '09:00 AM', source: 'Rainwater', amountUsed: 300 },
    // Add more sample data as needed
  ]);

  const deleteEntry = (id) => {
    setData(data.filter(entry => entry.id !== id));
  };

  return (
    <div className="water-supply-container">
      <h2>Water Supply Management System</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Source</th>
            <th>Amount Used (L)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>{entry.source}</td>
              <td>{entry.amountUsed}</td>
              <td>
                <button onClick={() => deleteEntry(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WaterSupply;
