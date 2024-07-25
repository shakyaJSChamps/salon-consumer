"use client";
import Link from "next/link";
import styles from "./wishlist.module.css";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CiHeart } from "react-icons/ci";
import Images from "@/app/image";
import Notify from "@/utils/notify";
import { Skeleton } from "@mui/material";
import { favoriteSalon } from "@/api/account.api";
import { fetchingData } from "./wishListServer";
const WishLists = ({ favouriteSalons }) => {
  const skeleton = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className={styles.salonDetail}>
      <div className={styles.salon}>
        <Skeleton variant="rectangular" width={270} height={220} />
        <div className={styles.mainSkeleton}>
          <div>
            <Skeleton variant="text" width={100} height={50} />
          </div>
          <div className={styles.contentSkeleton}>
            <Skeleton variant="text" width={100} height={30} />
            <Skeleton variant="text" width={100} height={30} />
          </div>
          <div className={styles.contentSkeleton}>
            <Skeleton variant="text" width={100} height={30} />
            <Skeleton variant="text" width={100} height={30} />
          </div>

          <div className={styles.contentSkeleton}>
            <Skeleton variant="text" width={100} height={30} />
          </div>
          <div className={styles.skeletonBtn}>
            <Skeleton variant="text" width={240} height={60} />
          </div>
        </div>
      </div>
    </div>
  ));

  const handleSelectFavorites = async (salonId, isFavorite) => {
    try {
      await favoriteSalon(salonId, isFavorite);
      await fetchingData();
    } catch (error) {
      Notify.error(error.message);
    }
  };
  return (
    <div
      className={`${styles.main} ${
        favouriteSalons && favouriteSalons.length === 1
          ? styles.singleWishlist
          : ""
      }`}
    >
      {!favouriteSalons ? (
        skeleton
      ) : !favouriteSalons || favouriteSalons.length === 0 ? (
        <p className={styles.noWishLists}>No Wishlist available</p>
      ) : (
        favouriteSalons?.map((salon, index) => (
          <div key={index} className={styles.salonDetails}>
            <div className="">
              <Images
                imageUrl={salon.mainGateImageUrl}
                alt="image"
                className={styles.img}
              />
            </div>
            <div className={styles.details}>
              <div className={styles.titlesDetails}>
                <div className={styles.titles}>
                  <h2>
                    {salon.title ||
                      salon.name ||
                      `${salon.firstName} ${salon.lastName} `}
                  </h2>
                  <p className={styles.buddyType}>{salon.specialization}</p>
                  <p className={styles.locations}>
                    <LocationOnIcon /> {salon.city}
                  </p>
                </div>
                <div className={styles.wishlists}>
                  {salon.isFavorite ? (
                    <div
                      className={`${styles.heart} ${
                        salon.isFavorite ? styles.favorite : styles.nonFavorite
                      }`}
                      onClick={() => handleSelectFavorites(salon.id, false)}
                    ></div>
                  ) : (
                    <CiHeart
                      onClick={() => handleSelectFavorites(salon.id, true)}
                    />
                  )}
                  <p>wishList</p>
                </div>
              </div>
              <div className={styles.ratings}>
                <p className={styles.locations}>
                  <StarIcon /> {salon.rating}
                </p>
                <p>{salon.serviceType}</p>
              </div>
              <p className={styles.description}>{salon.address}</p>
              <div className={styles.btnDiv}>
                <Link href={`/salonlist/${salon.id}`}>
                  <button className={styles.doorBuddyBtn}>View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WishLists;
