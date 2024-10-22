import { useEffect, useState } from "react";
import "../style.css";
import { getCountries, twoFactorAuth } from "./requests";
import { Country, SelectedCountry } from "./types";
import CountrySelector from "./CountrySelector";
import PhoneInput from "./PhoneInput";
import Modal from "./Modal";
import Loading from "./Loading";
import SuccessModal from "./Success";
function Login() {
  const [countries, setCountries] = useState<Record<string, Country>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<SelectedCountry | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [placeholder, setPlaceHolder] = useState<string>("");
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await getCountries();
        setCountries(result);
        const defaultCountryCode = "US";
        if (result[defaultCountryCode]) {
          setSelectedCountry({
            code: defaultCountryCode,
            details: result[defaultCountryCode],
          });
          setPlaceHolder(
            "0".repeat(parseInt(result[defaultCountryCode].phone_length))
          );
          setloading(false);
        }
      } catch (error) {
        console.error("Failed to fetch countries", error);
        setError("Failed to fetch countries");
        setloading(false);
      }
    };

    fetchCountries();
    setloading(true);
  }, []);

  const openDropDown = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (code: string) => {
    if (countries[code]) {
      setSelectedCountry({
        code,
        details: countries[code],
      });
    }
    setPhoneNumber("");
    setOpen(false);
    setSearchQuery("");
  };

  const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPhoneNumber(formatPhoneNumber(value));
  };

  const filteredCountries = Object.entries(countries).filter(([, { name }]) =>
    name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setloading(true);
    if (!phoneNumber || !selectedCountry) {
      setError("Please select a country and enter a valid phone number.");
      return;
    }

    if (
      phoneNumber.replace(/\D/g, "").length.toString() !==
      selectedCountry.details.phone_length
    ) {
      setError(
        `Phone number should be of ${selectedCountry.details.phone_length} length`
      );
      return;
    }

    try {
      await twoFactorAuth(phoneNumber, selectedCountry.details.calling_code);
      setIsModalOpen(true);
      setPhoneNumber("");
      setloading(false);
    } catch (e) {
      setError("Error submitting phone number:");
      setloading(false);
      return;
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formattedNumber = "";
    if (selectedCountry?.details.phone_length) {
      if (digits.length > 0) {
        formattedNumber += "(" + digits.substring(0, 3);
      }
      if (digits.length >= 4) {
        formattedNumber += ") " + digits.substring(3, 6);
      }
      if (digits.length >= 7) {
        formattedNumber +=
          "-" +
          digits.substring(6, parseInt(selectedCountry?.details.phone_length));
      }
    }
    return formattedNumber;
  };
  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  };
  if (loading) {
    return <Loading message="Fetching data, please wait..." />;
  }
  return (
    <div className="h-screen w-screen flex bg-gradient-to-r from-blue-300 to-blue-800 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-4 p-6 justify-evenly rounded-xl bg-black/20 shadow-lg ring-1 ring-black/5"
      >
        <div className="flex gap-2">
          <CountrySelector
            openDropDown={openDropDown}
            selectedCountry={selectedCountry}
          />
          <PhoneInput
            selectedCountry={selectedCountry}
            phoneNumber={phoneNumber}
            handleNumber={handleNumber}
            placeHolder={placeholder}
          />
        </div>
        {phoneNumber.length != 0 &&
          selectedCountry?.details.phone_length &&
          phoneNumber.replace(/\D/g, "").length <
            parseInt(selectedCountry?.details.phone_length) && (
            <p className="text-red-500 text-sm mt-1">{`Phone number must be ${selectedCountry?.details.phone_length} digits long.`}</p>
          )}
        {open && (
          <div className="flex flex-col mt-2">
            <Modal
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredCountries={filteredCountries}
              handleChange={handleChange}
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {isModalOpen && (
        <SuccessModal
          message="Your submission was successful!"
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default Login;
