"use client"
import styles from './salonList.module.css'
import { SalonListData, ShopsCategory, Rating, Distance, Category } from './data';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CiHeart } from "react-icons/ci";
import Image from 'next/image';
import { GoLocation } from "react-icons/go";
import { FaRegCalendarDays } from "react-icons/fa6";
import Img from '@/assets/images/salonImage.svg'

const SalonLists = () => {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.findsSalon}>
                    <div className={styles.find}>
                        <div className={styles.findsIcons}>
                            <GoLocation className={styles.locationIcons} />
                            <FaRegCalendarDays className={styles.calendra} />
                        </div>
                        <div className={styles.findsDetails}>
                            <p>Find Your</p>
                            <h1>Salon</h1>
                        </div>

                    </div>
                </div>
                <div className={styles.salonLists}>
                    <div className={styles.salonListFilter}>
                        <div className={styles.applyConditions}>
                            <p>Search Filter</p>
                            <div className={styles.combine}>
                                <button>Apply</button><button className={styles.clear}>Clear</button>
                            </div>

                        </div>
                        <div className={styles.categoryContainer}>
                            <div className={styles.shopCategory}>
                                <h5>Shops Category</h5>
                                {ShopsCategory.map((categories, index) => (
                                    <div key={index} className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            id={categories}
                                            value={categories}
                                            //  onChange={handleCategoryChange}
                                            className={styles.checkboxes}
                                        />
                                        <label htmlFor={categories}>{categories}</label>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.shopCategory}>
                                <h5>Rating</h5>
                                {Rating.map((rating, index) => (
                                    <div key={index} className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            id={rating}
                                            value={rating}
                                            className={styles.checkboxes}

                                        />
                                        <label htmlFor={rating}>{rating}-Star</label>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.shopCategory}>

                                <h5>Distance</h5>
                                {Distance.map((distance, index) => (
                                    <div key={index} className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            id={distance}
                                            value={distance}
                                            className={styles.checkboxes}

                                        />
                                        <label htmlFor={distance}>{distance}</label>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.shopCategory}>
                                <h5>Category</h5>
                                {Category.map((category, index) => (
                                    <div key={index} className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            id={category}
                                            value={category}
                                            className={styles.checkboxes}


                                        />
                                        <label htmlFor={category}>{category}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className={styles.salonList}> {SalonListData.map((salon, index) => (
                        <div key={index} className={styles.salonDetails}>
                            <div className={styles.img}>
                                <Image src={Img} alt="image" style={{ width: "100%", height: "100%" }} />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.titlesDetails}>
                                    <div className={styles.titles}>

                                        <h2>{salon.title}</h2>
                                        <p className={styles.locations}><LocationOnIcon /> {salon.location}</p>
                                    </div>
                                    <div className={styles.wishlists}>
                                        <CiHeart />
                                        <p>wishList</p>
                                    </div>
                                </div>
                                <div className={styles.ratings}>
                                    <p className={styles.locations}><StarIcon /> {salon.rating}</p>
                                    <p>Unisex</p>

                                </div>
                                <p className={styles.description}>  {salon.description}</p>
                                <button>View Details</button>
                            </div>
                        </div>
                    ))}</div>
                </div>
            </div>
        </>
    )
}

export default SalonLists