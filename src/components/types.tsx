export interface Country {
  id: string;
  name: string;
  calling_code: string;
  phone_length: string;
}

export interface SelectedCountry {
  code: string;
  details: Country;
}
