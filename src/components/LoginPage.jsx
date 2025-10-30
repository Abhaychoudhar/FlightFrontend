import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const LoginPage = () => {
  const { setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
  // navigate(-1); // redirect after login
    // Fake auth check (replace with real API call)
      const response = await fetch("http://localhost:4000/api/v1/bookings/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: "include" 
    });
      const data = await response.json();

    console.log("Token:", data.token);
    localStorage.setItem("token",data.token) ;
    navigate(-1);
  };

  const handleSignup = () => {
    navigate("/signup"); // navigate to signup page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?
          </p>
          <button
            onClick={handleSignup}
            className="py-2 px-4 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition text-sm"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
