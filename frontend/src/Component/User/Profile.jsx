import React, { useState, useEffect } from 'react';
import './Profile.css';  // Import the CSS for styling

function Profile() {
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Save the values to sessionStorage
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('role', role);

    console.log({ name, id, role });  // Log the form data on submit
  };

  // Effect to load data from sessionStorage when the component mounts
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const { name, id, role } = JSON.parse(storedUser);
      setName(name);
      setID(id);
      setRole(role);
    }
    
  }, []); // Runs only once when the component mounts

  // Effect to log the updated values whenever any of the state variables change
  useEffect(() => {
    console.log('Updated values from sessionStorage:', { name, id, role });
  }, [name, id, role]); // Runs every time `name`, `id`, or `role` changes

  return (
    <div className="profile-container">
      {/* Left side: Profile Icon and Icons Below */}
      <div className="left-container">
        {/* Profile Picture */}
        <div className="profile-icon-container">
          <img
            src="images/logoTUP.png"  // Replace with your actual image path
            alt="Profile"
            className="profile-icon"
          />
        </div>

        {/* Three Icons at the Bottom */}
        <div className="icons-container">
          <img src="images/logoTaguig.png" alt="Taguig Logo" className="icon" />
          <img src="images/logoCentralSignal.png" alt="Central Signal Logo" className="icon" />
          <img src="images/logoTUP.png" alt="TUP Logo" className="icon" />
        </div>
      </div>

      {/* Right side: Profile Form */}
      <div className="form-container">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setID(e.target.value)}
              placeholder="Enter your ID"
              required
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              disabled
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
