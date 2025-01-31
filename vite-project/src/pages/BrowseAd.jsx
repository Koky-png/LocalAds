import React, { useState, useEffect } from "react";
import AdCard from "../components/AdCard";

function BrowseAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for testing
    const mockAds = [
      {
        id: 1,
        title: "Used Bicycle",
        description: "A great bicycle in excellent condition.",
        price: 100,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "Gaming Laptop",
        description: "High-performance laptop for gaming.",
        price: 1200,
        imageUrl: "https://via.placeholder.com/150",
      },
    ];

    setTimeout(() => {
      setAds(mockAds);
      setLoading(false);
    }, 1000); // Simulate API delay
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Browse Local Ads</h1>
      {loading ? (
        <p className="text-center">Loading ads...</p>
      ) : (
        <div className="row">
          {ads.map((ad) => (
            <div key={ad.id} className="col-md-4 mb-4">
              <AdCard ad={ad} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseAds;
