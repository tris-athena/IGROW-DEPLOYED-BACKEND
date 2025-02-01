import React, { useState } from 'react';
import './Password.css';  // Make sure to import the CSS

function Password() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle forgot password logic here (e.g., API request to send reset link)
    console.log('Password reset link sent to:', email);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-title">
          Forgot Password? No worries. Enter your account email address and we will share a reset link.
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="get-link-btn">
            Get Link
          </button>
        </form>

        <div className="return-to-login">
          <a href="/login">Return to Login</a>
        </div>
      </div>
    </div>
  );
}

export default Password;
