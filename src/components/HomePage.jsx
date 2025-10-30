import React, { useState, useEffect } from 'react';
import { Search, Plane, Award, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  // Easter egg state
  const navigate = useNavigate() ;
  const [konamiSequence] = useState(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']);
  const [currentSequence, setCurrentSequence] = useState([]);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [planeAnimation, setPlaneAnimation] = useState(false);
  const [flights, setFlights] = useState([]);
 const handleClicknav = () =>{
    navigate("/flights")
 }
  // Handle konami code
  useEffect(() => {
    const handleKeyPress = (event) => {
      const newSequence = [...currentSequence, event.code].slice(-10);
      setCurrentSequence(newSequence);
      
      if (JSON.stringify(newSequence) === JSON.stringify(konamiSequence)) {
        setEasterEggActive(true);
        setPlaneAnimation(true);
        setTimeout(() => setPlaneAnimation(false), 3000);
        setTimeout(() => setEasterEggActive(false), 8000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSequence, konamiSequence]);

useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/flights", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${localStorage.getItem("token")}` // if needed
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch flights");
        }

        const data = await res.json();
        console.log(data.message)
        setFlights(data.message);
      } catch (err) {
        console.error("Error fetching flights:", err);
      }
    };
  
    fetchFlights();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SkyVoyage</h1>
            </div>
           
          </div>
        </div>
      </header>

      {/* Easter Egg Animation */}
      {planeAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="animate-bounce absolute top-1/4 left-1/4 text-4xl">✈️</div>
          <div className="animate-pulse absolute top-1/3 right-1/4 text-3xl">🌟</div>
          <div className="animate-spin absolute bottom-1/3 left-1/3 text-2xl">🛫</div>
        </div>
      )}

      {/* Easter Egg Message */}
      {easterEggActive && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg z-40 animate-bounce">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-bold">Konami Code Activated!</p>
              <p className="text-sm">You found the secret developer mode!</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Your Journey Starts Here
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations and book your perfect flight with ease. 
            Professional service, unbeatable prices.
          </p>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Adventure?</h3>
          <p className="text-gray-600 mb-6">Search thousands of flights and find the perfect deal for your next trip.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span onClick={handleClicknav}>Start Searching Flights</span>
          </button>
        </div>

        {/* Popular Destinations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Popular Destinations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flights.map((obj) => (
              <div key={obj.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl">
                  {obj.arrivalAirportDetail.name}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg text-gray-900">{obj.arrivalAirportDetail.name}</h4>
                  <p className="text-gray-600 mb-2">{obj.arrivalAirportDetail.name}</p>
                  <p className="text-blue-600 font-bold">From {obj.arrivalAirportDetail.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Best Price Guarantee</h4>
            <p className="text-gray-600">Find a better price elsewhere? We'll match it or give you the difference back.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Secure Booking</h4>
            <p className="text-gray-600">Your personal and payment information is protected with industry-leading security.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-gray-600">Our customer service team is available around the clock to assist you.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Plane className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">SkyVoyage</h3>
              </div>
              <p className="text-gray-400">Making travel dreams come true, one flight at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Get travel deals and updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="flex-1 px-3 py-2 rounded-l-lg text-gray-900"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkyVoyage. All rights reserved. {easterEggActive && "🎮 Developer mode activated! 🎮"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;