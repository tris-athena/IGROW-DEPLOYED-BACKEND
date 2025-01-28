import React, { useState } from 'react';

const WaterDrain = () => {
  const [data, setData] = useState([
    { id: 1, date: '2025-01-01', time: '08:00 AM', amount: 100 },
    { id: 2, date: '2025-01-02', time: '10:30 AM', amount: 150 },
    { id: 3, date: '2025-01-03', time: '12:15 PM', amount: 200 },
    { id: 4, date: '2025-01-04', time: '02:00 PM', amount: 180 },
    { id: 5, date: '2025-01-05', time: '04:45 PM', amount: 120 },
    { id: 6, date: '2025-01-06', time: '06:30 AM', amount: 250 },
    { id: 7, date: '2025-01-07', time: '09:00 AM', amount: 300 },
    { id: 8, date: '2025-01-08', time: '11:30 AM', amount: 140 },
    { id: 9, date: '2025-01-09', time: '01:45 PM', amount: 160 },
    { id: 10, date: '2025-01-10', time: '03:30 PM', amount: 220 },
    // Add more sample data as needed
  ]);

  const deleteEntry = (id) => {
    setData(data.filter(entry => entry.id !== id));
  };

  return (
    <div>
      <h2>Water Drain Management System</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Amount Drained (Liters)</th>
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
  );
};

export default WaterDrain;
