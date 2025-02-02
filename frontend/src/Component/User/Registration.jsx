import React, { useState, useEffect } from "react";
import '../../CSS/Registration.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";  // Ensure correct import
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Registration = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImage(file);
    setFieldValue("photo", file);  // Setting the photo in form data
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
      data.set("classification", formData.classification);
      formData.photo && data.append("photo", formData.photo);

      const response = await axios.post("http://localhost:4001/register", data, config);
      setLoading(false);
      setSuccess("Registration successful");
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
    classification: Yup.string().required("Classification is required"),
    photo: Yup.mixed()
      .required("Profile photo is required")
      .test("fileSize", "File size must be less than 5MB", (value) =>
        value && value.size <= 1024 * 1024 * 5
      )
      .test("fileType", "Unsupported file format", (value) =>
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      ),
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
                <div className="upload-photo">UPLOAD PHOTO</div>
                <input
                  type="file"
                  name="photo"
                  className="file-input"
                  onChange={(e) => onChange(e, setFieldValue)}
                  required
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="image-preview"
                    width="100"
                    height="100"
                  />
                )}
                <ErrorMessage name="photo" component="div" className="invalid-feedback" />
              </div>

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
                placeholder="Address"
                required
                className="input-field"
              />
              <ErrorMessage name="address" component="div" className="invalid-feedback" />

              <Field as="select" name="classification" required className="input-field">
                <option value="" disabled>
                  Select Classification
                </option>
                <option value="Person with Disability (PWD)">Person with Disability (PWD)</option>
                <option value="Solo Parent">Solo Parent</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Barangay Official">Barangay Official</option>
              </Field>
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
