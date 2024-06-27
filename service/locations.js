import axios from "axios";
import Notify from "@/utils/notify";
export async function GetUserLocation() {
  if (navigator.geolocation) {
    try {
      const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`
      );
      const data = response.data;

     // const { city, state, country } = data.address;
    // const city = data.address.city || data.address.town || data.address.village;

     const city = data.address.city;
     const { state, country } = data.address;

      return { city, state, country }; // Return the extracted address fields
    } catch (error) {
      Notify.error(error.message);
      throw error;
    }
  } else {
    return null;
  }
}

export async function HandleSelectLocation(location, setDeniedUserLocation) {
  if (location !== "Select Location") {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=jsonv2`
      );
      const data = response?.data;
      if (data && data.length > 0) {
        const { city, state, country } = data[0].address;
        setDeniedUserLocation({ city, state, country }); // Store the extracted address fields
        return { city, state, country }; // Return the extracted address fields
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  return null;
}
