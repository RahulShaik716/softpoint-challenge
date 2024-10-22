import React from "react";

interface SuccessModalProps {
  message: string; // Message to display
  handleClose: () => void; // Function to close the modal
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  message,
  handleClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-green-500">Success!</h2>
        <p className="text-gray-700 text-center mb-4">{message}</p>
        <button
          onClick={handleClose}
          className="bg-green-500 text-white py-2 px-4 rounded-md mx-auto block"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
