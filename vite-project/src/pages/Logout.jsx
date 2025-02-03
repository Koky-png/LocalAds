import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Usercontext";
import { toast } from "react-toastify";

const Logout = () => {
  const { logout } = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        setTimeout(() => {
          navigate("/login");  
        }, 1000);
      })
      .catch((error) => {
        toast.error("Failed to logout. Try again.");
        console.error("Logout Error:", error);
      });
  }, [logout, navigate]);

  return (
    <div className="container py-5 text-center">
      <h2>Logging out...</h2>
      <p>You will be redirected to the login page.</p>
    </div>
  );
};

export default Logout;
