import React, { useState } from 'react';
import axios from 'axios';

function PostAd() {
  const [ad, setAd] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setAd({
      ...ad,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/ads', ad); // Replace with your API endpoint
      setSuccessMessage('Ad posted successfully!');
      setAd({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
      });
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to post the ad. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Post an Ad</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Ad Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            value={ad.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            rows="4"
            value={ad.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            id="price"
            value={ad.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className="form-control"
            id="imageUrl"
            value={ad.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Post Ad</button>
      </form>
    </div>
  );
}

export default PostAd;
