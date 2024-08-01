import axios from "axios";
import Cookies from 'js-cookie';
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
      console.log("location data", data);
      // const { city, state, country } = data.address;
      const city = data.address.city || data.address.town || data.address.village;

     // const city = data.address.city;
      const latitude = data.lat;
      const longitude = data.lon;
      console.log("city", city);
      console.log("latitude", latitude);
      console.log("longitude", longitude);
      const lat = Cookies.get('latitude');
      console.log("aradhya", lat);

      const { state, country } = data.address;
     
      Cookies.set('city', city || '', { expires: 7 });
      Cookies.set('latitude', latitude || '', { expires: 7 });
      Cookies.set('longitude', longitude || '', { expires: 7 });

      return { city, state, country, lat: latitude, lon: longitude }; // Return the extracted address fields
    } catch (error) {
      // Notify.error(error.message);
      Cookies.remove('city');
      Cookies.remove('latitude');
      Cookies.remove('longitude');


      throw error;
    }
  } else {
    Cookies.remove('city');
    Cookies.remove('latitude');
    Cookies.remove('longitude');


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
        // Cookies.set('city', city, { expires: 7 });
        // Cookies.set('latitude', latitude, { expires: 7 });
        // Cookies.set('longitude', longitude, { expires: 7 });
  
        setDeniedUserLocation({ city, state, country }); // Store the extracted address fields
        return { city, state, country, lat: latitude, lon: longitude }; // Return the extracted address fields
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  return null;
}
