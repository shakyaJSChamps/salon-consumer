"use client"
import { useState } from 'react';
import styles from './locationSearch.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function LocationSearch() {
    // const [isActive, setIsActive] = useState(false);
    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownbtn}>
                location
                <span className={styles.arrowbtn}>
                    <KeyboardArrowDownIcon />
                </span>
            </div>
            {/* {isActive && (<div className={styles.dropdownContent}>
                <div className={styles.dropdownItem}>
                    <h3>Delhi</h3>
                </div>
                <div className={styles.dropdownItem}>
                    <h3>Delhi</h3>
                </div>
                <div className={styles.dropdownItem}>
                    <h3>Delhi</h3>
                </div>
            </div>)} */}
        </div>




    )
}

export default LocationSearch
