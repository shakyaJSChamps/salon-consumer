'use client'
import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import styles from './topSalons.module.css';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { homePage } from '@/api/account.api';
import Notify from '@/utils/notify';
import { Skeleton } from '@mui/material';

function TopSalons() {
  const [data, setData] = useState(null); // Initialize data as null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homePage();
        const responseData = res.data;
        setData(responseData);
      } catch (error) {
        Notify.error(error.message);
      }
    };

    fetchData();
  }, []);

  // Skeletons for each salon item
  const skeletons = Array.from({ length: 5 }).map((_, index) => (
    <Paper key={index} elevation={3} className={styles.paper}>
      <Skeleton variant="rectangular" width="100%" height={180} />
      <div className={styles.details}>
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={200} />
      </div>
    </Paper>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          Trending Salons
        </div>
        <div className={styles.linkDiv}>
          <Link href='/salons' className={styles.link}>View all salons
            <ArrowForwardIcon className={styles.arrow} />
          </Link>
        </div>
      </div>

      <div className={styles.content}>
        {data?.data?.mostPopularSalons ? (
          data.data.mostPopularSalons.map((salon, index) => (
            <Paper elevation={3} key={index} className={styles.paper}>
              <div className={styles.image}>
                <Image src={salon.mainGateImageUrl} alt='salonImage' height={155} width={500} />
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
          ))
        ) : (
          skeletons 
        )}
      </div>
    </div>
  );
}

export default TopSalons;
