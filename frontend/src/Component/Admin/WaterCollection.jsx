import React, { useState } from 'react';
import './WaterCollection.css'; // Import custom CSS for layout

const WaterCollection = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-01-01', time: '08:00 AM', amount: 100 },
    { id: 2, date: '2025-01-02', time: '09:00 AM', amount: 200 },
    { id: 3, date: '2025-01-03', time: '10:30 AM', amount: 150 },
    { id: 4, date: '2025-01-04', time: '11:15 AM', amount: 180 },
    { id: 5, date: '2025-01-05', time: '12:00 PM', amount: 250 },
    { id: 6, date: '2025-01-06', time: '01:30 PM', amount: 300 },
    { id: 7, date: '2025-01-07', time: '02:45 PM', amount: 400 },
    { id: 8, date: '2025-01-08', time: '03:00 PM', amount: 350 },
    { id: 9, date: '2025-01-09', time: '04:00 PM', amount: 500 },
    { id: 10, date: '2025-01-10', time: '05:15 PM', amount: 600 },
    { id: 11, date: '2025-01-11', time: '06:30 PM', amount: 700 },
    { id: 12, date: '2025-01-12', time: '07:45 PM', amount: 800 },
    { id: 13, date: '2025-01-13', time: '08:00 AM', amount: 900 },
    { id: 14, date: '2025-01-14', time: '09:30 AM', amount: 1000 },
    { id: 15, date: '2025-01-15', time: '10:45 AM', amount: 1100 },
    { id: 16, date: '2025-01-16', time: '12:00 PM', amount: 1200 },
    { id: 17, date: '2025-01-17', time: '01:15 PM', amount: 1300 },
    { id: 18, date: '2025-01-18', time: '02:30 PM', amount: 1400 },
    { id: 19, date: '2025-01-19', time: '03:45 PM', amount: 1500 },
    { id: 20, date: '2025-01-20', time: '04:30 PM', amount: 1600 },
  ]);

  const deleteEntry = (id) => {
    setData(data.filter(entry => entry.id !== id));
  };

  return (
    <div className="water-collection-container">
      <div className="sidebar">
        <h2>Water Collection Management System</h2>
      </div>
      <div className="content">
        <h3>Water Collection Records</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Amount Collected (L)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.time}</td>
                <td>{entry.amount}</td>
                <td>
                  <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaterCollection;
