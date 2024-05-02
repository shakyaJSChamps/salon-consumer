import { Paper } from '@mui/material'
import styles from './topSalons.module.css'
import Image from 'next/image'
import salonImage from '@/assets/images/salonImage.svg';
import { salonData } from '@/components/data/data'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function TopSalons() {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
        Trending Salons
        </div>
        <div className={styles.linkDiv}>
          <Link href={'#'} className={styles.link} >View all salons
            <ArrowForwardIcon className={styles.arrow} />
          </Link>
        </div>

      </div>

      <div className={styles.content}>
        {salonData.map((item, index) => (
          <Paper elevation={3} key={index} className={styles.paper}>
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
        ))}
      </div>

    </div>
  )
}

export default TopSalons
