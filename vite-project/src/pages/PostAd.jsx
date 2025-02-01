import React, { useState, useContext } from "react";
import { AdContext } from "../Context/Adcontext";

function PostAd() {
  const { addAd } = useContext(AdContext);
  const [ad, setAd] = useState({ title: "", description: "", price: "", image_url: "" });

  const handleChange = (e) => setAd({ ...ad, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAd(ad.title, ad.description, ad.price, ad.image_url);
    setAd({ title: "", description: "", price: "", image_url: "" });
    alert("Ad posted successfully!");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center">Post an Ad</h1>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control mb-3"
          value={ad.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          value={ad.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control mb-3"
          value={ad.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          className="form-control mb-3"
          value={ad.image_url}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary w-100">Post Ad</button>
      </form>
    </div>
  );
}

export default PostAd;
