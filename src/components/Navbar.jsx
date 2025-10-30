// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // ✅ hook to navigate programmatically

  const handleClick = () => {
    alert("Logged Out!");
    localStorage.removeItem("token");
    navigate("/"); // redirect after logout (use "/" or "/home" depending on your routes)
  };

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
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>FlightApp</div>

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
        <button onClick={handleClick} style={buttonStyle}>
          Log out
        </button>
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

// Optional button style
const buttonStyle = {
  background: "transparent",
  border: "1px solid #fff",
  color: "#fff",
  padding: "4px 10px",
  cursor: "pointer",
  borderRadius: "4px",
};

export default Navbar;
