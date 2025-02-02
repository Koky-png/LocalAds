import React, { useState, useContext } from "react";
import { UserContext } from "../Context/Usercontext"; // Ensure correct import
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const { login } = useContext(UserContext); // Use login function from context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Prevent multiple submissions

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/browse-ads"); // Redirect on successful login
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please check your credentials.");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleLogin} className="shadow p-4 rounded">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
