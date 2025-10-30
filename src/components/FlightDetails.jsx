import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { PlaneTakeoff, PlaneLanding, IndianRupee, Users } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";

// Confirm booking button (when logged in)
const ConfirmButton = ({ flight, passengers }) => {
  return (
    <Link
      to={`/confirm-booking/${flight.id}`}
      state={{ flight, passengers }}
      className="px-5 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
    >
      Confirm Booking
    </Link>
  );
};

// Redirect to login if not logged in
const LoginFirst = () => {
  return (
    <Link
      to="/login"
      className="px-5 py-2 bg-green-600 text-lime-100 rounded-xl shadow-md hover:bg-green-700 transition"
    >
      Confirm Booking
    </Link>
  );
};

const FlightDetails = () => {
  const { state } = useLocation();
  const { flight, passengers } = state || {};
  const { loggedIn } = useContext(AppContext);

  // If no flight is passed
  if (!flight) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No flight details found.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {flight.airline} - Flight {flight.flightNumber}
      </h2>

      <div className="flex justify-between mb-6">
        <div>
          <PlaneTakeoff className="text-blue-600 mb-1" size={22} />
          <p className="font-semibold">
            {flight.departureAirportDetail.cityDetails.name}
          </p>
          <p className="text-sm text-gray-500">
            {flight.departureAirportDetail.name} (
            {flight.departureAirportDetail.cityDetails.code})
          </p>
          <p className="text-gray-600">
            {new Date(flight.departureTime).toLocaleString()}
          </p>
        </div>

        <div>
          <PlaneLanding className="text-green-600 mb-1" size={22} />
          <p className="font-semibold">
            {flight.arrivalAirportDetail.cityDetails.name}
          </p>
          <p className="text-sm text-gray-500">
            {flight.arrivalAirportDetail.name} (
            {flight.arrivalAirportDetail.cityDetails.code})
          </p>
          <p className="text-gray-600">
            {new Date(flight.arrivalTime).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-green-700 font-bold text-xl flex items-center gap-1">
          <IndianRupee size={20} /> {flight.price * (passengers || 1)}
        </span>
        <span className="text-gray-500 text-sm flex items-center gap-1">
          <Users size={16} /> {flight.totalSeats - (passengers || 0)} seats left
        </span>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>

        {localStorage.getItem("token") ? (
  <ConfirmButton flight={flight} passengers={passengers} />
) : (
  <LoginFirst />
)}
      </div>
    </div>
  );
};

export default FlightDetails;
