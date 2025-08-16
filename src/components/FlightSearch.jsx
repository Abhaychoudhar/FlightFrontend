import React, { useState } from "react";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
const onFetchAll = async () => {
  try {
    console.log("All flights Requested ")
    const res = await fetch("http://localhost:5000/api/v1/flights");
    const data = await res.json();
    console.log("Flights data:", data);
  } catch (err) {
    console.error("Error fetching flights:", err);
  }
};
  const handleSubmit = (e) => {
    e.preventDefault();

    const searchData = {
      from,
      to,
      date,
      passengers,
    };

    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <div
      className="flight-search"
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Search Flights</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="text"
          placeholder="From (City / Airport)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To (City / Airport)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        <button
          type="button"
          onClick={onFetchAll}
          style={{
            padding: "10px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          View All Flights
        </button>
      </form>
    </div>
  );
};

export default FlightSearch;
