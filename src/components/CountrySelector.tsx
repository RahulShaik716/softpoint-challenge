import React from "react";

interface Country {
  name: string;
  calling_code: string;
}

interface SelectedCountry {
  code: string;
  details: Country;
}

interface CountrySelectorProps {
  openDropDown: () => void;
  selectedCountry?: SelectedCountry | null;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  openDropDown,
  selectedCountry,
}) => {
  return (
    <div
      onClick={openDropDown}
      className="cursor-pointer bg-gray-200 p-2 rounded  justify-center"
    >
      {selectedCountry && (
        <div className="flex items-center justify-start">
          <img
            src={`flags/${selectedCountry.code.toLowerCase()}.svg`}
            alt={selectedCountry.details.name}
            className="w-5 h-5 object-contain mr-2"
          />
          <div> ({selectedCountry.details.calling_code})</div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
