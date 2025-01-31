import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateAd from "./pages/Createad";
import Login from './pages/Login';
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { UserProvider } from "./Context/Usercontext";
function App() {
  return (
    <BrowserRouter>
     <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create-ad" element={<CreateAd />} />
          </Route>
        </Routes>
        </UserProvider>
    </BrowserRouter>
  );
}

export default App;