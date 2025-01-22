import React from 'react';

const Login = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" required />
        <br />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" required />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        <a href="/forgot-password">Forgot Password?</a> | 
        <a href="/sign-up"> Don't have an account? Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
