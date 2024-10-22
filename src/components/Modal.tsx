import React from "react";
import CountriesList from "./CountriesList";

// Define types for props
interface Country {
  name: string;
  calling_code: string;
}

interface ModalProps {
  filteredCountries: [string, Country][];
  handleChange: (code: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  filteredCountries,
  handleChange,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col gap-2 absolute right-4 left-4 bg-gray-200 border border-gray-300 rounded-lg z-1 max-w-full">
      <input
        type="text"
        placeholder="Search country"
        className="w-full p-2 border-b border-gray-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <CountriesList
        filteredCountries={filteredCountries}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Modal;
