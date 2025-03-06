import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Environment.css';
import Sidebar from '../Layout/Sidebar';

const Environment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemperature, setNewTemperature] = useState('');
  const [newHumidity, setNewHumidity] = useState('');

  // Fetch water collection records from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/v1/environment');
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
      await axios.delete(`http://localhost:4001/api/v1/environment/${id}`);
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

    if (!newTemperature || !newHumidity) {
        setError('Please fill in all fields');
        return;
    }

    try {
        const newRecord = { Temperature: newTemperature, Humidity: newHumidity };
        
        console.log('Sending data to the backend:', newRecord); // Log to ensure data is correct

        await axios.post('http://localhost:4001/api/v1/e-create', newRecord);

        // Reset form fields and hide form after successful submission
        setNewTemperature('');
        setNewHumidity('');
        setShowCreateForm(false);

        // Fetch updated data
        const response = await axios.get('http://localhost:4001/api/v1/environment');
        setData(response.data);

        setError(null); // Clear error message if any
    } catch (err) {
        setError('Failed to create new record');
        console.error('Error during record creation:', err);
    }
};

  return (
    <div className="environment-container">
      <Sidebar />
      <div className="content">
        <h2>Environment Records
          <button className="create-button" onClick={handleCreate}>Create</button>
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {showCreateForm && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Temperature:</label>
              <input
                type="text"
                value={newTemperature}
                onChange={(e) => setNewTemperature(e.target.value)}
                required
              />
            </div>
            <div>
              <label>HUmidity:</label>
              <input
                type="text"
                value={newHumidity}
                onChange={(e) => setNewHumidity(e.target.value)}
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
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Created At</th> {/* Add a column for createdAt */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.Temperature}</td>
                <td>{entry.Humidity}</td>
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

export default Environment;
  