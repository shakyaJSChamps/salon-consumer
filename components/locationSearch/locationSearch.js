"use client"

import { useEffect, useState } from 'react';
import styles from './locationSearch.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import { userLocations } from '@/app/Redux/Authslice';
import axios from 'axios';
import { GetUserLocation, HandleSelectLocation } from '@/service/locations';


function LocationSearch() {

    const [permissionDenied, setPermissionDenied] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [deniedUserLocation, setDeniedUserLocation] = useState("Select Location");
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const location = await GetUserLocation();
                console.log("location import permissions", location)
                setUserLocation(location);
                setPermissionDenied(false);
                dispatch(userLocations(location));
            } catch (error) {
                setPermissionDenied(true);
            }
        };

        fetchLocation();
    }, [dispatch]);


    const handleSelectLocation = async (location) => {
        if (location === "Current Location") {
            try {
                // Prompt the browser to ask for permission
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                console.log("position", position)
                const location = await GetUserLocation(); // Call GetUserLocation without passing latitude and longitude
                setUserLocation(location);
                setPermissionDenied(false);
                dispatch(userLocations(location));
            } catch (error) {
                console.error('Failed to fetch user location:==>', error);
                setPermissionDenied(true);
            }
        } else {
            const locationParts = await HandleSelectLocation(location, setDeniedUserLocation);
            if (locationParts) {
                dispatch(userLocations(locationParts));
            }
        }
    };


    return (
        <div className={styles.dropdown}>
            {!permissionDenied ? (
                <select className={styles.dropdownbtn} defaultValue={userLocation}
                    onChange={(e) => handleSelectLocation(e.target.value)}>
                    <option value={userLocation}>{userLocation}</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurugram">Gurugram</option>
                </select>
            ) : (
                <select
                    className={styles.dropdownbtn}
                    defaultValue={deniedUserLocation}
                    onChange={(e) => handleSelectLocation(e.target.value)}
                >
                    <option value="Select Location">Select Location</option>
                    <option value="Current Location">Current Location</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurugram">Gurugram</option>
                </select>


            )}
        </div>

    )
}

export default LocationSearch