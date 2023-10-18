import { Location } from "../../types/location";

const API_KEY = import.meta.env.VITE_GOOGLEMAP_API_KEY;

export const fetchAddress = async ({ lat, lng }: Location) => {
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&latlng=${lat},${lng}`);
  const json = await res.json();

  try {
    return json.results[0]["formatted_address"].split(",").slice(0, 2).join(",");
  } catch {
    return "Location Unknown";
  }
};
