import React, { useState, useContext } from "react";
import { UserContext } from "../Context/Usercontext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    login(email, password);
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>

    {/* Email Input */}
    <div className="mb-3">
      <label
        htmlFor="exampleInputEmail1"
        className="form-label text-muted fw-semibold"
      >
        Email Address
      </label>
      <input
        type="email"
        className="form-control rounded-pill"
        id="exampleInputEmail1"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>

    {/* Password Input */}
    <div className="mb-3">
      <label
        htmlFor="exampleInputPassword1"
        className="form-label text-muted fw-semibold"
      >
        Password
      </label>
      <input
        type="password"
        className="form-control rounded-pill"
        id="exampleInputPassword1"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    {/* Checkbox */}
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="exampleCheck1"
      />
      <label className="form-check-label text-muted" htmlFor="exampleCheck1">
        Remember me
      </label>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="btn btn-primary w-100 rounded-pill fw-semibold"
    >
      Login
    </button>

    {/* Register Link */}
    <div className="text-center mt-3">
      <p className="text-muted">
        Don't have an account?{" "}
        <a href="/register" className="text-primary fw-semibold">
          Register here
        </a>
      </p>
    </div>
  </form>
</div>
  );
}

