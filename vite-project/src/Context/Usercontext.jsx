import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(() => localStorage.getItem("token"));
  const [current_user, setCurrentUser] = useState(null);

  console.log("Current user:", current_user);

  const login = (email, password) => {
    toast.loading("Logging you in ... ");
    fetch("https://python-p4-project-template-2.onrender.com/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.access_token) {
          toast.dismiss();
          localStorage.setItem("token", response.access_token);
          setAuthToken(response.access_token);

          fetchCurrentUser(response.access_token);
          
          toast.success("Successfully Logged in");
          navigate("/profile");
        } else {
          toast.dismiss();
          toast.error(response.error || "Failed to login");
        }
      });
  };

  const logout = () => {
    toast.loading("Logging you out ... ");
    fetch("https://python-p4-project-template-2.onrender.com/api/users/logout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.success) {
          localStorage.removeItem("token");
          setAuthToken(null);
          setCurrentUser(null);

          toast.dismiss();
          toast.success("Successfully logged out");
          navigate("/login");
        }
      });
  };

  const fetchCurrentUser = (token) => {
    if (!token) return;

    fetch("https://python-p4-project-template-2.onrender.com/api/users/current_user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.email) {
          setCurrentUser(response);
        } else {
          logout(); // 🔴 If token is invalid, logout
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        toast.error("Session expired. Please log in again.");
        logout();
      });
  };

  useEffect(() => {
    if (authToken) {
      fetchCurrentUser(authToken);
    }
  }, [authToken]);

  const addUser = (username, email, password) => {
    toast.loading("Registering ... ");
    fetch("https://python-p4-project-template-2.onrender.com/api/users", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.msg) {
          toast.dismiss();
          toast.success(response.msg);
          navigate("/login");
        } else {
          toast.dismiss();
          toast.error(response.error || "Failed to add user");
        }
      });
  };

  const updateUser = async (updatedData) => {
    if (!authToken) return false;

    try {
      const response = await fetch("https://python-p4-project-template-2.onrender.com/api/users/update_profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        setCurrentUser((prevUser) => ({ ...prevUser, ...updatedData }));
        toast.success("Profile updated successfully!");
        return true;
      } else {
        toast.error(data.error || "Failed to update profile");
        return false;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating");
      return false;
    }
  };

  const deleteUser = (userId) => {
    console.log("Deleting user:", userId);
  };

  const data = {
    authToken,
    login,
    current_user,
    logout,
    addUser,
    updateUser,
    deleteUser,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
