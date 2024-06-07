import { Paper } from '@mui/material';
import styles from './topSalons.module.css';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function TopSalons({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          Trending Salons
        </div>
        {/* <div className={styles.linkDiv}>
          <Link href={'#'} className={styles.link}>View all salons
            <ArrowForwardIcon className={styles.arrow} />
          </Link>
        </div> */}
      </div>

      <div className={styles.content}>
        {data?.data?.mostPopularSalons.map((salon, index) => (
          <Paper elevation={3} key={index} className={styles.paper}>
            <div className={styles.image}>
              <img src={salon.mainGateImageUrl} alt='salonImage'  />
            </div>
            <div className={styles.details}>
              <h3>{salon.name}</h3>
              <div className={styles.location}>
                <LocationOnIcon className={styles.locIcon} />
                {`${salon.address}, ${salon.city}, ${salon.state}`}
              </div>
              <div className={styles.salonType}>
                <div className={styles.rating}>
                  <StarIcon className={styles.locIcon} />
                  {salon.rating}
                </div>
                <div className={styles.type}>
                  {salon.serviceType}
                </div>
              </div>
              <div className={styles.desc}>
                <p>{salon.description}</p>
              </div>
              <button className={styles.btn}>
                <Link href={`/salonlist/${salon.id}`}>
                  View Details
                </Link>
              </button>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default TopSalons;
