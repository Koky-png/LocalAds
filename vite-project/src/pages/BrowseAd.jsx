import React, { useContext } from "react";
import { AdContext } from "../Context/Adcontext";

function BrowseAds() {
  const { ads, loading } = useContext(AdContext);

  return (
    <div className="container py-5">
      <h1 className="text-center">Browse Ads</h1>
      {loading ? (
        <p className="text-center">Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-center">No ads available. Post an ad to see it here!</p>
      ) : (
        <div className="row">
          {ads.map((ad) => (
            <div key={ad.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={ad.image_url || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={ad.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{ad.title}</h5>
                  <p className="card-text">{ad.description}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${ad.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseAds;
