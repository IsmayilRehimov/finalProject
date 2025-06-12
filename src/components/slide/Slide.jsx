import React from "react";
import styles from './Slide.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Özəl ox düymələri komponenti
const NextArrow = ({ onClick }) => (
  <button className={`${styles.arrow} ${styles.next}`} onClick={onClick}>
    ›
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className={`${styles.arrow} ${styles.prev}`} onClick={onClick}>
    ‹
  </button>
);

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 3,
    slidesToScroll: arrowsScroll || 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={styles.slide}>
      <div className={styles.container}>
        <Slider {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;