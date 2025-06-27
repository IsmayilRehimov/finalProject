import React, { useEffect, useState } from "react";
import "./SliderOne.scss";
import Slide from "../../../../components/slide/Slide";
import GigCard from "../../../../components/gigCard/GigCard";

const SliderOne = ({ gigs, isLoading, error }) => {
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

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topRatedGigs = gigs
    ?.map((gig) => ({
      ...gig,
      rating:
        typeof gig.totalStars === "number" &&
        typeof gig.starNumber === "number" &&
        gig.starNumber > 0
          ? gig.totalStars / gig.starNumber
          : 0,
    }))
    .filter((gig) => gig.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <div className="sliderOne">
      <div className="container">
        <h2>Top Rated Gigs</h2>

        {isLoading ? (
          <p>Loading gigs...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error fetching gigs</p>
        ) : topRatedGigs?.length === 0 ? (
          <p>No top rated gigs found.</p>
        ) : (
          <Slide slidesToShow={slidesToShow} arrowsScroll={slidesToShow}>
            {topRatedGigs.map((gig) => (
              <GigCard key={gig._id} item={gig} />
            ))}
          </Slide>
        )}
      </div>
    </div>
  );
};

export default SliderOne;
