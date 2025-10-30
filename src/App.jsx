import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FlightSearch from "./components/FlightSearch"
import HomePage from "./components/HomePage"

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/flights" element={<FlightSearch/>} />
          <Route path="/bookings" element={<h2>Your Bookings 📅</h2>} />
          <Route path="/profile" element={<h2>User Profile 👤</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
