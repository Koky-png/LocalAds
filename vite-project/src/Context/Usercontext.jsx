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
  // LOGIN
  const login = (email, password_hash) => 
    {
        toast.loading("Logging you in ... ")
        fetch("http://127.0.0.1:5000/login",{
            method:"POST",
            headers: {
                'Content-type': 'application/json',
              },
            body: JSON.stringify({
                email, password_hash 
            })
        })
        .then((resp)=>resp.json())
        .then((response)=>{
            if(response.access_token){
                toast.dismiss()

                sessionStorage.setItem("token", response.access_token);

                setAuthToken(response.access_token)

                fetch('http://127.0.0.1:5000/current_user',{
                    method:"GET",
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${response.access_token}`
                    }
                })
                .then((response) => response.json())
                .then((response) => {
                  if(response.email){
                          setCurrentUser(response)
                        }
                });

                toast.success("Successfully Logged in")
                navigate("/")
            }
            else if(response.error){
                toast.dismiss()
                toast.error(response.error)

            }
            else{
                toast.dismiss()
                toast.error("Failed to login")

            }
          
            
        })
    };
  // LOGOUT functionality
  const logout = () => {

toast.loading("Logging you out ... ");
fetch("http://127.0.0.1:5000/logout", {
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

    navigate("http://127.0.0.1:5000/login")
    }

  })
}
 // Fetch current user
 useEffect(()=>{
  fetchCurrentUser()
}, [])
const fetchCurrentUser = () => 
{
  console.log("Current user fcn ",authToken);
  
  fetch("http://127.0.0.1:5000/current_user", {
      method:"GET",
      headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authToken}`
      }
  })
  .then((response) => response.json())
  .then((response) => {
    if(response.email){
     setCurrentUser(response)
    }
  });
};

  // ADD User (registration)
  const addUser = (username, email, password_hash ) => {
    toast.loading("Registering ... ");
    fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, email, password_hash  }),
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
      const response = await fetch("http://127.0.0.1:5000/update_profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization ': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

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