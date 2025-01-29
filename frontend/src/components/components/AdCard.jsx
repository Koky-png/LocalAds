import React from 'react';

function AdCard({ ad }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src="..." alt={ad.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{ad.title}</h2>
        <p className="text-gray-700">{ad.description}</p>
        <p className="text-gray-900 font-bold">Price: ${ad.price}</p>
        <p className="text-gray-500">Posted by: {ad.seller.name}</p>
      </div>
    </div>
  );
}

export default AdCard;