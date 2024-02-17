"use client"
import { useState } from 'react';
import styles from './banner.module.css'


const sliderContent = [
    { title: `Lorem Ipsum  <br> is a Dummy Text<br> in Design Industry`, description: 'Lorem ipsum is a Dummy Text in Design Industry' },
    { title: `Stylrax Sallon  <br> is a Dummy Text<br> in Design Industry`, description: 'Stylrax Sallon is a Dummy Text in Design Industry' },
    { title: `Salon Management <br> is a Dummy Text<br> in Design Industry`, description: 'Salon Management is a Dummy Text in Design Industry' },
    { title: `Service Management  <br> is a Dummy Text<br> in Design Industry`, description: 'Service Management is a Dummy Text in Design Industry' },
    { title: `Feature Management  <br> is a Dummy Text<br> in Design Industry`, description: 'Feature Management is a Dummy Text in Design Industry' },
    { title: `Admin Management  <br> is a Dummy Text<br> in Design Industry`, description: 'Feature Management is a Dummy Text in Design Industry' },
];
function Banner() {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleNextSlide = () => {
        // Increment slide index
        setSlideIndex((prevIndex) => (prevIndex + 1) % sliderContent.length);
    };

    const handleDotClick = (index) => {
        setSlideIndex(index);
    };

  return (
    <div className={styles.container}>
    <div className={styles.content}>
        <h2 dangerouslySetInnerHTML={{ __html: sliderContent[slideIndex].title }}></h2>
        {/* <KeyboardArrowRightOutlinedIcon className={styles.right} onClick={handleNextSlide} /> */}
        <p>{sliderContent[slideIndex].description}</p>
        <span className={styles.amet}>amet consectetur.</span>
        <div className={styles.line}></div>
        <h2 className={styles.offer}>30% off</h2>
        <button>Discover</button>
        <div className={styles.sliderDots}>
            {/* Render slider dots */}
            {sliderContent.map((_, index) => (
                <div
                    key={index}
                    className={`${styles.sliderDot} ${index === slideIndex ? styles.active : ''}`}
                    onClick={() => handleDotClick(index)}
                ></div>
            ))}
        </div>
    </div>
    <div className={styles.img}>

    </div>
</div>
  )
}

export default Banner
