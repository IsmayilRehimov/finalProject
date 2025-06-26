import React from "react";
import { useNavigate } from "react-router-dom";
import "./Explore.scss";

const categories = [
  { label: "Graphics & Design", value: "design", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg" },
  { label: "Digital Marketing", value: "digital", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg" },
  { label: "Writing & Translation", value: "writing", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg" },
  { label: "Video & Animation", value: "animation", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg" },
  { label: "Music & Audio", value: "music", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg" },
  { label: "Programming & Tech", value: "web", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg" },
  { label: "Business", value: "business", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg" },
  { label: "Lifestyle", value: "lifestyle", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg" },
  { label: "Data", value: "data", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg" },
  { label: "Photography", value: "photography", img: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg" },
];

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="explore">
      <div className="container">
        <h1>Explore the marketplace</h1>
        <div className="items">
          {categories.map((cat) => (
            <div key={cat.value} className="item" onClick={() => navigate(`/gigs?cat=${cat.value}`)}>
              <img src={cat.img} alt={cat.label} />
              <div className="line"></div>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
