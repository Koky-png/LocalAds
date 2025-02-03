import React, { createContext, useState, useEffect } from "react";

export const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]);

  // Fetch all ads when component mounts
  useEffect(() => {
    fetch("https://localads.onrender.com/ads")
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error("Error fetching ads:", error));
  }, []);

  // ✅ Function to post a new ad
  const addAd = (title, description, price) => {
    fetch("https://localads.onrender.com/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      body: JSON.stringify({ title, description, price }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ad_id) {
          setAds((prevAds) => [{ id: data.ad_id, title, description, price }, ...prevAds]);
        } else {
          console.error("Error adding ad:", data.error);
        }
      })
      .catch((error) => console.error("Error posting ad:", error));
  };

  // ✅ Function to update an existing ad
  const updateAd = (id, updatedData) => {
    fetch(`https://localads.onrender.com/ads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      body: JSON.stringify(updatedData),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.msg) {
          setAds((prevAds) =>
            prevAds.map((ad) =>
              ad.id === id ? { ...ad, ...updatedData } : ad
            )
          );
        } else {
          console.error("Error updating ad:", response.error);
        }
      })
      .catch((error) => console.error("Error updating ad:", error));
  };

  // ✅ Function to delete an ad
  const deleteAd = (id) => {
    fetch(`https://localads.onrender.com/ads/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
        } else {
          console.error("Error deleting ad:", data.error);
        }
      })
      .catch((error) => console.error("Error deleting ad:", error));
  };

  return (
    <AdContext.Provider value={{ ads, addAd, updateAd, deleteAd }}>
      {children}
    </AdContext.Provider>
  );
};
