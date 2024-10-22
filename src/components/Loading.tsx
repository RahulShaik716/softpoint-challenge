import React from "react";

interface LoaderProps {
  message?: string; // Optional message to display while loading
}

const Loading: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader" role="status">
        <span className="sr-only">{message}</span>
      </div>
      <style>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 60px; /* Size of the loader */
          height: 60px; /* Size of the loader */
          animation: spin 1s linear infinite; /* Animation */
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
