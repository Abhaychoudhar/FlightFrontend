// src/components/ErrorResponse.jsx
import React from "react";

const ErrorResponse = ({ message }) => {
  if (!message) return null; // don't render if no message

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorResponse;
