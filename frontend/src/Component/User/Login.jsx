import React, { useState } from "react";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await axios.post("https://igrow-backend.onrender.com/login", user);
      const { name, role, id } = response.data;

      // Save user info to localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("userId", id);
      localStorage.setItem("userRole", role);
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful!");
      window.location.href = "/testimonials"; // Redirect to the dashboard or homepage
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setErrorMessage("Account not verified.");
        } else if (error.response.status === 401) {
          setErrorMessage("Invalid Credentials.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleRegisterNavigation = () => {
    window.location.href = "/register"; // Navigate to the register page
  };

  const handleForgotPasswordNavigation = () => {
    window.location.href = "/forgot-password"; // Navigate to the forgot password page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Login</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}

      <p style={styles.links}>
        <a href="#" onClick={handleForgotPasswordNavigation}>
          Forgot Password?
        </a>{" "}
        |{" "}
        <a href="#" onClick={handleRegisterNavigation}>
          Don't have an account? Register
        </a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  links: {
    marginTop: "20px",
    fontSize: "14px",
  },
};

export default LoginScreen;
