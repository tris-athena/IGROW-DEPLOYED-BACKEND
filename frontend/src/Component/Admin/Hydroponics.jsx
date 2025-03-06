import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hydroponics.css';
import Sidebar from '../Layout/Sidebar';

const Hydroponics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newstate, setNewstate] = useState('');
  const [newdirection, setNewdirection] = useState('');

  // Fetch water drain records from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/hydroponics');
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
      await axios.delete(`http://localhost:4001/api/v1/hydroponics/${id}`);
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

    if (!newstate || !newdirection) {
        setError('Please fill in all fields');
        return;
    }

    try {
        const newRecord = { state: newstate, direction: newdirection };
        
        console.log('Sending data to the backend:', newRecord); // Log to ensure data is correct

        await axios.post('http://localhost:4001/api/v1/h-create', newRecord);

        // Reset form fields and hide form after successful submission
        setNewstate('');
        setNewdirection('');
        setShowCreateForm(false);

        // Fetch updated data
        const response = await axios.get('http://localhost:4001/api/v1/hydroponics');
        setData(response.data);

        setError(null); // Clear error message if any
    } catch (err) {
        setError('Failed to create new record');
        console.error('Error during record creation:', err);
    }
};

  return (
    <div className="hydroponics-container">
      <Sidebar />
      <div className="content">
        <h2>Hydroponics Records
          <button className="create-button" onClick={handleCreate}>Create</button>
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {showCreateForm && (
          <form onSubmit={handleSubmit}>
            <div>
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
            <div>
              <label>Direction:</label>
              <select
                value={newdirection}
                onChange={(e) => setNewdirection(e.target.value)}
                required
              >
                <option value="">Select Direction</option>
                <option value="neutral">Neutral</option>
                <option value="up">Up</option>
                <option value="down">Down</option>
              </select>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Direction</th>
              <th>Created At</th> {/* Add a column for createdAt */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.state}</td>
                <td>{entry.direction}</td>
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

export default Hydroponics;
