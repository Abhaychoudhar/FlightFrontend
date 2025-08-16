// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#1e3a8a",
        color: "#fff",
      }}
    >
      {/* Logo / Brand */}
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        🛫 FlightApp
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/flights" style={linkStyle}>
          Flights
        </Link>
        <Link to="/bookings" style={linkStyle}>
          Bookings
        </Link>
        <Link to="/profile" style={linkStyle}>
          Profile
        </Link>
      </div>
    </nav>
  );
};

// Common link style
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "16px",
};

export default Navbar;
