import { useEffect, useState } from "react";
import styles from "./locationSearch.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "@/app/Redux/Authslice";
import { GetUserLocation, HandleSelectLocation } from "@/service/locations";
import { getAddress } from "@/api/account.api";

function LocationSearch() {
  const [permissionDenied, setPermissionDenied] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const dispatch = useDispatch();
  const city = useSelector((state) => state.auth.city);
  const state = useSelector((state) => state.auth.state);
  const country = useSelector((state) => state.auth.country);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await GetUserLocation();
        dispatch(setUserLocation(location)); // Dispatch the address fields
        setPermissionDenied(false);
      } catch (error) {
        setPermissionDenied(true);
      }
    };

    fetchLocation();
  }, [dispatch]);

  const handleSelectLocation = async (selectedLocation) => {
    if (selectedLocation === "Current Location") {
      try {
        const location = await GetUserLocation();
        dispatch(setUserLocation(location)); // Dispatch the address fields
        setPermissionDenied(false);
      } catch (error) {
        console.error("Failed to fetch user location:", error);
        setPermissionDenied(true);
      }
    } else {
      const locationData = await HandleSelectLocation(selectedLocation);
      if (locationData) {
        dispatch(setUserLocation(locationData)); // Dispatch the address fields
      }
    }
  };

  const fetchAddress = async () => {
    try {
      const res = await getAddress();
      setAddresses(res?.data?.data);
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className={styles.dropdown}>
      {!permissionDenied ? (
        <select
          className={styles.dropdownbtn}
          value={`${city}, ${state}` || ""}
          onChange={(e) => handleSelectLocation(e.target.value)}
        >
          <option value={`${city}, ${state}`}>{`${city}, ${state}`}</option>
          {addresses.map((address) => (
            <option
              key={address.id}
              value={`${address.city}, ${address.state}`}
            >
              {`${address.city}, ${address.state}`}
            </option>
          ))}
        </select>
      ) : (
        <select
          className={styles.dropdownbtn}
          value={"Select Location"}
          onChange={(e) => handleSelectLocation(e.target.value)}
        >
          <option value="Select Location">Select Location</option>
          <option value="Current Location">Current Location</option>
          {addresses.map((address) => (
            <option
              key={address.id}
              value={`${address.city}, ${address.state}`}
            >
              {`${address.city}, ${address.state}`}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default LocationSearch;
