import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateAd from "./pages/Createad";
import BrowseAds from "./pages/BrowseAd";
import PostAd from "./pages/PostAd"; 
import { UserProvider } from "./Context/Usercontext";
import './App.css';


const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create-ad" element={<CreateAd />} />
            <Route path="browse-ads" element={<BrowseAds />} />
            <Route path="post-ad" element={<PostAd />} /> {/* Add this route */}
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
