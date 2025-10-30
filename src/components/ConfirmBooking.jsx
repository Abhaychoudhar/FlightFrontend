import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { IndianRupee, CheckCircle, Clock } from "lucide-react";
import axios from "axios";
import ErrorResponse from "../utils/ErrorResponse"
import { useRef } from "react";
const ConfirmBooking = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { flight, passengers } = state || {};
  const stableTime = useRef(20*60)
  const booking = {
    flightId: flight.id,
    userId: 77,
    noOfSeats: passengers,
    totalCost : flight.price*passengers,
    status : "booked"
  }
  const [timeLeft, setTimeLeft] = useState(stableTime.current);
 // now a travel itenary is created for you which is there for 20 minutes of time
 // you can initiate the booking here
  const handleConfirmation = async (e) => {
  // now since the user has clicked the confirm button the booking must be booked
  try {
    const response = await axios.post("http://localhost:4000/api/v1/bookings/", booking);
    console.log("Success:", response.data);
     navigate(`/`)
  } catch (error) {
    console.error("Error:", error);
  }
}
useEffect(() => {
  // Check if we already have an expiry timestamp stored
  const expiry = localStorage.getItem("bookingExpiry");

  if (!expiry) {
    const newExpiry = Date.now() + 20 * 60 * 1000; // 20 mins from now
    localStorage.setItem("bookingExpiry", newExpiry);
  }

  const interval = setInterval(() => {
    const expiryTime = localStorage.getItem("bookingExpiry");
    const remaining = Math.floor((expiryTime - Date.now()) / 1000);

    if (remaining <= 0) {
      clearInterval(interval);
      localStorage.removeItem("bookingExpiry");
      alert("⏳ Session expired! Please search again.");
      navigate("/");
    } else {
      setTimeLeft(remaining);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [navigate]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 border rounded-2xl shadow-lg bg-white text-center">
      {/* Countdown Timer */}
      <div className="flex items-center justify-center gap-2 mb-6 text-red-600 font-bold text-lg">
        <Clock size={22} />
        <span>Time Left: {formatTime(timeLeft)}</span>
      </div>

      <CheckCircle className="mx-auto text-green-600 mb-4" size={50} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Confirm Your Booking
      </h2>

      <div className="text-left space-y-3 mb-6">
        <p><strong>Airline:</strong> {flight.airline}</p>
        <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
        <p>
          <strong>From:</strong> {flight.departureAirportDetail.cityDetails.name} (
          {flight.departureAirportDetail.cityDetails.code})
        </p>
        <p>
          <strong>To:</strong> {flight.arrivalAirportDetail.cityDetails.name} (
          {flight.arrivalAirportDetail.cityDetails.code})
        </p>
        <p><strong>Passengers:</strong> {passengers || 1}</p>
        <p className="text-lg font-semibold text-green-700 flex items-center gap-1">
          <IndianRupee size={20} /> Total: {flight.price * (passengers || 1)}
        </p>
      </div>

      <button
        className="w-full py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition mb-4"
       onClick={handleConfirmation}
>
        Confirm & Pay
      </button>

      <Link
        to={`/flights/${id}`}
        state={{ flight, passengers }}
        className="inline-block px-5 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
      >
        Go Back
      </Link>
    </div>
  );
};

export default ConfirmBooking;
