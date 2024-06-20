"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './banner.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { getBanners } from '@/api/account.api';
import Link from 'next/link';

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
    const [banner, setBanner] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState('');
    const sliderRef = useRef(null);

    const NextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <GrNext
                className={className}
                onClick={onClick}
                style={{ position: "absolute", top: "40%", zIndex: 1, cursor: "pointer", color: "white" }}
            />
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
        beforeChange: (current, next) => {
            setCurrentSlide(next);
            setBackgroundImage(banner[next]?.mediaUrl || '');
        }
    };

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await getBanners();
                setBanner(res?.data?.data.items);
                if (res?.data?.data?.length) {
                    setBackgroundImage(res.data.data[0]?.mediaUrl || '');
                }
            } catch (error) {
                console.log("error===>", error);
            }
        };
        fetchBanners();
    }, []);

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={styles.slidersContent}>
                <Slider {...settings} ref={sliderRef}>
                    {banner.map((slide, index) => (
                        <div key={index}>
                            <h1 dangerouslySetInnerHTML={{ __html: slide.name }} />
                            <p>{slide.city}</p>
                            <button><Link href={slide.redirectLink}>Discover</Link></button>

                        </div>
                    ))}
                </Slider>
                <div className={styles.sliderDetails}>
                    <div className={styles.sliderDots}>
                        {banner.map((_, dotIndex) => (
                            <span
                                key={dotIndex}
                                className={dotIndex === currentSlide ? styles.active : ""}
                                onClick={() => handleDotClick(dotIndex)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;





// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import styles from './banner.module.css';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { GrNext } from "react-icons/gr";
// import { getBanners } from '@/api/account.api';

// function Banner() {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [banners, setBanners] = useState([]);
//     console.log("banners",banners)
//     const sliderRef = useRef(null);

//     const NextArrow = ({ className, onClick }) => (
//         <GrNext 
//             className={className}
//             onClick={onClick}
//             style={{ position: "absolute", top: "40%", zIndex: 1, cursor: "pointer", color: "white" }} 
//         />
//     );

//     const PrevArrow = ({ className, onClick }) => (
//         <div
//             className={className}
//             onClick={onClick}
//             style={{ display: "none" }}
//         >
//             Prev
//         </div>
//     );

//     const handleDotClick = (index) => {
//         if (sliderRef.current) {
//             sliderRef.current.slickGoTo(index);
//             setCurrentSlide(index);
//         }
//     };

//     const settings = {
//         infinite: true,
//         speed: 2000,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//         beforeChange: (current, next) => setCurrentSlide(next)
//     };

//     useEffect(() => {
//         const fetchBanners = async () => {
//             try {
//                 const res = await getBanners();
//                 setBanners( res.data.data.items);
//             } catch (error) {
//                 console.error("Error fetching banners:", error);
//             }
//         };
//         fetchBanners();
//     }, []);

//     return (
//         <div className={styles.container}>
//             <div className={styles.slidersContent}>
//                 <Slider {...settings} ref={sliderRef}>
//                     {banners.map((slide, index) => (
//                         <div key={index} className={styles.sliderItem}>
//                             <img src={slide.mediaUrl} alt={slide.name} className={styles.sliderImage} />
//                             <h1>{slide.name}</h1>
//                             <p>{slide.city}</p>
//                         </div>
//                     ))}
//                 </Slider>
//                 <button>Discover</button>
//                 <div className={styles.sliderDetails}>
//                     <div className={styles.sliderDots}>
//                         {banners.map((_, dotIndex) => (
//                             <span
//                                 key={dotIndex}
//                                 className={dotIndex === currentSlide ? styles.active : ""}
//                                 onClick={() => handleDotClick(dotIndex)}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Banner;


