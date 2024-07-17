"use client";
import { useEffect, useState } from "react";
import { getFavouriteSalonList } from "@/api/account.api";
import Link from "next/link";
import styles from "./wishlist.module.css";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CiHeart } from "react-icons/ci";
import Images from "@/app/image";
import Notify from "@/utils/notify";
import { Skeleton } from "@mui/material";
const WishLists = () => {
  const [favouriteSalons, setFavouriteSalons] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFavouriteSalonList();
        setFavouriteSalons(res?.data?.data?.items);
        setLoading(false);
      } catch (error) {
        Notify.error(error.message);
        setLoading(true);
      }
    };
    fetchData();
  }, []);

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
  return (
    <div
      className={`${styles.main} ${
        favouriteSalons && favouriteSalons.length === 1 ? styles.singleWishlist : ""
      }`}
    >
      {loading ? (
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
                      onClick={() => handleSelecteFavourites(salon.id, false)}
                    ></div>
                  ) : (
                    // <CiHeart className={`${styles.heart} ${salon.isFavorite ? styles.favorite : styles.nonFavorite}`}
                    //     onClick={() => handleSelecteFavourites(salon.id, false)} />
                    <CiHeart
                      onClick={() => handleSelecteFavourites(salon.id, true)}
                    />
                  )}
                  <p>wishList</p>
                </div>
              </div>
              <div className={styles.ratings}>
                <p className={styles.locations}>
                  <StarIcon /> {salon.rating}.0
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
