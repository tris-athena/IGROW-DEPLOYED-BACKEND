import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AquariumQuality.css';
import Sidebar from '../Layout/Sidebar';

const AquariumQuality = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newphLevel, setNewphLevel] = useState('');

  // Fetch water collection records from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/aquarium-quality');
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
      await axios.delete(`http://localhost:4001/api/v1/aquarium-quality/${id}`);
      setData(data.filter(entry => entry._id !== id));
    } catch (err) {
      setError('Failed to delete record');
    }
  };

  // Handle Create button click to toggle form visibility (modal)
  const handleCreate = () => {
    setShowCreateForm(true);
  };

  // Handle form submission to create a new record
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newphLevel) {
        setError('Please fill in all fields');
        return;
    }

    try {
        const newRecord = { phLevel: newphLevel };
        
        console.log('Sending data to the backend:', newRecord); // Log to ensure data is correct

        await axios.post('http://localhost:4001/api/v1/aq-create', newRecord);

        // Reset form fields and hide form after successful submission
        setNewphLevel('');
        setShowCreateForm(false);

        // Fetch updated data
        const response = await axios.get('http://localhost:4001/api/v1/aquarium-quality');
        setData(response.data);

        setError(null); // Clear error message if any
    } catch (err) {
        setError('Failed to create new record');
        console.error('Error during record creation:', err);
    }
};

  return (
    <div className="aquarium-quality-container">
      <Sidebar />
      <div className="content">
        {/* Header with left-aligned title and right-aligned create button */}
        <div className="header">
          <h2>Aquarium Quality Records</h2>
          <button className="create-button" onClick={handleCreate}>Create</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Modal for Creating Aquarium Quality */}
        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Create Aquarium Quality</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>pH Level:</label>
                  <input
                    type="text"
                    value={newphLevel}
                    onChange={(e) => setNewphLevel(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>pH Level</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.phLevel}</td>
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

export default AquariumQuality;
