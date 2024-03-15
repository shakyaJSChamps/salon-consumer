
import Image from 'next/image'
import styles from './wishlist.module.css'
import { IoStarSharp } from "react-icons/io5";
import Img from '@/assets/images/salonImage.svg'

const WishLists = () => {
    return (
        <div className={styles.wishLists}>

            <div className={styles.wishListItems}>
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
            </div>
        </div>
    )
}


export default WishLists