import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WaterCollection.css';
import Sidebar from '../Layout/Sidebar';

const WaterFiltration = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newphLevel, setNewphLevel] = useState('');
  const [newUsage, setNewUsage] = useState('');

  // Fetch water collection records from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/water-filtration');
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
      await axios.delete(`http://localhost:4001/api/v1/water-filtration/${id}`);
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

    if (!newphLevel || !newUsage) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const newRecord = { phLevel: newphLevel, Usage: newUsage };

      console.log('Sending data to the backend:', newRecord); // Log to ensure data is correct

      await axios.post('http://localhost:4001/api/v1/wf-create', newRecord);

      // Reset form fields and hide form after successful submission
      setNewphLevel('');
      setNewUsage('');
      setShowCreateForm(false);

      // Fetch updated data
      const response = await axios.get('http://localhost:4001/api/v1/water-filtration');
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
    <h2>Water Filtration Records</h2>
    <button className="create-button" onClick={handleCreate}>Create</button>
  </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Modal for Creating Water Collection */}
        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Create Water Filtration</h3>
              <form onSubmit={handleSubmit}>
                 <div>
                  <label>phLevel:</label>
                  <input
                    type="text"
                    value={newphLevel}
                    onChange={(e) => setNewphLevel(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Usage:</label>
                  <input
                    type="text"
                    value={newUsage}
                    onChange={(e) => setNewUsage(e.target.value)}
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
              <th>phLevel</th>
              <th>Usage</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.phLevel}</td>
                <td>{entry.Usage}</td>
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

export default WaterFiltration;