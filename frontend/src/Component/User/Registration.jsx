import React, { useState } from "react";
import '../../CSS/Registration.css';


const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    classification: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="registration-container">
      <div className="left-section">
        <h1>Create iGROW Account</h1>
        <p>
          Already Have An Account? <a href="/">Login</a>
        </p>
      </div>
      <div className="right-section">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="profile-upload">
            <div className="upload-photo">UPLOAD PHOTO</div>
          </div>
          <input
            type="text"
            name="name"
            placeholder="NAME"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="ADDRESS"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <select
            name="classification"
            value={formData.classification}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Classification
            </option>
            <option value="Farmer">Farmer</option>
            <option value="Supplier">Supplier</option>
            <option value="Distributor">Distributor</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
