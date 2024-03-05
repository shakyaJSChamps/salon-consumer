"use client"
import styles from './salonid.module.css'
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarsIcon from '@mui/icons-material/Stars';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

import SalonService from '@/components/salonService/salonService';
import SalonGallery from '@/components/salonGallery/salonGallery';
import AboutSalon from '@/components/aboutSalon/aboutSalon';

function SalonDetail() {
    // State to keep track of active button
    const [activeButton, setActiveButton] = useState('about');

    // Function to handle button click and update active button
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    return (
        <div className={styles.container}>
            <div className={styles.salonSlider}>
                <div className={styles.sliderTitle}>
                    <h3>Blue Heaven</h3>
                    <p>LOrem Ipsum sit Dot Amet</p>
                </div>

            </div>
            <div className={styles.SalonDetails}>
                <div className={styles.aboutSalon}>
                    <div className={styles.salonName}>
                        <h2>Blue Heaven</h2>
                        <div className={styles.wishlistIcon}>
                            <ShareIcon />
                            <FavoriteBorderIcon />
                        </div>
                    </div>
                    <div className={styles.salonRating}>
                        <StarsIcon className={styles.icon} />
                        <p>4.2 (1k+ Ratings)</p>
                    </div>
                    <div className={styles.salonLocation}>
                        <LocationOnIcon className={styles.icon} />
                        <p>San Salvador Ohio</p>
                    </div>

                </div>
                <div className={styles.salonTiming}>
                    <h4>Working hours</h4>
                    <div className={styles.timing}>
                        <h3>Monday-Friday<span>10:00AM - 05:00PM</span></h3>
                        <h3>Saturday-Sunday<span>12:00PM - 03:00PM</span></h3>

                    </div>
                </div>
            </div>
            <div className={styles.button}>
                <button onClick={() => handleButtonClick('about')} className={activeButton === 'about' ? styles.active : ''}>About</button>
                <button onClick={() => handleButtonClick('services')} className={activeButton === 'services' ? styles.active : ''}>Services</button>
                <button onClick={() => handleButtonClick('gallery')} className={activeButton === 'gallery' ? styles.active : ''}>Gallery</button>
            </div>
            {/* Content */}
            {activeButton === 'about' && (
                <div className={styles.aboutContent}>
                    <AboutSalon />
                </div>

            )}
            {activeButton === 'services' && (
                <div className={styles.servicesContent}>
                    <SalonService />
                </div>
            )}
            {activeButton === 'gallery' && (
                <div className={styles.galleryContent}>
                    <SalonGallery />
                </div>
            )}
        </div>
    )
}

export default SalonDetail
