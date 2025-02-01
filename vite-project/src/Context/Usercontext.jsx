import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  // States to store authToken and current_user
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
  const [current_user, setCurrentUser] = useState(null);

  // Logs the current user for debugging
  console.log("Current user:", current_user);

  // LOGIN functionality
  const login = (email, password) => {
    toast.loading("Logging you in ... ");
    fetch("https://python-p4-project-template-1.onrender.com/login", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.access_token) {
          toast.dismiss();
          sessionStorage.setItem("token", response.access_token);
          setAuthToken(response.access_token);

      // Fetch the current user after successful login
      fetchCurrentUser(response.access_token);
      
      toast.success("Successfully Logged in");
      navigate("/profile");
    } else if (response.error) {
      toast.dismiss();
      toast.error(response.error);
    } else {
      toast.dismiss();
      toast.error("Failed to login");
    }
  });
  };

  // LOGOUT functionality
  const logout = () => {

toast.loading("Logging you out ... ");
fetch("https://python-p4-project-template-1.onrender.com/logout", {
  method: "DELETE",
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  },
})
  .then((resp) => resp.json())
  .then((response) => {
    
    if (response.success)

    {
    sessionStorage.removeItem("token");
    setAuthToken(null);
    setCurrentUser(null);

    toast.dismiss();
    toast.success("Successfully logged out")

    navigate("/login")
    }

  })
}
  // Function to fetch the current user
  const fetchCurrentUser = (token) => {
    if (!token) return;  // Avoid fetching if no token is available

fetch('https://python-p4-project-template-1.onrender.com/current_user', {
  method: "GET",
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((response) => {
    if (response.email) {
      setCurrentUser(response); // Update current_user if email is found
    }
  })
  .catch((error) => {
    console.error("Error fetching current user:", error);
    toast.error("Failed to fetch current user");
  });
  };

  // Fetch current user when authToken changes
  useEffect(() => {
    if (authToken) {
      fetchCurrentUser(authToken);
    }
  }, [authToken]);

  // ADD User (registration)
  const addUser = (username, email, password) => {
    toast.loading("Registering ... ");
    fetch("https://python-p4-project-template-1.onrender.com/users", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.msg) {
          toast.dismiss();
          toast.success(response.msg);
          navigate("/login");
        } else if (response.error) {
          toast.dismiss();
          toast.error(response.error);
        } else {
          toast.dismiss();
          toast.error("Failed to add user");
        }
      });
  };

  // Function to update user (placeholder)
  const updateUser = async (updatedData) => {
    if (!authToken) return false;

    try {
      const response = await fetch("https://python-p4-project-template-1.onrender.com/update_profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
         " Authorization": `Bearer ${authToken}`,
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
  

  // Function to delete user (placeholder)
  const deleteUser = (userId) => {
    console.log("Deleting user:", userId);
  };

  // Data to be passed to the context consumers
  const data = {
    authToken,
    login,
    current_user,
    logout,
    addUser,
    updateUser,
    deleteUser,
  };

  // Only render children if current_user data is available, otherwise show loading
  return (
    <UserContext.Provider value={data}>
      { children } {/* Conditional rendering */}
    </UserContext.Provider>
  );
};

