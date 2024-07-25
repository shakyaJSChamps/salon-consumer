"use client";
import styles from "./salonDetails.module.css";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SalonService from "@/components/salonService/salonService";
import SalonGallery from "@/components/salonGallery/salonGallery";
import dummyBanner from "@/assets/images/dummyBanner.jpeg";
import AboutSalon from "@/components/aboutSalon/aboutSalon";
import { FaHeart } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function SalonDetails({ salonid, data }) {
  const [activeButton, setActiveButton] = useState("about");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const homeService = data?.homeService;
  const workingHours = data?.workingHours || [];
  const settings = {
    infinite: data?.bannerImages?.length > 1,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.container}>
      {data ? (
        <>
          <div className={styles.salonSlider}>
            {data?.bannerImages?.length > 1 ? (
              <Slider {...settings} className={styles.salonSlider}>
                {data?.bannerImages?.map((url, index) => (
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
                  src={data?.bannerImages?.[0] || dummyBanner}
                  alt="Banner Image"
                  width={500}
                  height={350}
                  className={styles.sliderImage}
                />
              </div>
            )}
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
                  {data?.isFavorite ? (
                    <FaHeart
                      className={styles.wIcon}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <FavoriteBorderIcon className={styles.wIcon} />
                  )}
                </div>
              </div>
              <div className={styles.salonLocation}>
                <LocationOnIcon className={styles.icon} />
                {`${data?.address}, ${data?.city}`}
              </div>
            </div>
            <div className={styles.salonTiming}>
              <h4>Working hours</h4>
              <div className={styles.timing}>
                <Col>
                  {daysOfWeek.map((day, index) => {
                    const workingDay = workingHours.find(
                      (wd) => wd.day === day
                    );
                    return (
                      <Row key={index}>
                        <Col md={6}>{day}</Col>
                        <Col className={styles.main} md={6}>
                          {workingDay &&
                          workingDay.openTime &&
                          workingDay.closeTime
                            ? `${workingDay.openTime} - ${workingDay.closeTime}`
                            : "Closed"}
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <button
              onClick={() => handleButtonClick("about")}
              className={activeButton === "about" ? styles.active : ""}
            >
              About
            </button>
            <button
              onClick={() => handleButtonClick("services")}
              className={activeButton === "services" ? styles.active : ""}
            >
              Services
            </button>
            <button
              onClick={() => handleButtonClick("gallery")}
              className={activeButton === "gallery" ? styles.active : ""}
            >
              Gallery
            </button>
          </div>
          {activeButton === "about" && (
            <div className={styles.aboutContent}>
              <AboutSalon id={salonid} />
            </div>
          )}
          {activeButton === "services" && (
            <div className={styles.servicesContent}>
              <SalonService id={salonid} homeService={homeService} />
            </div>
          )}
          {activeButton === "gallery" && (
            <div className={styles.galleryContent}>
              <SalonGallery data={data?.gallaryImages} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className={styles.sliderImage}>
            <Skeleton
              variant="rectangular"
              style={{ width: "100%", height: "335px", borderRadius: "15px" }}
            />
          </div>
          <div className={styles.skeletonHeading}>
            <Skeleton
              variant="text"
              width="40%"
              height={50}
              className={styles.skeletonMain}
            />
            <Skeleton
              variant="text"
              width="40%"
              height={50}
              className={styles.skeletonMain}
            />
          </div>
          <div className={styles.skeletonDiv}>
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
          </div>
          <div className={styles.skeletonDiv}>
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
          </div>
          <div className={styles.skeletonDiv}>
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
          </div>
          <div className={styles.skeletonDiv}>
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
          </div>
          <div className={styles.skeletonDiv}>
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
          </div>
          <div className={styles.skeletonDiv}>
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
            <Skeleton
              variant="text"
              width="20%"
              height={50}
              className={styles.skeletonContent}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default SalonDetails;
