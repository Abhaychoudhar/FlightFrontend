import { useNavigate } from "react-router-dom";
import { PlaneTakeoff, PlaneLanding, IndianRupee, Users } from "lucide-react";

const FlightCard = ({ flight, passengers }) => {
  const navigate = useNavigate();

  const durationMs = new Date(flight.arrivalTime) - new Date(flight.departureTime);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center border rounded-2xl shadow-lg p-6 mb-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
      
      <div className="flex flex-col w-full md:w-1/5 mb-4 md:mb-0">
        <span className="font-bold text-xl text-gray-800">{flight.airline}</span>
        <span className="text-gray-500 text-sm">
          Flight No: <span className="font-medium">{flight.flightNumber}</span>
        </span>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/4">
        <PlaneTakeoff className="text-blue-600 mb-1" size={22} />
        <span className="font-semibold text-lg text-gray-800">
          {flight.departureAirportDetail.cityDetails.name}
        </span>
        <span className="text-sm text-gray-500">
          {flight.departureAirportDetail.name} ({flight.departureAirportDetail.cityDetails.code})
        </span>
        <span className="text-gray-600 text-sm mt-1">
          {new Date(flight.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/6 my-3 md:my-0">
        <div className="relative flex items-center w-20">
          <div className="h-px w-full border-t border-dashed border-gray-400"></div>
          <span className="absolute bg-white px-2 text-xs text-gray-600 -top-3">
            {hours}h {minutes}m
          </span>
        </div>
        <span className="text-gray-400 text-xs mt-1">Non-stop</span>
      </div>

      {/* Arrival Info */}
      <div className="flex flex-col items-center w-full md:w-1/4">
        <PlaneLanding className="text-green-600 mb-1" size={22} />
        <span className="font-semibold text-lg text-gray-800">
          {flight.arrivalAirportDetail.cityDetails.name}
        </span>
        <span className="text-sm text-gray-500">
          {flight.arrivalAirportDetail.name} ({flight.arrivalAirportDetail.cityDetails.code})
        </span>
        <span className="text-gray-600 text-sm mt-1">
          {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {/* Price & Seats */}
      <div className="flex flex-col items-end w-full md:w-1/5 mt-4 md:mt-0">
        <span className="text-green-700 font-bold text-2xl flex items-center gap-1">
          <IndianRupee size={20} /> {flight.price * passengers}
        </span>
        <span className="text-gray-500 text-sm flex items-center gap-1 mt-1">
          <Users size={16} /> {flight.totalSeats} seats left
        </span>
        <button
          className="mt-3 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm rounded-xl shadow-md transition"
          onClick={() =>
            navigate(`/flight`, { state: { flight, passengers } })
          }
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// eventually all the props are bundled in a single object and here we are directly destrcuring tha object
const FlightList = ({ flights, passengers }) => {
  return (
    <div className="mt-6">
      {flights.length > 0 ? (
        flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} passengers={passengers} />
        ))
      ) : (
        <p className="text-center text-gray-500">No flights found</p>
      )}
    </div>
  );
};

export default FlightList;
