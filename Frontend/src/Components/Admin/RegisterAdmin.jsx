import React, { useState } from "react";
import { registerAdmin } from "../../services/services"; // your service function
// import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    confirm_password: "", // only used in frontend
    user_type: "admin", // hidden field
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Frontend validation for passwords
    if (formData.user_password !== formData.confirm_password) {
      setMessage("Passwords do not match!");
      return;
    }

    // ✅ Remove confirm_password before sending to backend
    const { confirm_password, ...dataToSend } = formData;
    console.log(confirm_password);
    registerAdmin(dataToSend)
      .then((response) => {
        if (response.data.success) {
          setMessage("Registration successful! Redirecting...");
          // navigate("/adminDashbord");
        //   setTimeout(() => navigate("/userlogin"), 1500);
        } else {
          setMessage(response.data.message || "Registration failed.");
        }
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Something went wrong.");
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="form-container mt-5 p-4 shadow rounded bg-white"
        style={{ maxWidth: "500px" }}
      >
        <h3 className="text-center mb-4">Register</h3>

        {message && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage("")}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Account
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterAdmin;
