// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileListing from "./pages/ProfileListing";
import ProfileDetailsPage from "./pages/ProfileDetailsPage"; // Assuming you have this component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfileListing />} />
      <Route path="/profile/:id" element={<ProfileDetailsPage />} />
    </Routes>
  );
};

export default App;
