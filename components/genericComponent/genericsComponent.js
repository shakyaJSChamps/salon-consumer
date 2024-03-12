"use client"
import { useState } from 'react';
import styles from './generic.module.css'
import Image from 'next/image';
import { CiHeart } from 'react-icons/ci';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';

const GenericComponent = (props) => {
    const { title, buttonLabel, imageSrc, dataList, Rating, Distance, Category, ShopsCategory, FaRegCalendarDays, GoLocation, RiScissors2Line, GiComb } = props;

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState({});

    const handleCategoryChange = (category) => {
        const newSelectedCategories = { ...selectedCategories };
        if (newSelectedCategories[category]) {
            delete newSelectedCategories[category];
        } else {
            newSelectedCategories[category] = true;
        }
        setSelectedCategories(newSelectedCategories);
    };

    const handleFacilityChange = (facility) => {
        const newFacilities = { ...facilities };
        if (newFacilities[facility]) {
            delete newFacilities[facility];
        } else {
            newFacilities[facility] = true;
        }
        setFacilities(newFacilities);
    };

    const handleRatingChange = (rating) => {
        const newSelectedRatings = { ...selectedRatings };
        if (newSelectedRatings[rating]) {
            delete newSelectedRatings[rating];
        } else {
            newSelectedRatings[rating] = true;
        }
        setSelectedRatings(newSelectedRatings);
    };

    const handelClearFilters = () => {
        setSelectedCategories([]);
        setFacilities([]);
        setSelectedRatings({});
    };

    const filteredData = dataList.filter(item => {
        const categoryMatch = Object.keys(selectedCategories).length === 0 || selectedCategories[item.category];
        const facilityMatch = Object.keys(facilities).length === 0 || facilities[item.facility];
        const ratingMatch = Object.keys(selectedRatings).length === 0 || selectedRatings[item.rating];
        return categoryMatch && facilityMatch && ratingMatch;
    });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.findsSalon}>
                    <div className={styles.find}>
                        <div className={styles.findsIcons}>
                            {GoLocation && <GoLocation className={styles.locationIcons} />}
                            {GiComb && <GiComb className={styles.combIcons} />}
                            {RiScissors2Line && <RiScissors2Line className={styles.scissors} />}
                            {FaRegCalendarDays && <FaRegCalendarDays className={styles.calendra} />}
                        </div>
                        <div className={styles.findsDetails}>
                            <p>Find Your</p>
                            <h1>{title}</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.salonLists}>
                    <div className={styles.salonListFilter}>
                        <div className={styles.applyConditions}>
                            <p>Search Filter</p>
                            <div className={styles.combine}>
                                <button>Apply</button>
                                <button className={styles.clear} onClick={handelClearFilters}>Clear</button>
                            </div>
                        </div>
                        <div className={styles.categoryContainer}>
                            {ShopsCategory && <div className={styles.shopCategory}>
                                <h5>Shops Category</h5>
                                {ShopsCategory.map((categories, index) => (
                                    <div key={index} className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            id={categories}
                                            value={categories}
                                            className={styles.checkboxes}
                                            checked={facilities[categories] || false}
                                            onChange={() => handleFacilityChange(categories)}
                                        />
                                        <label htmlFor={categories}>{categories}</label>
                                    </div>
                                ))}
                            </div>}
                            <div className={styles.shopCategory}>
                                <h5>Category</h5>
                                {Category.map((category, index) => (
                                    <div key={index} className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            id={category}
                                            value={category}
                                            className={styles.checkboxes}
                                            checked={selectedCategories[category] || false}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <label htmlFor={category}>{category.toUpperCase()}</label>
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
                                            checked={selectedRatings[rating] || false}
                                            onChange={() => handleRatingChange(rating)}
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


                        </div>
                    </div>
                    <div className={styles.salonList}>
                        {filteredData.map((salon, index) => (
                            <div key={index} className={styles.salonDetails}>
                                <div className={styles.img}>
                                    <Image src={imageSrc} alt="image" style={{ width: "100%", height: "100%" }} />
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.titlesDetails}>
                                        <div className={styles.titles}>
                                            <h2>{salon.title || salon.facility}</h2>
                                            <p className={styles.buddyType}>{salon.type}</p>
                                            <p className={styles.locations}><LocationOnIcon /> {salon.location}</p>
                                        </div>
                                        <div className={styles.wishlists}>
                                            <CiHeart />
                                            <p>wishList</p>
                                        </div>
                                    </div>
                                    <div className={styles.ratings}>
                                        <p className={styles.locations}><StarIcon /> {salon.rating}.0</p>
                                        <p>{salon.category}</p>
                                    </div>
                                    <p className={styles.description}>  {salon.description}</p>
                                    <Link href={`/salonlist/${salon._id}`}>
                                        <button>{buttonLabel}</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenericComponent;