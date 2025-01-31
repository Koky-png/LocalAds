import React, { useState } from "react";
import axios from "axios";

function AdForm() {
  const [ad, setAd] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    sellerName: "",
  });

  const handleChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/ads", ad);
      alert("Ad created successfully!");
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={ad.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={ad.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={ad.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          className="form-control"
          value={ad.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Seller Name</label>
        <input
          type="text"
          name="sellerName"
          className="form-control"
          value={ad.sellerName}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Create Ad</button>
    </form>
  );
}

export default AdForm;
