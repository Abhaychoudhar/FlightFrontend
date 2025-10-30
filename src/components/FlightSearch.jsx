import React, { useState } from "react";
import FlightList from "./FlightList";
import ErrorResponse from "../utils/ErrorResponse";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [flights, setFlights] = useState([]);
  const [all, setAll] = useState(0);
  const [error, setError] = useState("");

  const onFetchAll = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/flights");
      const data = await res.json();
      setAll(1);
      setFlights(data.message);
      setError("");
      console.log("Flights fetched:", data.message);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Unable to fetch flights. Please try again later.");
    }
  };

  // Search flights
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAll(0);
    setError("");

    const params = new URLSearchParams();

    if (from && to) params.append("trips", `${from}-${to}`);
    if (date) params.append("tripDate", date);
    if (passengers) params.append("travellers", passengers);

    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? 999999 : Number(maxPrice);

    if (min && max && min > max) {
      setError("Minimum price cannot be greater than maximum price");
      return;
    }

    if (min || max) params.append("price", `${min}-${max}`);

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/flights/?${params.toString()}`
      );
      const data = await res.json();
      setFlights(data.message);
      setError("");
      console.log("Search results:", data.message);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch flights. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white border rounded-2xl shadow-lg">
      <h2 className="text-center text-3xl font-extrabold mb-6 text-gray-800">
        Find Your Perfect Flight
      </h2>

      {error && <ErrorResponse message={error} />}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            type="text"
            placeholder="City / Airport"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            type="text"
            placeholder="City / Airport"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departure Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passengers
          </label>
          <input
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              placeholder="₹ Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              placeholder="₹ Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 md:col-span-2 lg:col-span-3 justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
          >
             Search Flights
          </button>

          <button
            type="button"
            onClick={onFetchAll}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
          >
               View All
          </button>
        </div>
      </form>

      <div className="mt-8">
        <FlightList flights={flights} passengers={passengers} />
      </div>
    </div>
  );
};

export default FlightSearch;
