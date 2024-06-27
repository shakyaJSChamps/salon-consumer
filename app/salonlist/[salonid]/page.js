// "use client"
// import styles from './salonid.module.css'
// import ShareIcon from '@mui/icons-material/Share';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import StarsIcon from '@mui/icons-material/Stars';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { useEffect, useState } from 'react';

// import SalonService from '@/components/salonService/salonService';
// import SalonGallery from '@/components/salonGallery/salonGallery';
// import AboutSalon from '@/components/aboutSalon/aboutSalon';
// import { getDetailPageData } from '@/api/account.api';
// import { FaHeart } from "react-icons/fa";
// import Slider from "react-slick";
// import { Col, Row } from 'react-bootstrap';

// function SalonDetail({ params }) {
//     const salonid = params.salonid
//     console.log("params-----", salonid);
//     // State to keep track of active button
//     const [activeButton, setActiveButton] = useState('about');
//     const [data, setData] = useState([]);
//     console.log("data----->", data);
//     // Function to handle button click and update active button
//     const handleButtonClick = (buttonName) => {
//         setActiveButton(buttonName);
//     };

//     useEffect(() => {
//         async function getSalonData() {
//             try {
//                 // Call getDetailPageData with salonid
//                 const detailPageData = await getDetailPageData(salonid);
//                 setData(detailPageData?.data?.data);
//                 console.log("kjhfsjkhajk",detailPageData)
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         getSalonData();
//     }, [salonid]);
//     const homeService= data?.homeService;
//     console.log("home service",homeService)
//     const hasWorkingHours = data?.workingHours?.some(day => day.openTime && day.closeTime);

//     return (
//         <div className={styles.container}>
//             <div className={styles.salonSlider} style={{ backgroundImage: `url(${data?.mainGateImageUrl})` }}>
//                 <div className={styles.sliderTitle}>
//                     <h3>{data?.name}</h3>
//                 </div>

//             </div>
//             <div className={styles.SalonDetails}>
//                 <div className={styles.aboutSalon}>
//                     <div className={styles.salonName}>
//                         <h2>{data?.name}</h2>
//                         <div className={styles.wishlistIcon}>
//                             <ShareIcon className={styles.wIcon} />
//                             {data?.isFavorite ?<FaHeart className={styles.wIcon} style={{color:"red"}}/>:<FavoriteBorderIcon className={styles.wIcon}/>}

//                         </div>
//                     </div>
//                     <div className={styles.salonRating}>
//                         <StarsIcon className={styles.icon} />
//                         <p>4.2 (1k+ Ratings)</p>
//                     </div>
//                     <div className={styles.salonLocation}>
//                         <LocationOnIcon className={styles.icon} />
//                         <p>{`${data?.address},${data?.city}`}</p>
//                         <h2>{data?.homeService}</h2>

//                     </div>

//                 </div>
//                 <div className={styles.salonTiming}>
//                     <h4>Working hours</h4>
//                     <div className={styles.timing}>
//                     <Col>
//                             {hasWorkingHours ? (
//                                 data.workingHours.map((day, index) => (
//                                     day.openTime && day.closeTime && (
//                                         <Row key={index}>
//                                             <Col md={6}>{day.day}</Col>
//                                             <Col className={styles.main} md={6}>{`${day.openTime} - ${day.closeTime}`}</Col>
//                                         </Row>
//                                     )
//                                 ))
//                             ) : (
//                                 <p>No working days available</p>
//                             )}
//                         </Col>
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.button}>
//                 <button onClick={() => handleButtonClick('about')} className={activeButton === 'about' ? styles.active : ''}>About</button>
//                 <button onClick={() => handleButtonClick('services')} className={activeButton === 'services' ? styles.active : ''}>Services</button>
//                 <button onClick={() => handleButtonClick('gallery')} className={activeButton === 'gallery' ? styles.active : ''}>Gallery</button>
//             </div>
//             {/* Content */}
//             {activeButton === 'about' && (
//                 <div className={styles.aboutContent}>
//                     <AboutSalon id={salonid} />
//                 </div>

