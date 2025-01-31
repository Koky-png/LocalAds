import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/path-to-your-logo.svg" // Replace with your logo path
              alt="Logo"
              className="me-2"
              style={{ height: "40px" }}
            />
            <span>MyWebsite</span>
          </a>
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
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/create-ad">
                  Create Ad
                </a>
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
