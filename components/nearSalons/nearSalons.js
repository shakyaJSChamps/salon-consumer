import styles from './nearSalons.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Session from '@/service/session';

function NearSalons({ data }) {

  // Ensure that data and nearBySalons are available
//   if (!data || !data.nearBySalons) {
//     return null; // or display a loading indicator
//   }

 // const { nearBySalons } = data;
 const handleViewAllClick = () => {
  Session.remove('filteredSalon');
  Session.remove('salonService');
  Session.remove('selectedBannerSalons');

};

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.headingIcons}>
          <LocationOnIcon className={styles.icon} />
        </div>
        <div className={styles.text}>
          <h4>Find your </h4>
          <span>Salon</span>
        </div>
      </div>

      <div className={styles.salons}>
        <Grid container spacing={2}>
          {data?.data?.nearBySalons?.map((salon, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} className={styles.paper}>
                <div className={styles.image}>
                  {/* Assuming salon has an imageUrl property */}
                  <Image src={salon.mainGateImageUrl} alt='Salon Image' width={270} height={200} className={styles.image}/>
                </div>
                <div className={styles.details}>
                  <div className={styles.nameContainer}>
                    <p className={styles.user_name}>{salon.name}</p>
                    <div className={styles.wishlist}>
                      <FavoriteBorderIcon className={styles.wishlistIcon} />
                      <p>wishlist</p>
                    </div>
                  </div>
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
                  {/* Add more salon details as needed */}
                  <button className={styles.btn}>
                    <Link href={`/salonlist/${salon.id}`}>
                      View Details
                    </Link>
                  </button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className={styles.linkDiv}>
        {/* <Link href={'/salonlist'} className={styles.link} >View all salons
          <ArrowForwardIcon className={styles.arrow} />
        </Link> */}
   <Link href={'/salonlist'} onClick={handleViewAllClick} className={styles.link}>
          View all salons
          <ArrowForwardIcon className={styles.arrow} />
        </Link>
      </div>
    </div>
  );
}

export default NearSalons;
