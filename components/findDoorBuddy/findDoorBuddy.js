import styles from './findDoorBuddy.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import doorbuddy from '@/assets/images/doorbuddy.svg'
import Common from '../common/common';
import { doorbuddyData, salonData } from '../data/data';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import buddyImage from '@/assets/images/buddyImage.svg';

function FindDoorBuddy() {
  return (
    <div className={styles.container}>
       <div className={styles.heading}>
                <div className={styles.headingIcons}>
                     <Image src={doorbuddy} alt='doorbuddy' className={styles.icon}/>
                </div>
                <div className={styles.text}>
                    <h4>Find your </h4>
                    <span>Door Buddy</span>
                </div>
               
            </div>
            <div className={styles.salons}>
                <Grid container spacing={2}>
                    {doorbuddyData.map((item, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Paper elevation={3} className={styles.paper}>
                                <div className={styles.image}>
                                    <Image src={buddyImage} alt='salonImage' />
                                </div>
                                <div className={styles.details}>

                                    <h2>{item.name}</h2>
                                    <p>{item.specialist}</p>
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
                                        Set Appointment
                                    </button>

                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
      
    </div>
  )
}

export default FindDoorBuddy
