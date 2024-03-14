"use client"
import { useEffect, useState } from 'react';
import styles from './locationSearch.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function LocationSearch() {
    const [isActive, setIsActive] = useState(false);
    const [userLocation, setUserLocation] = useState(null);


    useEffect(() => {
        // Geolocation API is used to get the geographical position of a user
        if (navigator.geolocation) {
            // Retrieve the user's position
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        // Fetch the location details using the Nominatim API
                        const response = await fetch(`https:nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
                        const data = await response.json();
                        console.log("data from users", data)
                        setUserLocation(`${data.address.city}, ${data.address.country}`);
                    } catch (error) {
                        setError('Failed to fetch location details');
                    }
                },
                (error) => {
                    // Handle geolocation errors
                    setError(error.message);
                }
            );
        } else {
            // Browser doesn't support geolocation
            setError('Browser does not support geolocation');
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