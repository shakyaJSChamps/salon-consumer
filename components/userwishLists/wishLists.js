"use client"
import Image from 'next/image'
import styles from './wishlist.module.css'
import { IoStarSharp } from "react-icons/io5";
import Img from '@/assets/images/salonImage.svg'
import { useEffect, useState } from 'react';
import { getFavouriteSalonList } from '@/api/account.api';
const WishLists = () => {
const [favouriteSalons,setFavouriteSalons]=useState(null)
console.log("favouriteSalonList::>",favouriteSalons);
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const res=await getFavouriteSalonList();
                // console.log("favouriteSalonList::>",res?.data?.data?.items);
                setFavouriteSalons(res?.data?.data?.items)
            } catch (error) {
                console.log("error",error)
            }
        }
        fetchData();
    },[])
    return (
        <div className={styles.wishLists}>

           {favouriteSalons?.map((item,index)=>(
             <div className={styles.wishListItems}>
             <div className={styles.img}>
                 <Image src={item.mainGateImageUrl} alt="Image" width={100} height={100} />
             </div>
             <div className={styles.wishListsInfo}>
                 <h3>{item.name}</h3>
                 <p className={styles.studioName}>Address:{` ${item.city} ${item.state} ${item.pincode}`} </p>
                 <p className={styles.rating}><IoStarSharp />{item.rating}</p>
             </div>
         </div>
           ))}
            {/* <div className={styles.wishListItems}>
                <div className={styles.img}>
                    <Image src={Img} alt="Image" />
                </div>
                <div className={styles.wishListsInfo}>
                    <h3>HairWithCare</h3>
                    <p className={styles.studioName}>Salon Studio</p>
                    <p className={styles.rating}><IoStarSharp />4.2(5.2k)</p>
                </div>
            </div>
            <div className={styles.wishListItems}>
                <div className={styles.img}>
                    <Image src={Img} alt="Image" />
                </div>
                <div className={styles.wishListsInfo}>
                    <h3>HairWithCare</h3>
                    <p className={styles.studioName}>Salon Studio</p>
                    <p className={styles.rating}><IoStarSharp />4.2(5.2k)</p>
                </div>
            </div> */}
        </div>
    )
}


export default WishLists