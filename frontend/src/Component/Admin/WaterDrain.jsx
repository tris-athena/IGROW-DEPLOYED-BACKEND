import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WaterDrain.css'; // Make sure this path is correct
import Sidebar from '../Layout/Sidebar';

const WaterDrain = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newstate, setNewstate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/water-drain');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/v1/water-drain/${id}`);
      setData(data.filter(entry => entry._id !== id));
    } catch (err) {
      setError('Failed to delete record');
    }
  };

  const handleCreate = () => {
    setShowCreateForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newstate) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const newRecord = { state: newstate };

      await axios.post('http://localhost:4001/api/v1/wd-create', newRecord);

      setNewstate('');
      setShowCreateForm(false);

      const response = await axios.get('http://localhost:4001/api/v1/water-drain');
      setData(response.data);

      setError(null);
    } catch (err) {
      setError('Failed to create new record');
      console.error('Error during record creation:', err);
    }
  };

  return (
    <div className="water-collection-container">
      <Sidebar />
      <div className="content">
        {/* Header */}
        <div className="header">
          <h2>Water Drain Records</h2>
          <button className="create-button" onClick={handleCreate}>Create</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Modal */}
        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Create Water Drain Record</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>State:</label>
                  <select
                    value={newstate}
                    onChange={(e) => setNewstate(e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>
                <div className="button-group">
                  <button type="submit" className="submit-button">Submit</button>
                  <button type="button" className="cancel-button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.state}</td>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteEntry(entry._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaterDrain;
