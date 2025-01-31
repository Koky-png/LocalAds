import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdCard from './AdCard';

function AdList() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/ads');
        setAds(response.data);
      } catch (error) {
        setError('Failed to load ads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Latest Ads</h2>
      {loading && <p className="text-center">Loading ads...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div key={ad.id} className="col-md-4 mb-4">
              <AdCard ad={ad} />
            </div>
          ))
        ) : (
          !loading && <p className="text-center">No ads available.</p>
        )}
      </div>
    </div>
  );
}

export default AdList;
