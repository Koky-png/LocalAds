import React from 'react';

function Home() {
  return (
    <div className="container py-5">
      <div className="text-center">
        <h1 className="display-4">Welcome to Local Classified Ads</h1>
        <p className="lead mt-3">
          Connecting buyers and sellers in your community with ease.
        </p>
        <div className="mt-4">
          <a href="/browse-ads" className="btn btn-primary btn-lg me-3">
            Browse Ads
          </a>
          <a href="/post-ad" className="btn btn-secondary btn-lg">
            Post an Ad
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;