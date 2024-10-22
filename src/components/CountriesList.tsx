import React from "react";
interface Country {
  name: string;
  calling_code: string;
}

interface CountriesListProps {
  filteredCountries: [string, Country][];
  handleChange: (code: string) => void;
}

const CountriesList: React.FC<CountriesListProps> = ({
  filteredCountries,
  handleChange,
}) => {
  console.log(filteredCountries.length);
  return (
    <ul className="max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg">
      {filteredCountries.map(([code, { name, calling_code }]) => (
        <li
          key={code}
          className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
          onClick={() => handleChange(code)}
        >
          <img
            src={`flags/${code.toLowerCase()}.svg`}
            alt={name}
            className="mr-2 w-5 h-5"
          />
          {name} ({calling_code})
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
