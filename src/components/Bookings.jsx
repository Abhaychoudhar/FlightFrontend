import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/v1/bookings",);
console.log( response.data);
       setBookings(response.data.message);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading bookings...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Your Bookings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`p-6 rounded-2xl shadow-lg text-white ${
              booking.status === "booked" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">Flight: {booking.flightNumber}</h3>
            <p className="mb-1">Passenger: {booking.passengerName}</p>
            <p className="mb-1">Seats: {booking.seats}</p>
            <p className="font-semibold">
              Status: {booking.status.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
