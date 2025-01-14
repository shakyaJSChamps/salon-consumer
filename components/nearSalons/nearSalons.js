"use client";
import React from "react";
import styles from "./nearSalons.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Session from "@/service/session";
import { Skeleton } from "@mui/material";

function NearSalons({ data }) {
  // Initialize an array for skeletons
  const skeletons = [1, 2, 3, 4];

  const handleViewAllClick = () => {
    Session.remove("filteredSalon");
    Session.remove("salonService");
    Session.remove("selectedBannerSalons");
  };

  if (!data || !data?.nearBySalons) {
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
            {skeletons.map((_, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={3} className={styles.paper}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <div className={styles.details}>
                    <div className={styles.nameContainer}>
                      <h2>
                        <Skeleton variant="text" width={100} />
                      </h2>
                      <div className={styles.wishlist}>
                        <p>
                          <Skeleton variant="text" width={80} />
                        </p>
                      </div>
                    </div>
                    <div className={styles.location}>
                      <Skeleton variant="text" width={200} />
                    </div>
                    <div className={styles.salonType}>
                      <div className={styles.rating}>
                        <Skeleton variant="text" width={50} />
                      </div>
                      <div className={styles.type}>
                        <Skeleton variant="text" width={100} />
                      </div>
                    </div>
                    <div className={styles.skeletonsBtn}>
                      <Skeleton variant="text" width={100} />
                    </div>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>

        <div className={styles.linkDiv}>
          <Link
            href={"/salonlist"}
            onClick={handleViewAllClick}
            className={styles.link}
          >
            View all salons
            <ArrowForwardIcon className={styles.arrow} />
          </Link>
        </div>
      </div>
    );
  }

  // Once data is available, render the actual content
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
      {data.nearBySalons.length > 0 ? (
        <div className={styles.salons}>
          <Grid container spacing={2}>
            {data?.nearBySalons?.map((salon, index) => (
              <Grid item sm={6} xs={12} md={6} key={index}>
                <Paper elevation={3} className={styles.paper}>
                  <div className={styles.image}>
                    <Image
                      src={salon.mainGateImageUrl}
                      alt="Salon Image"
                      width={270}
                      height={200}
                      className={styles.image}
                    />
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
                      {`${salon.address}, ${salon.city}, ${salon.state}`.slice(
                        0,
                        40
                      )}
                      ...
                    </div>
                    <div className={styles.salonType}>
                      <div className={styles.rating}>
                        <StarIcon className={styles.locIcon} />
                        {salon.rating}
                      </div>
                      <div className={styles.type}>{salon.serviceType}</div>
                    </div>
                    <button className={styles.btn}>
                      <Link href={`/salonlist/${salon.id}`}>View Details</Link>
                    </button>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
          </div>
        ) : (
            <div className={styles.noSalons}>
              <p>No near salons available for this location.</p>
            </div>
          )}
        
      <div className={styles.linkDiv}>
      {data?.nearBySalons && data.nearBySalons.length > 0 && (
         <Link
          href={"/salonlist"}
          onClick={handleViewAllClick}
          className={styles.link}
        >
          View all salons
          <ArrowForwardIcon className={styles.arrow} />
        </Link>
      )}
      </div>
      
    </div>
  );
}

export default NearSalons;
