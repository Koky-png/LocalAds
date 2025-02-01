import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import BrowseAds from "./pages/BrowseAd"; // Fixed incorrect import name
import PostAd from "./pages/PostAd"; 
import { UserProvider } from "./Context/Usercontext"; // Fixed path
import { AdProvider } from "./Context/Adcontext"; // Fixed path
import './App.css';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AdProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="logout" element={<Logout />} /> {/* Fixed this route */}
              <Route path="browse-ads" element={<BrowseAds />} />
              <Route path="post-ad" element={<PostAd />} />
            </Route>
          </Routes>
        </AdProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
