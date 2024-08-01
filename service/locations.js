import axios from "axios";
import Cookies from "js-cookie";
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
      console.log("location data", data);
      // const { city, state, country } = data.address;
      const city =
        data.address.city || data.address.town || data.address.village;

      // const city = data.address.city;
      const latitude = data.lat;
      const longitude = data.lon;
      const lat = Cookies.get("latitude");

      const { state, country } = data.address;

      Cookies.set("city", city || "", { expires: 7 });
      Cookies.set("latitude", latitude || "", { expires: 7 });
      Cookies.set("longitude", longitude || "", { expires: 7 });

      return { city, state, country, lat: latitude, lon: longitude };
    } catch (error) {
      // Notify.error(error.message);
      Cookies.remove("city");
      Cookies.remove("latitude");
      Cookies.remove("longitude");

      throw error;
    }
  } else {
    Cookies.remove("city");
    Cookies.remove("latitude");
    Cookies.remove("longitude");

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
        const latitude = data[0].lat || "";
        const longitude = data[0].lon || "";
        setDeniedUserLocation({ city, state, country });
        return { city, state, country, lat: latitude, lon: longitude };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  return null;
}
