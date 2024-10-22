import React from "react";

// Define the types for the selected country
interface Country {
  phone_length: string;
}

interface SelectedCountry {
  code: string;
  details: Country;
}

interface PhoneInputProps {
  selectedCountry?: SelectedCountry | null;
  phoneNumber: string;
  handleNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  selectedCountry,
  phoneNumber,
  handleNumber,
  placeHolder,
}) => {
  return (
    <input
      type="tel"
      placeholder={placeHolder}
      className=" p-2 form-input border border-gray-300 rounded-md"
      onChange={handleNumber}
      value={phoneNumber}
    />
  );
};

export default PhoneInput;
