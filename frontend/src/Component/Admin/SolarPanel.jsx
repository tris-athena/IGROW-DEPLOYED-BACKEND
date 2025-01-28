import React, { useState } from 'react';
import './WaterCollection.css'; // Reusing the WaterCollection.css styling

const SolarPanel = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-01-25', time: '10:00 AM', wattage: 120, batteryCharge: 80, source: 'Solar Panel' },
    { id: 2, date: '2025-01-25', time: '02:00 PM', wattage: 200, batteryCharge: 95, source: 'Battery' },
    { id: 3, date: '2025-01-26', time: '09:30 AM', wattage: 150, batteryCharge: 60, source: 'Solar Panel' },
    { id: 4, date: '2025-01-26', time: '01:00 PM', wattage: 220, batteryCharge: 100, source: 'Battery' },
    // Add more data as needed
  ]);

  const deleteEntry = (id) => {
    setData(data.filter(entry => entry.id !== id));
  };

  return (
    <div className="management-container">
      <h2 className="management-title">Solar Power Management System</h2>
      <table className="management-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Wattage (W)</th>
            <th>Battery Charge (%)</th>
            <th>Source</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>{entry.wattage}</td>
              <td>{entry.batteryCharge}</td>
              <td>{entry.source}</td>
              <td>
                <button className="delete-button" onClick={() => deleteEntry(entry.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolarPanel;
