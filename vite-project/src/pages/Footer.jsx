import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h1 className="h5">MyWebsite</h1>
            <p className="small">Your trusted website for amazing content.</p>
          </div>

          <div className="col-md-4 text-center mb-3 mb-md-0">
            <NavLink to="/" className="text-white text-decoration-none me-3 small">
              Home
            </NavLink>
            <NavLink to="/about" className="text-white text-decoration-none small">
              About
            </NavLink>
          </div>

          <div className="col-md-4 text-center text-md-end">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none me-3">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>

        <div className="text-center mt-3 small">
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;