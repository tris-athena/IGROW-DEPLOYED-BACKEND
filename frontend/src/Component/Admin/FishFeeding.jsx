import React, { useState } from 'react';
import './WaterCollection.css'; // Reuse the Water Collection CSS for consistency.
import Sidebar from '../Layout/Sidebar'; // Adjusted import path

const FishFeeding = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-01-01', time: '08:00', feedAmount: '200g' },
    { id: 2, date: '2025-01-01', time: '16:00', feedAmount: '150g' },
    { id: 3, date: '2025-01-02', time: '08:00', feedAmount: '250g' },
    { id: 4, date: '2025-01-02', time: '16:00', feedAmount: '200g' },
    { id: 5, date: '2025-01-03', time: '08:00', feedAmount: '300g' },
    { id: 6, date: '2025-01-03', time: '16:00', feedAmount: '220g' },
    // Add more entries as needed
  ]);

  const deleteEntry = (id) => {
    setData(data.filter((entry) => entry.id !== id));
  };

  return (
    <div className="fish-feeding-page">
      <Sidebar /> {/* Sidebar included here */}
      <div className="management-container">
        <h2 className="management-title">Automated Fish Feeding Management System</h2>
        <table className="management-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Feed Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.time}</td>
                <td>{entry.feedAmount}</td>
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
    </div>
  );
};

export default FishFeeding;
