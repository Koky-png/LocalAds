import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Usercontext";
import { toast } from "react-toastify";

function logout() {
  const { setAuthToken } = useContext(UserContext); // Use UserContext to clear auth token
  const navigate = useNavigate();

  useEffect(() => {
    // Remove auth token and log the user out
    setAuthToken(null);
    localStorage.removeItem("authToken"); // Remove token from local storage
    toast.success("Logged out successfully!");
    
    // Redirect to login page after logout
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }, [setAuthToken, navigate]);

  return (
    <div className="container py-5 text-center">
      <h2>Logging out...</h2>
      <p>You will be redirected to the login page.</p>
    </div>
  );
}

export default logout;
