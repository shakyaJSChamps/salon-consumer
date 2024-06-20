// "use client";

// import { useEffect, useRef, useState } from "react";
// import styles from "./lists.module.css";
// import Image from "next/image";
// import { CiHeart } from "react-icons/ci";
// import StarIcon from "@mui/icons-material/Star";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import Link from "next/link";
// import CircularProgress from "@mui/material/CircularProgress";
// import { favoriteSalon } from "@/api/account.api";
// import Images from "@/app/image";

// const FilterServices = ({
//   title,
//   options,
//   selectedOptions,
//   onChange,
//   formatOption,
// }) => {
//   return (
//     <div className={styles.shopCategory}>
//       <h5>{title}</h5>
//       {options?.map((option, index) => (
//         <div key={index} className={styles.checkboxContainer}>
//           <input
//             type="checkbox"
//             id={option}
//             value={option}
//             className={styles.checkboxes}
//             checked={selectedOptions[option] || false}
//             onChange={() => onChange(option)}
//           />
//           <label htmlFor={option}>
//             {formatOption ? formatOption(option) : option}
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Lists = (props) => {
//   const {
//     title,
//     buttonLabel,
//     imageSrc,
//     lists,
//     Distance,
//     ShopsCategory,
//     calendraImages,
//     doorBuddyBtn,
//     doorBuddyFind,
//     doorbuddy,
//     page,
//     isLoading,
//     loadMoreItems,
//     lazyLoadingThreshold,
//     hasMoreData,
//     setLists,
//   } = props;

//   const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
//   const [facilities, setFacilities] = useState([]);
//   const [selectedRatings, setSelectedRatings] = useState({});
//   const listRef = useRef(null);

//   const handleFilterChange = (option, type) => {
//     switch (type) {
//       case "serviceType":
//         setSelectedServiceTypes((prevServiceTypes) => ({
//           ...prevServiceTypes,
//           [option]: !prevServiceTypes[option],
//         }));
//         break;
//       case "facility":
//         setFacilities((prevFacilities) => ({
//           ...prevFacilities,
//           [option]: !prevFacilities[option],
//         }));
//         break;
//       case "rating":
//         setSelectedRatings((prevSelectedRatings) => ({
//           ...prevSelectedRatings,
//           [option]: !prevSelectedRatings[option],
//         }));
//         break;
//       default:
//         break;
//     }
//   };

//   const handleClearFilters = () => {
//     setSelectedServiceTypes([]);
//     setFacilities([]);
//     setSelectedRatings({});
//   };

//   useEffect(() => {
//     const currentListRef = listRef.current;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           lists.length > 0 &&
//           !isLoading &&
//           hasMoreData
//         ) {
//           loadMoreItems();
//         }
//       },
//       { threshold: lazyLoadingThreshold }
//     );

//     if (currentListRef) {
//       observer.observe(currentListRef);
//     }

//     return () => {
//       if (currentListRef) {
//         observer.unobserve(currentListRef);
//       }
//     };
//   }, [
//     listRef,
//     loadMoreItems,
//     lists.length,
//     lazyLoadingThreshold,
//     isLoading,
//     hasMoreData,
//   ]);

//   const listFilter = lists?.filter((item) => {
//     const ratingMatch = Object.values(selectedRatings).some(
//       (val) => val === true
//     )
//       ? selectedRatings[item.rating]
//       : true;
//     const serviceTypeMatch = Object.values(selectedServiceTypes).some(
//       (val) => val === true
//     )
//       ? selectedServiceTypes[item.serviceType]
//       : true;
//     return ratingMatch && serviceTypeMatch;
//   });

//   const getUniqueServices = (array, property) => {
//     return [...new Set(array?.map((item) => item[property]))];
//   };

//   const handleSelectFavorites = async (salonId, isFavorite) => {
//     try {
//       await favoriteSalon(salonId, isFavorite);
//       setLists((prevLists) =>
//         prevLists.map((salon) =>
//           salon.id === salonId ? { ...salon, isFavorite } : salon
//         )
//       );
//     } catch (error) {
//       console.error("Error favoriting salon:", error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.findsSalon}>
//         <div className={doorBuddyFind ? styles.doorBuddyFind : styles.find}>
//           <div className={styles.findsIcons}>
//             {doorbuddy && (
//               <Image src={doorbuddy} alt="doorbuddy" height={50} width={50} />
//             )}
//             {calendraImages && (
//               <Image
//                 src={calendraImages}
//                 alt="calendra"
//                 height={55}
//                 width={65}
//               />
//             )}
//           </div>
//           <div className={styles.findsDetails}>
//             <p>Find Your</p>
//             <h3>{title}</h3>
//           </div>
//         </div>
//       </div>
//       <div className={styles.salonLists}>
//         <div className={styles.salonListFilter}>
//           <div className={styles.applyConditions}>
//             <p>Search Filter</p>
//             <div className={styles.combine}>
//               <button>Apply</button>
//               <button className={styles.clear} onClick={handleClearFilters}>
//                 Clear
//               </button>
//             </div>
//           </div>
//           <div className={styles.categoryContainer}>
//             <FilterServices
//               title="Category"
//               options={getUniqueServices(lists, "serviceType")}
//               selectedOptions={selectedServiceTypes}
//               onChange={(option) => handleFilterChange(option, "serviceType")}
//             />
//             <FilterServices
//               title="Rating"
//               options={getUniqueServices(lists, "rating")}
//               selectedOptions={selectedRatings}
//               onChange={(option) => handleFilterChange(option, "rating")}
//               formatOption={(option) => `${option}.0`}
//             />
//           </div>
//         </div>
//         <div className={styles.salonList}>
//           {listFilter?.map((salon, index) => (
//             <div key={index} className={styles.salonDetails}>
//               <div className={styles.img}>
//                 {/* <img src={salon.mainGateImageUrl ? salon.mainGateImageUrl : imageSrc} alt="image" /> */}
//                <Images
//                imageUrl={salon.mainGateImageUrl}
//                alt="Salon image"
//                />
//               </div>
//               <div className={styles.details}>
//                 <div className={styles.titlesDetails}>
//                   <div className={styles.titles}>
//                     <h2>
//                       {salon.title ||
//                         salon.name ||
//                         `${salon.firstName} ${salon.lastName}`}
//                     </h2>
//                     <p className={styles.buddyType}>{salon.specialization}</p>
//                     <p className={styles.locations}>
//                       <LocationOnIcon /> {salon.city}
//                     </p>
//                   </div>
//                   <div className={styles.wishlists}>
//                     {salon.isFavorite ? (
//                       <div
//                         className={`${styles.heart} ${
//                           salon.isFavorite
//                             ? styles.favorite
//                             : styles.nonFavorite
//                         }`}
//                         onClick={() => handleSelectFavorites(salon.id, false)}
//                       ></div>
//                     ) : (
//                       <CiHeart
//                         onClick={() => handleSelectFavorites(salon.id, true)}
//                       />
//                     )}
//                     <p>wishList</p>
//                   </div>
//                 </div>
//                 <div className={styles.ratings}>
//                   <p className={styles.locations}>
//                     <StarIcon /> {salon.rating}.0
//                   </p>
//                   <p>{salon.serviceType}</p>
//                 </div>
//                 <p className={styles.description}>{salon.address}</p>
//                 <Link href={`/salonlist/${salon.id}`} className={styles.btnDiv}>
//                   <button className={doorBuddyBtn ? styles.doorBuddyBtn : ""}>
//                     {buttonLabel}
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div style={{ margin: "auto", textAlign: "center" }}>
//               <CircularProgress className={styles.loadingIndicator} />
//             </div>
//           )}
//           <div ref={listRef} className={styles.listBottomMarker}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Lists;


"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./lists.module.css";
import Image from "next/image";
import { CiHeart, CiUser } from "react-icons/ci";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { favoriteSalon } from "@/api/account.api";
import Images from "@/app/image";
import { ImMenu, ImCross } from "react-icons/im";

const FilterServices = ({
  title,
  options,
  selectedOptions,
  onChange,
  formatOption,
  closeMenu,
}) => {
  const handleChange = (option) => {
    onChange(option);
    if (window.innerWidth < 767) {
      closeMenu();
    }
  };
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
            onChange={() => handleChange(option)}          />
          <label htmlFor={option}>
            {formatOption ? formatOption(option) : option}
          </label>
        </div>
      ))}
    </div>
  );
};

