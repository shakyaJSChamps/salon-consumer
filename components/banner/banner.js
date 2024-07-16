import React, { useState, useRef, useEffect } from 'react';
import styles from './banner.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { getBanners, searchText } from '@/api/account.api';
import Link from 'next/link';
import Notify from '@/utils/notify';
import Session from '@/service/session';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Skeleton } from '@mui/material';

function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [banners, setBanners] = useState(null); // Initialize banners as null
    const [backgroundImage, setBackgroundImage] = useState('');
    const sliderRef = useRef(null);
    const router = useRouter();

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
    };

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await getBanners();
                setBanners(res?.data?.data.items);
                if (res?.data?.data.items.length > 0) {
                    setBackgroundImage(res.data.data.items[0]?.mediaUrl || '');
                }
            } catch (error) {
                Notify.error(error.message);
                setBanners([]); // Handle error by setting banners to an empty array
            }
        };
        fetchBanners();
    }, []);

    const handleClick = async (slide) => {
        Session.set('selectedBannerCity', slide.city)
        try {
            const res = await searchText(slide.city, 1, 10);
            Session.setObject("selectedBannerSalons", res?.data?.data);
            Session.remove('filteredSalon');
            Session.remove('salonService');

            router.push('/salonlist')
        } catch (error) {
            Notify.error(error.message);
        }
    };

    return (
        <>
            {banners !== null ? (
                <div className={styles.container}>
                    <div className={styles.bannerSlider}>
                        <Slider {...settings} ref={sliderRef}>
                            {banners.map((slide, index) => (
                                <div key={index} onClick={() => handleClick(slide)}>
                                    <Image src={slide.mediaUrl} alt={slide.name} className={styles.sliderImage} width={500} height={300} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            ) : (<div className={styles.bannerSlider}>
                <Skeleton variant="rectangular" style={{ width: '100%', height: '335px', borderRadius: '15px' }} />
            </div>
            )}
        </>
    );
}

export default Banner;
