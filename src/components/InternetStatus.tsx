import React, { useEffect, useState } from "react";

interface InternetStatusProps {
  children: React.ReactNode;
}

const InternetStatus: React.FC<InternetStatusProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setError(""); // Clear error when online
      console.log(error);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setError("Internet connection is unavailable."); // Set error when offline
    };

    // Add event listeners for online and offline status
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {/* Show the internet status message at the top of the app */}
      {!isOnline && (
        <div className="bg-red-500 text-white text-center p-2 fixed top-0 left-0 right-0 z-50">
          Internet Unavailable. Please switch it on to use the app.
        </div>
      )}
      {/* Main content of the app */}
      <div className={!isOnline ? "mt-8" : ""}>{children}</div>
    </div>
  );
};

export default InternetStatus;
