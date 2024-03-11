"use client"
import { useState } from 'react';
import styles from './generic.module.css';
import Image from 'next/image';
import { CiHeart } from 'react-icons/ci';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const GenericComponent = (props) => {
    const { title, buttonLabel, imageSrc, dataList, Rating, Distance, Category, ShopsCategory, FaRegCalendarDays, GiComb, GoLocation, RiScissors2Line } = props;

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [facilities, setFacilities] = useState([])

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleFacilityChange = (facility) => {
        if (facilities.includes(facility)) {
            setFacilities(facilities.filter(f => f !== facility));
        } else {
            setFacilities([...facilities, facility]);
        }
        console.log("Updated facilities:", facilities);
    };

    const filteredData = dataList.filter(item => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.category);
        const facilityMatch = facilities.length === 0 || facilities.includes(item.facility);
        return categoryMatch && facilityMatch;
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
                                <button>Apply</button><button className={styles.clear}>Clear</button>
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
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <label htmlFor={category}>{category}</label>
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
                                        <p className={styles.locations}><StarIcon /> {salon.rating}</p>
                                        <p>{salon.category}</p>
                                    </div>
                                    <p className={styles.description}>  {salon.description}</p>
                                    <button>{buttonLabel}</button>
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
