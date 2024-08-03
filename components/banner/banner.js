'use client';
import React from 'react';
import styles from "./banner.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { searchText } from "@/api/account.api";
import Notify from "@/utils/notify";
import Session from "@/service/session";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import { useRouter } from 'next/navigation';

const Banner = ({ banners }) => {
  const router = useRouter();

  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 3000,
  };

  const handleClick = async (slide) => {
    Session.set("selectedBannerCity", slide.city);
    try {
      const res = await searchText(slide.city, 1, 10);
      Session.setObject("selectedBannerSalons", res?.data?.data);
      Session.remove("filteredSalon");
      Session.remove("salonService");
      router.push("/salonlist");
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <>
      {banners.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.bannerSlider}>
            <Slider {...settings}>
              {banners.map((slide, index) => (
                <div key={index} onClick={() => handleClick(slide)}>
                  <Image
                    src={slide.mediaUrl}
                    alt={slide.name}
                    className={styles.sliderImage}
                    width={500}
                    height={300}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <div className={styles.bannerSlider}>
          <Skeleton
            variant="rectangular"
            style={{ width: "100%", height: "335px", borderRadius: "15px" }}
          />
        </div>
      )}
    </>
  );
};

export default Banner;
