import React, { useState, useContext } from "react";
import { UserContext } from "../Context/Usercontext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setAuthToken } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setAuthToken(data.access_token);
      navigate("/browse-ads"); // Redirect to ads page
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleLogin} className="shadow p-4 rounded">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
