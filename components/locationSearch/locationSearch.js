"use client"
import { useState } from 'react';
import styles from './locationSearch.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function LocationSearch() {
    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState("Delhi");
    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownbtn}
                onClick={() => {
                    setIsActive(!isActive);
                }}>
                {selected}
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
