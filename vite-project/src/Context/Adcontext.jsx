import React, { createContext, useState, useEffect } from "react";

export const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
 

  // Fetch all ads
  useEffect(() => {
    fetch("http://127.0.0.1:5000/ads")
      .then((response) => response.json())
      .then((response) => {
        setAds(response);
       
      })
      .catch((error) => console.error("Error fetching ads:", error));
  }, []);

  // Post new ad
  const addAd = (title, description, price) => {
    fetch("http://127.0.0.1:5000/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ad_id) {
          setAds((prevAds) => [
            { id: data.ad_id, title, description, price },
            ...prevAds,
          ]);
        } else {
          console.error("Error adding ad:", data.error);
        }
      })
      .catch((error) => console.error("Error posting ad:", error));
  };
  const updateAd = (id, name, description, scheduled_time) => {

      fetch(`http://127.0.0.1:5000/ads${id}`, {
          method: "PUT",
          headers: {
              "Content-type": "application/json",
              Authorization:`Bearer ${authToken}`,
          },
          body: JSON.stringify({
              name,
              description,
              scheduled_time,
          }),
      })
      .then((resp) => resp.json())
      .then((response) => {
          toast.dismiss();
          if (response.success) {
              toast.success(response.success);
              setOnChange(!onChange); 
          } else if (response.error) {
              toast.error(response.error);
          } else {
              toast.error("Failed to update Activity");
          }
      })
      .catch((error) => {
          toast.dismiss();
          toast.error("Error updating Activity");
          console.error("Update Error:", error);
      });
      };



  
  const deleteAd = (id) => 
    {
        toast.loading("Deleting todo ... ")
        fetch(`http://127.0.0.1:5000/todo/${id}`,{
            method:"DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`

              }
        })
        .then((resp)=>resp.json())
        .then((response)=>{
            
            if(response.success){
                toast.dismiss()
                toast.success(response.success)
                setOnchange(!onChange)
                navigate("/")

            }
            else if(response.error){
                toast.dismiss()
                toast.error(response.error)

            }
            else{
                toast.dismiss()
                toast.error("Failed to delete")

            }
          
            
        })
    }
    const data = {
      ads,
     
 
  
      addAd,
      updateAd,
      deleteAd,
    }
  return (
    <AdContext.Provider>
      {children}
    </AdContext.Provider>
  );
};
