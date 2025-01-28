// src/Component/Admin/WaterFiltration.js

import React, { useState } from 'react';
import './WaterFiltration.css'; // Import the CSS for styling

const WaterFiltration = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-01-01', time: '08:00 AM', phLevel: 7.2, usage: 30 },
    { id: 2, date: '2025-01-02', time: '09:00 AM', phLevel: 6.9, usage: 40 },
    { id: 3, date: '2025-01-03', time: '10:00 AM', phLevel: 7.4, usage: 25 },
    { id: 4, date: '2025-01-04', time: '11:00 AM', phLevel: 7.0, usage: 35 },
    { id: 5, date: '2025-01-05', time: '12:00 PM', phLevel: 6.8, usage: 20 },
    { id: 6, date: '2025-01-06', time: '01:00 PM', phLevel: 7.1, usage: 45 },
    // Add more sample data as needed
  ]);

  const deleteEntry = (id) => {
    setData(data.filter(entry => entry.id !== id));
  };

  return (
    <div className="water-filtration-container">
      <h2>Water Filtration Management System</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>pH Level</th>
            <th>Usage (Days)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>{entry.phLevel}</td>
              <td>{entry.usage}</td>
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

export default WaterFiltration;
