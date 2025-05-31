import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WaterCollection.css';
import Sidebar from '../Layout/Sidebar';

const SolarPanel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWattage, setNewWattage] = useState('');
  const [newBatteryCharge, setNewBatteryCharge] = useState('');
  const [newSource, setNewSource] = useState('');

  // Fetch water collection records from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/solar-panel');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete a record from the backend
  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/v1/solar-panel/${id}`);
      setData(data.filter(entry => entry._id !== id));
    } catch (err) {
      setError('Failed to delete record');
    }
  };

  // Handle Create button click to show the modal
  const handleCreate = () => {
    setShowCreateForm(true);
  };

  // Handle form submission to create a new record
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newWattage || !newBatteryCharge || !newSource) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const newRecord = { Wattage: newWattage, BatteryCharge: newBatteryCharge, Source: newSource };

      console.log('Sending data to the backend:', newRecord); // Log to ensure data is correct

      await axios.post('http://localhost:4001/api/v1/sp-create', newRecord);

      // Reset form fields and hide form after successful submission
      setNewWattage('');
      setNewBatteryCharge('');
      setNewSource('');
      setShowCreateForm(false);

      // Fetch updated data
      const response = await axios.get('http://localhost:4001/api/v1/solar-panel');
      setData(response.data);

      setError(null); // Clear error message if any
    } catch (err) {
      setError('Failed to create new record');
      console.error('Error during record creation:', err);
    }
  };

  return (
    <div className="water-collection-container">
      <Sidebar />
      <div className="content">
      <div className="header">
    <h2>Solar Panel Records</h2>
    <button className="create-button" onClick={handleCreate}>Create</button>
  </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Modal for Creating Water Collection */}
        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Create Solar Panel</h3>
              <form onSubmit={handleSubmit}>
                 <div>
                  <label>Wattage:</label>
                  <input
                    type="text"
                    value={newWattage}
                    onChange={(e) => setNewWattage(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Battery Charge:</label>
                  <input
                    type="text"
                    value={newBatteryCharge}
                    onChange={(e) => setNewBatteryCharge(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Source:</label>
                  <input
                    type="text"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)} // Close modal on cancel
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Wattage</th>
              <th>Battery Charge</th>
              <th>Source</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.Wattage}</td>
                <td>{entry.BatteryCharge}</td>
                <td>{entry.Source}</td>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => deleteEntry(entry._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolarPanel;