import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/signup.css"; 
const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Signup failed. Try again!");
      }

      alert("Signup successful! Please log in.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center vh-100">
      <div className="signup-card p-4 shadow-lg rounded">
        <h2 className="text-center fw-bold text-light">Create Account</h2>
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Name</label>
            <input
              type="text"
              name="name"
              className="form-control custom-input"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              name="email"
              className="form-control custom-input"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              name="password"
              className="form-control custom-input"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn w-100 custom-btn">Sign Up</button>
        </form>
        <p className="text-center mt-3 text-light">
          Already have an account? <a href="/login" className="text-warning">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
