"use client"
import Image from 'next/image'
import styles from './doorbuddyid.module.css'
import doorbuddy from '@/assets/images/specialist.svg'
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarsIcon from '@mui/icons-material/Stars';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

function DoorbuddyDetailPage() {
    const [activeButton, setActiveButton] = useState('about');

    // Function to handle button click and update active button
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
  return (
    <div className={styles.container}>
       <div className={styles.details}>
        <div className={styles.image}>
            <Image src={doorbuddy} alt='doorbuddyimage'/>
        </div>
        <div className={styles.SalonDetails}>
                <div className={styles.aboutSalon}>
                    <div className={styles.salonName}>
                        <h2>Blue Heaven</h2>
                        <div className={styles.wishlistIcon}>
                            <ShareIcon className={styles.wIcon} />
                            <FavoriteBorderIcon className={styles.wIcon}/>
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
            
       </div>
       <div className={styles.button}>
                <button onClick={() => handleButtonClick('about')} className={activeButton === 'about' ? styles.active : ''}>About</button>
                <button onClick={() => handleButtonClick('services')} className={activeButton === 'services' ? styles.active : ''}>Services</button>
            </div>
            {/* Content */}
            {activeButton === 'about' && (
                <div className={styles.aboutContent}>
                    {/* <AboutSalon /> */}
                    About
                </div>

            )}
            {activeButton === 'services' && (
                <div className={styles.servicesContent}>
                    {/* <SalonService /> */}
                    Service
                </div>
            )}
      
    </div>
  )
}

export default DoorbuddyDetailPage
