import axios from "axios";

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
      console.log("res loc", response);

      const { city, state, country } = data.address;

      return { city, state, country }; // Return the extracted address fields
    } catch (error) {
      console.log("Failed to fetch user location:", error);
      throw error;
    }
  } else {
    console.log("Browser does not support geolocation");
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
        console.log("location handle select", data[0]);
        return { city, state, country }; // Return the extracted address fields
      } else {
        console.log("Failed to fetch location details: No data found");
        return null;
      }
    } catch (error) {
      console.log("Failed to fetch location details:", error);
      return null;
    }
  }
  return null;
}