//             )}
//             {activeButton === 'services' && (
//                 <div className={styles.servicesContent}>
//                     <SalonService id={salonid} homeService={homeService}/>
//                 </div>
//             )}
//             {activeButton === 'gallery' && (
//                 <div className={styles.galleryContent}>
//                     <SalonGallery data={data?.gallaryImages} />
//                 </div>
//             )}
//         </div>
//     )
// }

// export default SalonDetail


"use client"
import styles from './salonid.module.css'
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarsIcon from '@mui/icons-material/Stars';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';

import SalonService from '@/components/salonService/salonService';
import SalonGallery from '@/components/salonGallery/salonGallery';
import AboutSalon from '@/components/aboutSalon/aboutSalon';
import { getDetailPageData } from '@/api/account.api';
import { FaHeart } from "react-icons/fa";
import { Col, Row } from 'react-bootstrap';
import Notify from '@/utils/notify';
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function SalonDetail({ params }) {
    const salonid = params.salonid
    const [activeButton, setActiveButton] = useState('about');
    const [data, setData] = useState([]);
    // Function to handle button click and update active button
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    useEffect(() => {
        async function getSalonData() {
            try {
                // Call getDetailPageData with salonid
                const detailPageData = await getDetailPageData(salonid);
                setData(detailPageData?.data?.data);
            } catch (error) {
                Notify.log(error.message);
            }
        }
        getSalonData();
    }, [salonid]);
    
    const homeService = data?.homeService;
    const workingHours = data?.workingHours || [];

    return (
        <div className={styles.container}>
            <div className={styles.salonSlider} style={{ backgroundImage: `url(${data?.mainGateImageUrl})` }}>
                <div className={styles.sliderTitle}>
                    <h3>{data?.name}</h3>
                </div>
            </div>
            <div className={styles.SalonDetails}>
                <div className={styles.aboutSalon}>
                    <div className={styles.salonName}>
                        <h2>{data?.name}</h2>
                        <div className={styles.wishlistIcon}>
                            <ShareIcon className={styles.wIcon} />
                            {data?.isFavorite ? <FaHeart className={styles.wIcon} style={{ color: "red" }} /> : <FavoriteBorderIcon className={styles.wIcon} />}
                        </div>
                    </div>
                    <div className={styles.salonRating}>
                        <StarsIcon className={styles.icon} />
                        <p>4.2 (1k+ Ratings)</p>
                    </div>
                    <div className={styles.salonLocation}>
                        <LocationOnIcon className={styles.icon} />
                        <p>{`${data?.address}, ${data?.city}`}</p>
                    </div>
                </div>
                <div className={styles.salonTiming}>
                    <h4>Working hours</h4>
                    <div className={styles.timing}>
                        <Col>
                            {daysOfWeek.map((day, index) => {
                                const workingDay = workingHours.find(wd => wd.day === day);
                                return (
                                    <Row key={index}>
                                        <Col md={6}>{day}</Col>
                                        <Col className={styles.main} md={6}>
                                            {workingDay && workingDay.openTime && workingDay.closeTime ? (
                                                `${workingDay.openTime} - ${workingDay.closeTime}`
                                            ) : (
                                                'Closed'
                                            )}
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Col>
                    </div>
                </div>
            </div>
            <div className={styles.button}>
                <button onClick={() => handleButtonClick('about')} className={activeButton === 'about' ? styles.active : ''}>About</button>
                <button onClick={() => handleButtonClick('services')} className={activeButton === 'services' ? styles.active : ''}>Services</button>
                <button onClick={() => handleButtonClick('gallery')} className={activeButton === 'gallery' ? styles.active : ''}>Gallery</button>
            </div>
            {/* Content */}
            {activeButton === 'about' && (
                <div className={styles.aboutContent}>
                    <AboutSalon id={salonid} />
                </div>
            )}
            {activeButton === 'services' && (
                <div className={styles.servicesContent}>
                    <SalonService id={salonid} homeService={homeService} />
                </div>
            )}
            {activeButton === 'gallery' && (
                <div className={styles.galleryContent}>
                    <SalonGallery data={data?.gallaryImages} />
                </div>
            )}
        </div>
    )
}

export default SalonDetail;
