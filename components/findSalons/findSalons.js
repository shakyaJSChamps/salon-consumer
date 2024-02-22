import styles from './findSalons.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import salonImage from '@/assets/images/salonImage.svg';
import { salonData } from '@/components/data/data'
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
                    <span>Salon</span>
                </div>
            </div>

            <div className={styles.salons}>
                <Grid container spacing={2}>
                    {salonData.map((item, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Paper elevation={3} className={styles.paper}>
                                <div className={styles.image}>
                                    <Image src={salonImage} alt='salonImage' />
                                </div>
                                <div className={styles.details}>

                                    <h2>{item.name}</h2>
                                    <div className={styles.location}>
                                        <LocationOnIcon className={styles.locIcon} />
                                        {item.location}
                                    </div>
                                    <div className={styles.salonType}>
                                        <div className={styles.rating}>
                                            <StarIcon className={styles.locIcon} />
                                            {item.rating}
                                        </div>
                                        <div className={styles.type}>
                                            {item.type}
                                        </div>
                                    </div>
                                    <div className={styles.desc}>
                                        <p>{item.description}</p>
                                    </div>
                                    <button className={styles.btn}>
                                        View Details
                                    </button>

                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

            </div>
            <div className={styles.linkDiv}>
                <Link href={'/salonlist'} className={styles.link} >View All Salons
                    <ArrowForwardIcon className={styles.arrow} />
                </Link>
            </div>



        </div>
    )
}

export default FindSalons
