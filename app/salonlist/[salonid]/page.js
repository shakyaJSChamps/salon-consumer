'use client'
import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import styles from './salonid.module.css';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarsIcon from '@mui/icons-material/Stars';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Slider from 'react-slick';
import { Col, Row } from 'react-bootstrap';
import { getDetailPageData } from '@/api/account.api';
import Notify from '@/utils/notify';
import { FaHeart } from 'react-icons/fa';
import Skeleton from '@mui/material/Skeleton';
import dummyBanner from '../../../assets/images/dummyBanner.jpeg';
import AboutSalon from '@/components/aboutSalon/aboutSalon';
import SalonService from '@/components/salonService/salonService';
import SalonGallery from '@/components/salonGallery/salonGallery';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function SalonDetail({ params }) {
  const salonid = params.salonid;
  const [activeButton, setActiveButton] = useState('about');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getSalonData() {
      try {
        const detailPageData = await getDetailPageData(salonid);
        setData(detailPageData?.data?.data);
      } catch (error) {
        Notify.log(error.message);
      }
    }
    getSalonData();
  }, [salonid]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const settings = {
    infinite: data?.bannerImages?.length > 1,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 3000,
    prevArrow: <></>, // Hide previous arrow
    nextArrow: <></>, // Hide next arrow
  };

  // Skeletons for banner images
  const skeletonSlider = (
    <Slider {...settings} className={styles.salonSlider}>
        <div  className={styles.sliderImageWrapper}>
          <Skeleton variant="rectangular" style={{ width: '100%', height: '335px', borderRadius: '15px' }}/>
        </div>
    </Slider>
  );

  // Render content based on active button
  return (
    <div className={styles.container}>
      {data ? (
        <>
          <div className={styles.salonSlider}>
            {data.bannerImages && data.bannerImages?.length > 1 ? (
              <Slider {...settings} className={styles.slider}>
                {data.bannerImages.map((url, index) => (
                  <div key={index} className={styles.sliderImageWrapper}>
                    <Image
                      src={url}
                      alt={`Banner Image ${index + 1}`}
                      width={500}
                      height={350}
                      className={styles.sliderImage}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className={styles.sliderImageWrapper}>
                <Image
                  src={data.bannerImages?.[0] || dummyBanner}
                  alt="Banner Image"
                  width={500}
                  height={350}
                  className={styles.sliderImage}
                />
              </div>
            )}
            <div className={styles.sliderTitle}>
              <h3>{data.name}</h3>
            </div>
          </div>
          <div className={styles.button}>
            <button
              onClick={() => handleButtonClick('about')}
              className={activeButton === 'about' ? styles.active : ''}
            >
              About
            </button>
            <button
              onClick={() => handleButtonClick('services')}
              className={activeButton === 'services' ? styles.active : ''}
            >
              Services
            </button>
            <button
              onClick={() => handleButtonClick('gallery')}
              className={activeButton === 'gallery' ? styles.active : ''}
            >
              Gallery
            </button>
          </div>
          {activeButton === 'about' && (
            <div className={styles.aboutContent}>
              <AboutSalon id={salonid} />
            </div>
          )}
          {activeButton === 'services' && (
            <div className={styles.servicesContent}>
              <SalonService id={salonid} homeService={data.homeService} />
            </div>
          )}
          {activeButton === 'gallery' && (
            <div className={styles.galleryContent}>
              <SalonGallery data={data.gallaryImages} />
            </div>
          )}
        </>
      ) : (
        <>
          {skeletonSlider}
          <div className={styles.SalonDetails}>
            <div className={styles.aboutSalon}>
              <div className={styles.salonName}>
                <h2>
                  <Skeleton variant="text" width={200} />
                </h2>
                <div className={styles.wishlistIcon}>
                  <ShareIcon className={styles.wIcon} />
                  <FavoriteBorderIcon className={styles.wIcon} />
                </div>
              </div>
              <div className={styles.salonRating}>
                <StarsIcon className={styles.icon} />
                <p>
                  <Skeleton variant="text" width={50} />
                </p>
              </div>
              <div className={styles.salonLocation}>
                <LocationOnIcon className={styles.icon} />
                <p>
                  <Skeleton variant="text" width={150} />
                </p>
              </div>
            </div>
            <div className={styles.salonTiming}>
              <h4>Working hours</h4>
              <div className={styles.timing}>
                <Col>
                  {daysOfWeek.map((day, index) => (
                    <Row key={index}>
                      <Col md={6}>{day}</Col>
                      <Col className={styles.main} md={6}>
                        <Skeleton variant="text" width={100} />
                      </Col>
                    </Row>
                  ))}
                </Col>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SalonDetail;
