import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WaterCollection.css';
import Sidebar from '../Layout/Sidebar';

const WaterCollection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWaterSource, setNewWaterSource] = useState('');
  const [newWaterLevel, setNewWaterLevel] = useState('');

  // Fetch water collection records from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/water-collections');
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
      await axios.delete(`http://localhost:4001/api/v1/water-collections/${id}`);
      setData(data.filter(entry => entry._id !== id));
    } catch (err) {
      setError('Failed to delete record');
    }
  };

  // Handle Create button click to toggle form visibility
  const handleCreate = () => {
    setShowCreateForm(!showCreateForm);
  };

  // Handle form submission to create a new record
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newWaterSource || !newWaterLevel) {
        setError('Please fill in all fields');
        return;
    }

    try {
        const newRecord = { WaterSource: newWaterSource, WaterLevel: newWaterLevel };
        
        console.log('Sending data to the backend:', newRecord); // Log to ensure data is correct

        await axios.post('http://localhost:4001/api/v1/wc-create', newRecord);

        // Reset form fields and hide form after successful submission
        setNewWaterSource('');
        setNewWaterLevel('');
        setShowCreateForm(false);

        // Fetch updated data
        const response = await axios.get('http://localhost:4001/api/v1/water-collections');
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
        <h2>Water Collection Records
          <button className="create-button" onClick={handleCreate}>Create</button>
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {showCreateForm && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Water Source:</label>
              <input
                type="text"
                value={newWaterSource}
                onChange={(e) => setNewWaterSource(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Water Level:</label>
              <input
                type="text"
                value={newWaterLevel}
                onChange={(e) => setNewWaterLevel(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Water Source</th>
              <th>Water Level</th>
              <th>Created At</th> {/* Add a column for createdAt */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.WaterSource}</td>
                <td>{entry.WaterLevel}</td>
                <td>{new Date(entry.createdAt).toLocaleString()}</td> {/* Format the createdAt field */}
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

export default WaterCollection;
  