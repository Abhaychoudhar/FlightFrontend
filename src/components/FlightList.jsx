import React from "react";

const FlightCard = ({ flight }) => {
  return (
    <div className="flex justify-between items-center border rounded-lg shadow-sm p-4 mb-3 bg-white hover:shadow-md transition">
      {/* Airline Info */}
      <div className="flex flex-col">
        <span className="font-bold text-lg">{flight.airline}</span>
        <span className="text-gray-600">Flight: {flight.flightNumber}</span>
      </div>

      {/* Departure Info */}
      <div className="flex flex-col text-center">
        <span className="font-semibold">{flight.departureAirportDetail.cityDetails.name}</span>
        <span className="text-sm text-gray-500">
          {flight.departureAirportDetail.name} ({flight.departureAirportDetail.cityDetails.code})
        </span>
        <span className="text-gray-500 text-sm">
          Departure: {new Date(flight.departureTime).toLocaleString()}
        </span>
      </div>

      {/* Arrival Info */}
      <div className="flex flex-col text-center">
        <span className="font-semibold">{flight.arrivalAirportDetail.cityDetails.name}</span>
        <span className="text-sm text-gray-500">
          {flight.arrivalAirportDetail.name} ({flight.arrivalAirportDetail.cityDetails.code})
        </span>
        <span className="text-gray-500 text-sm">
          Arrival: {new Date(flight.arrivalTime).toLocaleString()}
        </span>
      </div>

      {/* Price & Seats */}
      <div className="flex flex-col text-right">
        <span className="text-green-600 font-bold">₹ {flight.price}</span>
        <span className="text-sm text-gray-500">
          {flight.totalSeats} seats left
        </span>
      </div>
    </div>
  );
};



const FlightList = ({ flights }) => {
  return (
    <div className="mt-6">
      {flights.length > 0 ? (
        flights.map((flight) => <FlightCard key={flight.id} flight={flight} />)
      ) : (
        <p className="text-center text-gray-500">No flights found</p>
      )}
    </div>
  );
};

export default FlightList;
