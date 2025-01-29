import React, { useState } from 'react';
import AdForm from './components/AdForm';

function CreateAd() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Ad</h2>
        <AdForm />
      </div>
    </div>
  );
}

export default CreateAd;