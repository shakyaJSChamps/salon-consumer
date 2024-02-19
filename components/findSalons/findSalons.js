import styles from './findSalons.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import StarIcon from '@mui/icons-material/Star';
import { Paper } from '@mui/material';
import Image from 'next/image';
import salonImage from '@/assets/images/salonImage.svg'

function FindSalons() {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.headingIcons}>
                    <LocationOnIcon className={styles.icon} />
                    <CalendarViewMonthIcon className={styles.icon} />
                </div>
                <div className={styles.text}>
                    <h4>Find your </h4>
                    <span>Salons</span>
                </div>
            </div>

            <div className={styles.salons}>
                <Paper elevation={2} className={styles.paper}>
                    <div className={styles.image}>
                        <Image src={salonImage} alt='saloonImage'
                            className={styles.salonimg} />
                    </div>
                    <div className={styles.salonDetail}>
                        <h3>Big Boss</h3>
                        <div className={styles.location}>
                            <LocationOnIcon className={styles.locIcon} />
                            <p> Karol Bagh</p>
                        </div>
                        <div className={styles.salonRating}>
                            <div className={styles.rating}>
                                <StarIcon className={styles.locIcon} />
                                4.0

                            </div>
                        </div>
                        <div className={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        </div>
                        <button className={styles.btn}>
                            View Details
                        </button>
                    </div>

                </Paper>
                <Paper elevation={2} className={styles.paper}>
                    <div className={styles.image}>
                        <Image src={salonImage} alt='saloonImage'
                            className={styles.salonimg} />
                    </div>
                    <div className={styles.salonDetail}>
                        <h3>Big Boss</h3>
                        <div className={styles.location}>
                            <LocationOnIcon className={styles.locIcon} />
                            <p> Karol Bagh</p>
                        </div>
                        <div className={styles.salonRating}>
                            <div className={styles.rating}>
                                <StarIcon className={styles.locIcon} />
                                4.0

                            </div>
                        </div>
                        <div className={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        </div>
                        <button className={styles.btn}>
                            View Details
                        </button>
                    </div>

                </Paper>

            </div>

        </div>
    )
}

export default FindSalons
