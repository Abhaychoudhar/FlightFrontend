import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FlightSearch from "./components/FlightSearch"
import HomePage from "./components/HomePage"
import FlightDetails from "@components/FlightDetails";
import ConfirmBooking from "@components/ConfirmBooking";
import PaymentPage from "./components/PaymentPage"
import LoginPage from "./components/LoginPage"
import SignupPage  from "@components/SignupPage";
import Bookings from "@components/Bookings";
import Profile from "@components/Profile"
 // we define all routes here and use them to render multiple components 
const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
       
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/flights" element={<FlightSearch/>} />
          <Route path="/bookings" element={<Bookings/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/flight" element={<FlightDetails />} />
          <Route path="/confirm-booking/:id" element={<ConfirmBooking />} />
          <Route path="/payment-page" element={<PaymentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
