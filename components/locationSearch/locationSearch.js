"use client"
import { useEffect, useState } from 'react';
import styles from './locationSearch.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import { userLocations } from '@/app/Redux/Authslice';
import axios from 'axios';

function LocationSearch() {
    const [isActive, setIsActive] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        // Geolocation API is used to get the geographical position of a user
        if (navigator.geolocation) {
            // Retrieve the user's position
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        // Fetch the location details using the Nominatim API
                        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
                        const data = await response.data;
                        // Set the location details in the state
                        console.log("data from users", data)
                        console.log("latitude", data.lat)
                        console.log("longitude", data.lon)
                        setUserLocation(`${data.address.city}, ${data.address.country}`);
                        dispatch(userLocations(data));
                    } catch (error) {
                        console.log('Failed to fetch location details');
                    }
                },
                (error) => {
                    // Handle geolocation errors
                    console.log(error.message);
                }
            );
        } else {
            // Browser doesn't support geolocation
            console.log('Browser does not support geolocation');
        }
    }, []);
    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownbtn}
                onClick={() => {
                    setIsActive(!isActive);
                }}>
                {userLocation ? userLocation : "Fetching location..."}
                <span className={styles.arrowbtn}>
                    {isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </span>
            </div>
            <div
                className={styles.dropdownContent}
                style={{ display: isActive ? "block" : "none" }}
            >
                <div
                    onClick={(e) => {
                        setIsSelected(e.target.textContent);
                        setIsActive(!isActive);
                    }}
                    className={styles.item}
                >
                    One
                </div>
                <div
                    className={styles.item}
                    onClick={(e) => {
                        setIsSelected(e.target.textContent);
                        setIsActive(!isActive);
                    }}
                >
                    Two
                </div>
                <div
                    className={styles.item}
                    onClick={(e) => {
                        setIsSelected(e.target.textContent);
                        setIsActive(!isActive);
                    }}
                >
                    Three
                </div>
            </div>
        </div>




    )
}

export default LocationSearch