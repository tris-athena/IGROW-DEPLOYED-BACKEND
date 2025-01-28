import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', classification: 'Senior Citizen', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', classification: 'PWD', role: 'Admin' },
    { id: 3, name: 'Mark Johnson', email: 'markjohnson@example.com', classification: 'Solo Parent', role: 'Super Admin' },
    // Add more users here
  ]);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Classification</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.classification}</td>
              <td>{user.role}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
