"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './banner.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { getBanners, searchService, searchText } from '@/api/account.api';
import Link from 'next/link';
import Notify from '@/utils/notify';
import Session from '@/service/session';
import { useRouter } from 'next/navigation';

function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [banners, setBanners] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState('');
    const sliderRef = useRef(null);
     const router = useRouter()
    const NextArrow = ({ className, onClick }) => (
        <GrNext 
            className={className}
            onClick={onClick}
            style={{ position: "absolute", top: "40%", zIndex: 1, cursor: "pointer", color: "black" }} 
        />
    );

    const PrevArrow = ({ className, onClick }) => (
        <div
            className={className}
            onClick={onClick}
            style={{ display: "none" }}
        >
            Prev
        </div>
    );

    const handleDotClick = (index) => {
        sliderRef.current.slickGoTo(index);
        setCurrentSlide(index);
    };

    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        // beforeChange: (current, next) => {
        //     setCurrentSlide(next);
        //     setBackgroundImage(banners[next]?.mediaUrl || '');
        // }
    };

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await getBanners();
                setBanners(res?.data?.data.items);
                if (res?.data?.data?.length) {
                    setBackgroundImage(res.data.data[0]?.mediaUrl || '');
                }
            } catch (error) {
                Notify.error(error.message);
            }
        };
        fetchBanners();
    }, []);

    const handleClick = async(slide) => {
        Session.set('selectedBannerCity',slide.city)
        try {
            const res = await searchText(slide.city, 1, 10);
            Session.setObject("selectedBannerSalons",res?.data?.data);
            Session.remove('filteredSalon');
            Session.remove('salonService');

            router.push('/salonlist')
          } catch (error) {
            Notify.error(error.message);
          }
    };

    
    return (
        <div
            className={styles.container}
           // style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={styles.s}>
                <Slider {...settings} ref={sliderRef}>
                    {banners.map((slide, index) => (
                        <div key={index} onClick={() => handleClick(slide)}>
                            <img src={slide.mediaUrl} alt={slide.name} className={styles.sliderImage} />
                            {/* <h1 dangerouslySetInnerHTML={{ __html: slide.name }} /> */}
                            {/* <p>{slide.city}</p> */}
                            {/* <button><Link href={slide.redirectLink}>Discover</Link></button>  */}
                        </div>
                    ))}
                </Slider>
                {/* <div className={styles.sliderDots}>
                        {banners.map((_, dotIndex) => (
                            <span
                                key={dotIndex}
                                className={dotIndex === currentSlide ? styles.active : ""}
                                onClick={() => handleDotClick(dotIndex)}
                            />
                        ))}
                    </div> */}
            </div>
        </div>
    );
}

export default Banner;
