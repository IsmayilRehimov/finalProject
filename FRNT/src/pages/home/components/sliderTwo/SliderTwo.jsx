import React, { useEffect, useState } from "react";
import "./SliderTwo.scss";
import Slide from "../../../../components/slide/Slide";
import GigCard from "../../../../components/gigCard/GigCard";

const SliderTwo = ({ gigs, isLoading, error }) => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 992) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize(); // Sayfa ilk açıldığında çalışsın
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sliderTwo">
      <div className="container">
        <h2>Popular Gigs</h2>

        {isLoading ? (
          <p>Loading gigs...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error fetching gigs</p>
        ) : gigs?.length === 0 ? (
          <p>No gigs found.</p>
        ) : (
          <Slide slidesToShow={slidesToShow} arrowsScroll={slidesToShow}>
            {gigs.map((gig) => (
              <GigCard key={gig._id} item={gig} />
            ))}
          </Slide>
        )}
      </div>
    </div>
  );
};

export default SliderTwo;
