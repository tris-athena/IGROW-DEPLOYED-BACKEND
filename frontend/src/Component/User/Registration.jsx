import React, { useState, useEffect } from "react";
import '../../CSS/Registration.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";  // Ensure correct import
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Registration = () => {
    const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file);
      setImages(e.target.files); // Set the selected files
    }
  };
  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const data = new FormData();
      data.set("name", formData.name);
      data.set("email", formData.email);
      data.set("password", formData.password);
      data.set("address", formData.address);
      console.log(formData.address);
      Array.from(images).forEach((image, index) => {
        data.append('images', image, `image_${index}.jpg`);
      });

      const response = await axios.post("http://localhost:4001/api/v1/register", data, config);
      setLoading(false);
      setSuccess("Registration successful");
      navigate('/')
      toast.success("User registered successfully!", {
        position: "bottom-right",  // Hardcoded position string for testing
      });
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.message, {
        position: "bottom-right",  // Hardcoded position string for testing
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",  // Hardcoded position string for testing
      });
    }
    if (success) {
      // Handle success actions, e.g., navigate or clear the form
    }
  }, [error, success]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    address: Yup.string().required("Address is required"),
    // photo: Yup.mixed()
    //   .required("Profile photo is required")
    //   .test("fileSize", "File size must be less than 5MB", (value) =>
    //     value && value.size <= 1024 * 1024 * 5
    //   )
    //   .test("fileType", "Unsupported file format", (value) =>
    //     value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    //   ),
  });

  return (
    <div className="registration-container">
      <div className="left-section">
        <h1>Create iGROW Account</h1>
        <p>
          Already Have An Account? <a href="/">Login</a>
        </p>
      </div>
      <div className="right-section">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            address: "",
            classification: "",
            photo: null,  // Start with null for photo
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleSubmit(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="registration-form">
              <div className="profile-upload">
                
                <input
        type="file"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="file-upload-button">
            Choose File
          </label>
         
          
                <ErrorMessage name="photo" component="div" className="invalid-feedback" />
              </div>
             {/* Only render the image preview if an image is selected */}
{imagePreview && (
  <div className="image-preview">
    <img
      src={imagePreview}
      alt="Preview"
      className="preview-img"
    />
  </div>
)}
              <Field
                type="text"
                name="name"
                placeholder="Name"
                required
                className="input-field"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                required
                className="input-field"
              />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                required
                className="input-field"
              />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />

              <Field
                type="text"
                name="address"
                placeholder="address"
                required
                className="input-field"
              />
              <ErrorMessage name="address" component="div" className="invalid-feedback" />

          
              <ErrorMessage name="classification" component="div" className="invalid-feedback" />

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Registering..." : "Create Account"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Ensure ToastContainer is rendered for the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Registration;
