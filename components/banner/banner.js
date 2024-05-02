"use client";
import React, { useState, useRef } from 'react';
import styles from './banner.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";

const sliderContent = [
    { title: `Bespoke Cuts, <br>Effortless Style`, description: 'Professional haircut and grooming services' },
    { title: `Stylrax Sallon  <br> is a Dummy Text<br> in Design Industry`, description: 'Stylrax Sallon is a Dummy Text in Design Industry' },
    { title: `Salon Management <br> is a Dummy Text<br> in Design Industry`, description: 'Salon Management is a Dummy Text in Design Industry' },
    { title: `Service Management  <br> is a Dummy Text<br> in Design Industry`, description: 'Service Management is a Dummy Text in Design Industry' },
    { title: `Feature Management  <br> is a Dummy Text<br> in Design Industry`, description: 'Feature Management is a Dummy Text in Design Industry' },
    { title: `Admin Management  <br> is a Dummy Text<br> in Design Industry`, description: 'Feature Management is a Dummy Text in Design Industry' },
];

function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const NextArrow = (props) => {
        const { className, onClick } = props;
        return (
            // <div
            //     className={className}
            //     onClick={onClick}
            //     style={{ position: "absolute", top: "50%", zIndex: 1, cursor: "pointer" }}
            // >
            //     Next
            // </div>
            <GrNext className={className}
                onClick={onClick}
                style={{ position: "absolute", top: "40%", zIndex: 1, cursor: "pointer", color: "white", }} />
        );
    };

    const PrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
                style={{ display: "none" }}
            >
                Prev
            </div>
        );
    };

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
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setCurrentSlide(next)
    };


    return (
        <div className={styles.container}>
            {/* <div className={styles.sliderImg}>
                {/* <Image src={images} alt="Slider Image" /> }
            </div> */}
            <div className={styles.slidersContent}>
                <Slider {...settings} ref={sliderRef}>
                    {sliderContent.map((slide, index) => (
                        <div key={index}>
                            <h1 dangerouslySetInnerHTML={{ __html: slide.title }} />
                            <p>{slide.description}</p>

                        </div>
                    ))}

                </Slider>
                <button>Discover</button>
                <div className={styles.sliderDetails}>
                    <div className={styles.sliderDots}>
                        {sliderContent.map((_, dotIndex) => (
                            <span
                                key={dotIndex}
                                className={dotIndex === currentSlide ? styles.active : ""}
                                onClick={() => handleDotClick(dotIndex)}
                            />
                        ))}
                    </div>
                    {/* <div className={styles.midOffer}>
                        <p>amet consectetur</p>
                        <div className={styles.border}></div>
                        <h1>30% off</h1>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Banner;