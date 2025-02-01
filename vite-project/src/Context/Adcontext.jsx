import React, { createContext, useState, useEffect } from "react";

export const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all ads
  useEffect(() => {
    fetch("https://python-p4-project-template-2.onrender.com/ads")
      .then((response) => response.json())
      .then((data) => {
        setAds(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching ads:", error));
  }, []);

  // Post new ad
  const addAd = (title, description, price, image_url) => {
    fetch("https://python-p4-project-template-2.onrender.com/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price, image_url }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ad_id) {
          setAds((prevAds) => [
            { id: data.ad_id, title, description, price, image_url },
            ...prevAds,
          ]);
        } else {
          console.error("Error adding ad:", data.error);
        }
      })
      .catch((error) => console.error("Error posting ad:", error));
  };

  return (
    <AdContext.Provider value={{ ads, addAd, loading }}>
      {children}
    </AdContext.Provider>
  );
};
