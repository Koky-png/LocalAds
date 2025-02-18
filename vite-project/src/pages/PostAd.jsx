import React, { useState, useContext } from "react";
import { AdContext } from "../Context/Adcontext";
import { toast } from "react-toastify";

function PostAd() {
  const { addAd } = useContext(AdContext);
  const [ad, setAd] = useState({ title: "", description: "", price: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setAd({ ...ad, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addAd(ad.title, ad.description, ad.price);
    setAd({ title: "", description: "", price: "" });
    toast.success("Ad posted successfully!");
    setLoading(false);
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
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Posting..." : "Post Ad"}
        </button>
      </form>
    </div>
  );
}

export default PostAd;
