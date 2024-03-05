import styles from './common.module.css'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import salonImage from '@/assets/images/salonImage.svg';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Common(props) {
    const {data}=props

  return (
    <div className={styles.container}>
        <div className={styles.salons}>
                <Grid container spacing={2}>
                    {data.map((item, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Paper className={styles.paper}>
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

      
    </div>
  )
}

export default Common
