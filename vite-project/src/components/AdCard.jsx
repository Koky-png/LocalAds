import React from 'react';

function AdCard({ ad }) {
  return (
    <div className="card shadow-sm">
      <img src="..." className="card-img-top" alt={ad.title} />
      <div className="card-body">
        <h5 className="card-title">{ad.title}</h5>
        <p className="card-text">{ad.description}</p>
        <p className="fw-bold">Price: ${ad.price}</p>
        <p className="text-muted">Posted by: {ad.seller.name}</p>
      </div>
    </div>
  );
}

export default AdCard;