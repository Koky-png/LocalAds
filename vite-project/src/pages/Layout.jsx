import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Usercontext";

const Layout = () => {
  const { setAuthToken } = useContext(UserContext); // Get authentication context
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null); // Remove auth token from context
    localStorage.removeItem("authToken"); // Clear auth token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src="/path-to-your-logo.svg" // Replace with your logo path
              alt="Logo"
              className="me-2"
              style={{ height: "40px" }}
            />
            <span>MyWebsite</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 bg-light py-5">
        <div className="container">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-4">
        <div className="container">
          <img
            src="/path-to-your-logo.svg" // Replace with your footer logo path
            alt="Footer Logo"
            className="mb-3"
            style={{ height: "30px" }}
          />
          <p className="mb-0">&copy; 2025 MyWebsite. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
