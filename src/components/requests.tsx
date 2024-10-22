import { Country } from "./types";

const baseURL = "https://sandbox-api.softpoint.io/interface/v1";
const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbmRib3gtYXBpLnNvZnRwb2ludC5pby9pbnRlcmZhY2UvdjEvYWNjZXNzX3Rva2VuIiwiaWF0IjoxNzI5NTUxMTU4LCJleHAiOjE3Mjk1NTU2NTgsIm5iZiI6MTcyOTU1MTE0OCwianRpIjoid21CeE8wNFpHcVFJSUtMQiIsInN1YiI6OSwicHJ2IjoiZTZhMjViY2U3ZDEzMWMxMzJmNGFkNTY5MmYyNzM1YmU2OGE5NDIxMyIsInR5cGUiOiJpbnRlcmZhY2UiLCJjb3JwX2lkIjoxMCwiY29ycF9jYXRlZ29yeV9pZCI6bnVsbCwibG9jYXRpb25faWQiOm51bGx9.saZ-ftUykXnqZ9YBN-3p3qgfqvCtkuGZ-RHUimnmfIc";
export const getCountries = async (): Promise<Record<string, Country>> => {
  const res = await fetch(`${baseURL}/challenges/countries`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data: Record<string, Country> = await res.json();
  console.log(data);
  return data;
};
export const twoFactorAuth = async (
  phoneNumber: string,
  country_id: string
) => {
  const params = new URLSearchParams();
  params.append("phone_number", phoneNumber.replace(/\D/g, ""));
  params.append("country_id", country_id);
  const res = await fetch(`${baseURL}/challenges/two_factor_auth`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: params,
  });

  if (!res.ok) {
    throw new Error("Failed to Submit the Phone Number");
  }

  const data = await res.json();
  console.log(data);
  return data;
};
