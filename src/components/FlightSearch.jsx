import React, { useState } from "react";
import FlightList from "./FlightList";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState([]);

  const onFetchAll = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/flights");
      const data = await res.json();
      setFlights(data.message);
      console.log("Flights fetched:", data.message);
    } catch (err) {
      console.error("Error fetching flights:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchData = { from, to, date, passengers };
    console.log("Search submitted:", searchData);
    // TODO: Call search API here
  };

  return (
    <div className="max-w-full mx-auto p-6 border rounded-xl shadow-sm">
      <h2 className="text-center text-2xl font-bold mb-4">Search Flights</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-center justify-center"
      >
        <input
          type="text"
          placeholder="From (City / Airport)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded-lg flex-1 min-w-[150px]"
        />

        <input
          type="text"
          placeholder="To (City / Airport)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded-lg flex-1 min-w-[150px]"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-lg min-w-[150px]"
        />

        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="border p-2 rounded-lg w-20"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>

        <button
          type="button"
          onClick={onFetchAll}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          View All Flights
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-4">
        {flights.length > 0 ? <FlightList flights={flights} /> : (
          <p className="text-center text-gray-500">No flights!</p>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
