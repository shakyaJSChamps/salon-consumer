
import axios from 'axios';

export async function GetUserLocation() {
    if (navigator.geolocation) {
        try {
            const { coords } = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`);
            const data = response.data;
            const locationParts = data.display_name.split(',').slice(0, 2);
            console.log("location parts", locationParts)
            return locationParts.join(',');
        } catch (error) {
            console.log('Failed to fetch user location:', error);
            throw error;
        }
    } else {
        console.log('Browser does not support geolocation');
        return null;
    }
}

export async function HandleSelectLocation(location, setDeniedUserLocation) {
    if (location !== "Select Location") {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=jsonv2`);
            const data = response?.data;
            if (data && data.length > 0) {
                const locationParts = data[0].display_name.split(',').slice(0, 2);
                setDeniedUserLocation(locationParts.join(','));
                console.log("locatin  handle select", locationParts)
                return locationParts;
            } else {
                console.log('Failed to fetch location details: No data found');
                return null;
            }
        } catch (error) {
            console.log('Failed to fetch location details:', error);
            return null;
        }
    }
    return null;
}
