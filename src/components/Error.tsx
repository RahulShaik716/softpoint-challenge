import React from "react";

// Define props interface for the Error component
interface ErrorProps {
  message?: string; // Optional prop for the error message
  handleClose: () => void; // Function prop to handle closing the error modal
}

const Error: React.FC<ErrorProps> = ({ message, handleClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-red-500">
          Something went wrong!
        </h2>
        <p className="text-gray-700 text-center mb-4">
          {message || "An unexpected error occurred."}
        </p>
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mx-auto block"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Error;
