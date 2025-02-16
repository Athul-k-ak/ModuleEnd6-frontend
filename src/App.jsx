import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Products from "./components/Products";
import Signup from "./components/Signup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg px-3 custom-navbar">
  <div className="container-fluid">
    {/* Brand Logo */}
    <Link className="navbar-brand d-flex align-items-center" to="/">
     
      <span className="fw-bold brand-name">ShopEase</span>
    </Link>

    {/* Mobile Toggle Button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navbar Links */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link nav-hover" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link nav-hover" to="/products">Products</Link>
        </li>
        {!isAuthenticated && (
          <li className="nav-item">
            <Link className="nav-link nav-hover" to="/signup">Signup</Link>
          </li>
        )}
        <li className="nav-item">
          {!isAuthenticated ? (
            <Link className="nav-link login-link" to="/login">Login</Link>
          ) : (
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  </div>
</nav>


      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Products />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );

  function ProtectedRoute({ isAuthenticated, children }) {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
};

export default App;
