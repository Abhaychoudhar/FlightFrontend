import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
function decodeToken(token) {
  try {
    // JWT format: header.payload.signature
    const payloadBase64 = token.split('.')[1]; 
    // Convert from Base64URL → Base64
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    // Decode Base64 → JSON string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null; // invalid token format
  }
}

// Example usage
  useEffect(() => {
   const token = localStorage.getItem("token");
  if (token) {
    const payload = decodeToken(token);
    if (payload) {
      setLoading(false) ;
      setProfile(payload); // store in state and show in UI
    }
  }  
}, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  if (!profile) return <p className="text-center mt-10 text-red-600">Profile not found</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        <div className="mb-4">
          <p className="text-gray-600">Email:</p>
          <p className="font-semibold">{profile.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">User ID:</p>
          <p className="font-semibold">{profile.id}</p>
        </div>
        <div>
          <p className="text-gray-600">Joined:</p>
          <p className="font-semibold">
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