const Lists = (props) => {
  const {
    title,
    buttonLabel,
    imageSrc,
    lists,
    Distance,
    ShopsCategory,
    calendraImages,
    doorBuddyBtn,
    doorBuddyFind,
    doorbuddy,
    page,
    isLoading,
    loadMoreItems,
    lazyLoadingThreshold,
    hasMoreData,
    setLists,
  } = props;

  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  console.log("service ,,",selectedServiceTypes)
  const [facilities, setFacilities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState({});
  const listRef = useRef(null);

  const handleFilterChange = (option, type) => {
    switch (type) {
      case "serviceType":
        setSelectedServiceTypes((prevServiceTypes) => ({
          ...prevServiceTypes,
          [option]: !prevServiceTypes[option],
        }));
        break;
      case "facility":
        setFacilities((prevFacilities) => ({
          ...prevFacilities,
          [option]: !prevFacilities[option],
        }));
        break;
      case "rating":
        setSelectedRatings((prevSelectedRatings) => ({
          ...prevSelectedRatings,
          [option]: !prevSelectedRatings[option],
        }));
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setSelectedServiceTypes([]);
    setFacilities([]);
    setSelectedRatings({});
  };

  useEffect(() => {
    const currentListRef = listRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          lists.length > 0 &&
          !isLoading &&
          hasMoreData
        ) {
          loadMoreItems();
        }
      },
      { threshold: lazyLoadingThreshold }
    );

    if (currentListRef) {
      observer.observe(currentListRef);
    }

    return () => {
      if (currentListRef) {
        observer.unobserve(currentListRef);
      }
    };
  }, [
    listRef,
    loadMoreItems,
    lists.length,
    lazyLoadingThreshold,
    isLoading,
    hasMoreData,
  ]);

  const listFilter = lists?.filter((item) => {
    const ratingMatch = Object.values(selectedRatings).some(
      (val) => val === true
    )
      ? selectedRatings[item.rating]
      : true;
    const serviceTypeMatch = Object.values(selectedServiceTypes).some(
      (val) => val === true
    )
      ? selectedServiceTypes[item.serviceType]
      : true;
    return ratingMatch && serviceTypeMatch;
  });

  const getUniqueServices = (array, property) => {
    return [...new Set(array?.map((item) => item[property]))];
  };

  const handleSelectFavorites = async (salonId, isFavorite) => {
    try {
      await favoriteSalon(salonId, isFavorite);
      setLists((prevLists) =>
        prevLists.map((salon) =>
          salon.id === salonId ? { ...salon, isFavorite } : salon
        )
      );
    } catch (error) {
      console.error("Error favoriting salon:", error);
    }
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.findsSalon}>
        <div className={doorBuddyFind ? styles.doorBuddyFind : styles.find}>
          <div className={styles.findsIcons}>
            {doorbuddy && (
              <Image src={doorbuddy} alt="doorbuddy" height={50} width={50} />
            )}
            {calendraImages && (
              <Image
                src={calendraImages}
                alt="calendra"
                height={55}
                width={65}
              />
            )}
          </div>
          <div className={styles.findsDetails}>
            <p>Find Your</p>
            <h3>{title}</h3>
          </div>
        </div>
      </div>
      <div className={styles.salonLists}>
        <div className={styles.menuToggle}>
          {menuVisible ? (
            <ImCross className={styles.humburgerCross} onClick={handleToggleMenu} />
          ) : (
            <ImMenu className={styles.humburger} onClick={handleToggleMenu} />
          )}
        </div>
        {menuVisible && (
          <div className={styles.salonListFilter}>
            <ImCross className={styles.humburgerCross} onClick={handleToggleMenu} />

            <div className={styles.applyConditions}>

              <p>Search Filter</p>
              <div className={styles.combine}>
                <button>Apply</button>
                <button className={styles.clear} onClick={handleClearFilters}>
                  Clear
                </button>
              </div>
            </div>
            <div className={styles.categoryContainer}>
              <FilterServices
                title="Category"
                options={getUniqueServices(lists, "serviceType")}
                selectedOptions={selectedServiceTypes}
                onChange={(option) => handleFilterChange(option, "serviceType")}
                closeMenu={handleToggleMenu}
              />
              <FilterServices
                title="Rating"
                options={getUniqueServices(lists, "rating")}
                selectedOptions={selectedRatings}
                onChange={(option) => handleFilterChange(option, "rating")}
                formatOption={(option) => `${option}.0`}
                closeMenu={handleToggleMenu}
              />
            </div>
          </div>
        )}
          <div className={styles.listFilter}>
            <div className={styles.conditions}>
              <p>Search Filter</p>
              <div className={styles.combine}>
                <button>Apply</button>
                <button className={styles.clear} onClick={handleClearFilters}>
                  Clear
                </button>
              </div>
            </div>
            <div className={styles.categoryContainers}>
              <FilterServices
                title="Category"
                options={getUniqueServices(lists, "serviceType")}
                selectedOptions={selectedServiceTypes}
                onChange={(option) => handleFilterChange(option, "serviceType")}
              />
              <FilterServices
                title="Rating"
                options={getUniqueServices(lists, "rating")}
                selectedOptions={selectedRatings}
                onChange={(option) => handleFilterChange(option, "rating")}
                formatOption={(option) => `${option}.0`}
              />
            </div>
          </div>
        
        <div className={styles.salonList}>
          {listFilter?.map((salon, index) => (
            <div key={index} className={styles.salonDetails}>
              <div className={styles.img}>
                <Images imageUrl={salon.mainGateImageUrl} alt="Salon image" />
              </div>
              <div className={styles.details}>
                <div className={styles.titlesDetails}>
                  <div className={styles.titles}>
                    <h2>
                      {salon.title ||
                        salon.name ||
                        `${salon.firstName} ${salon.lastName}`}
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
                          salon.isFavorite
                            ? styles.favorite
                            : styles.nonFavorite
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
                    <StarIcon /> {salon.rating}.0
                  </p>
                  <p className={styles.serviceType}>{salon.serviceType}</p>
                </div>
                <p className={styles.description}>{salon.address}</p>
                <Link href={`/salonlist/${salon.id}`} className={styles.btnDiv}>
                  <button className={doorBuddyBtn ? styles.doorBuddyBtn : ""}>
                    {buttonLabel}
                  </button>
                </Link>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ margin: "auto", textAlign: "center" }}>
              <CircularProgress className={styles.loadingIndicator} />
            </div>
          )}
          <div ref={listRef} className={styles.listBottomMarker}></div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
