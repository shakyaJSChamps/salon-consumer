"use client"
import Image from 'next/image'
import { IoStarSharp } from "react-icons/io5";
import Img from '@/assets/images/salonImage.svg'
import { useEffect, useState } from 'react';
import { getFavouriteSalonList } from '@/api/account.api';
import Link from 'next/link';
import styles from "./wishlist.module.css";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CiHeart } from 'react-icons/ci';
import Images from '@/app/image';
const WishLists = () => {
    const [favouriteSalons, setFavouriteSalons] = useState(null)
    console.log("favouriteSalonList::>", favouriteSalons);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getFavouriteSalonList();
                // console.log("favouriteSalonList::>",res?.data?.data?.items);
                setFavouriteSalons(res?.data?.data?.items)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchData();
    }, [])
    return (
        <div className={styles.main}>

            {favouriteSalons?.map((salon, index) => (
               <div key={index} className={styles.salonDetails}>
               <div className={styles.img}>
                   
                       <Images imageUrl={salon.mainGateImageUrl} alt="image" style={{width:"200px",height:"200px"}} />
       
               </div>
               <div className={styles.details}>
                   <div className={styles.titlesDetails}>
                       <div className={styles.titles}>
                           <h2>{salon.title || salon.name || `${salon.firstName} ${salon.lastName} `}</h2>
                           <p className={styles.buddyType}>{salon.specialization}</p>
                           <p className={styles.locations}>
                               <LocationOnIcon /> {salon.city}
                           </p>
                       </div>
                       <div className={styles.wishlists}>
                           {salon.isFavorite ? (
                               <div className={`${styles.heart} ${salon.isFavorite ? styles.favorite : styles.nonFavorite}`}
                                   onClick={() => handleSelecteFavourites(salon.id, false)}></div>
                               // <CiHeart className={`${styles.heart} ${salon.isFavorite ? styles.favorite : styles.nonFavorite}`}
                               //     onClick={() => handleSelecteFavourites(salon.id, false)} />
                           ) : (
                               <CiHeart onClick={() => handleSelecteFavourites(salon.id, true)} />
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
                   <Link href={`/salonlist/${salon.id}`}>
                       <button className={styles.doorBuddyBtn}>View Details</button>
                   </Link>
               </div>
           </div>
            ))}
           
        </div>
    )
}


export default WishLists