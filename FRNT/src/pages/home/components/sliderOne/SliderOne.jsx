import React from "react";
import "./SliderOne.scss";
import Slide from "../../../../components/slide/Slide";
import GigCard from "../../../../components/gigCard/GigCard";

const SliderOne = ({ gigs, isLoading, error }) => {
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
          <Slide slidesToShow={5}>
            {topRatedGigs.map((gig) => (
              <div key={gig._id}>
                <GigCard item={gig} />
              </div>
            ))}
          </Slide>
        )}
      </div>
    </div>
  );
};

export default SliderOne;
