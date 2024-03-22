"use client"
import { useState } from 'react';
import styles from './lists.module.css'
import Image from 'next/image';
import { CiHeart } from 'react-icons/ci';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import nextConfig from '@/next.config.mjs';



const FilterServices = ({ title, options, selectedOptions, onChange, formatOption, getUniqueValues }) => {
    return (
        <div className={styles.shopCategory}>
            <h5>{title}</h5>
            {options?.map((option, index) => (
                <div key={index} className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id={option}
                        value={option}
                        className={styles.checkboxes}
                        checked={selectedOptions[option] || false}
                        onChange={() => onChange(option)}
                    />
                    <label htmlFor={option}>{formatOption ? formatOption(option) : option}</label>
                </div>
            ))}
        </div>
    );
};




const Lists = (props) => {
    const { title, buttonLabel, imageSrc, lists, Distance, ShopsCategory, calendraImages, doorBuddyBtn, doorBuddyFind, doorbuddy } = props;

    const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState({});

    const handleFilterChange = (option, type) => {
        switch (type) {
            case 'serviceType':
                setSelectedServiceTypes(prevFacilities => ({
                    ...prevFacilities,
                    [option]: !prevFacilities[option]
                }));
                break;
            case 'facility':
                setFacilities(prevFacilities => ({
                    ...prevFacilities,
                    [option]: !prevFacilities[option]
                }));
                break;
            case 'rating':
                setSelectedRatings(prevSelectedRatings => ({
                    ...prevSelectedRatings,
                    [option]: !prevSelectedRatings[option]
                }));
                break;
            default:
                break;
        }
    };

    const handelClearFilters = () => {
        setSelectedServiceTypes([]);
        setFacilities([]);
        setSelectedRatings({});
    };

    const listFilter = lists?.filter(item => {
        //const facilityMatch = Object.keys(facilities).length === 0 || facilities[item.facility];
        const ratingMatch = Object.values(selectedRatings).some(val => val === true) ? selectedRatings[item.rating] : true;
        const serviceTypeMatch = Object.values(selectedServiceTypes).some(val => val === true) ? selectedServiceTypes[item.serviceType] : true;
        return ratingMatch && serviceTypeMatch;
    });
    const getUniqueServices = (array, property) => {
        return [...new Set(array?.map(item => item[property]))];
    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.findsSalon}>
                    <div className={doorBuddyFind ? styles.doorBuddyFind : styles.find}>
                        <div className={styles.findsIcons}>
                            {doorbuddy && <Image src={doorbuddy} alt='doorbuddy' height={50} width={50} />}
                            {calendraImages && <Image src={calendraImages} alt='calendra' height={55} width={65} />}
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
                            <FilterServices
                                title="Shops Category"
                                options={ShopsCategory}
                                selectedOptions={facilities}
                                onChange={(option) => handleFilterChange(option, 'facility')}
                            />

                            <FilterServices
                                title="Category"
                                options={getUniqueServices(lists, 'serviceType')}
                                selectedOptions={selectedServiceTypes}
                                onChange={(option) => handleFilterChange(option, 'serviceType')}
                            />

                            <FilterServices
                                title="Rating"
                                options={getUniqueServices(lists, 'rating')}
                                selectedOptions={selectedRatings}
                                onChange={(option) => handleFilterChange(option, 'rating')}
                                formatOption={(option) => `${option}.0`}
                            />


                            <div className={styles.shopCategory}>
                                {/* <FilterServices
                                    title="Distance"
                                    options={Rating}
                                    selectedOptions={selectedRatings}
                                    onChange={(option) => handleFilterChange(option, 'distance')}
                                /> */}
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
                        {listFilter?.map((salon, index) => (

                            <div key={index} className={styles.salonDetails}>
                                <div className={styles.img}>
                                    <Image
                                        src={salon.mainGateImageUrl}
                                        alt="image"
                                        style={{ width: "100%", height: "100%" }}
                                        width={10} height={10}
                                    />
                                </div>
                                <div className={styles.details}>
                                    <div className={styles.titlesDetails}>
                                        <div className={styles.titles}>
                                            <h6>{salon.title || salon.name}</h6>
                                            <p className={styles.buddyType}>
                                                {/* {salon.serviceType} */}
                                            </p>
                                            <p className={styles.locations}><LocationOnIcon /> {salon.city}</p>
                                        </div>
                                        <div className={styles.wishlists} >
                                            {salon.isFavorite ?

                                                (<div className={`${styles.heart} ${salon.isFavorite ? styles.favorite : styles.nonFavorite}`}></div>)
                                                : (
                                                    <CiHeart />
                                                )
                                            }
                                            <p>wishList</p>
                                        </div>
                                    </div>
                                    <div className={styles.ratings}>
                                        <p className={styles.locations}><StarIcon /> {salon.rating}.0</p>
                                        <p>{salon.serviceType}</p>
                                    </div>
                                    <p className={styles.description}>  {salon.address}</p>
                                    <Link href={`/salonlist/${salon.id}`}>
                                        <button className={doorBuddyBtn ? styles.doorBuddyBtn : ""}>{buttonLabel}</button>
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

export default Lists;