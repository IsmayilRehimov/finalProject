import React, { useEffect, useRef } from "react";
import "./Features.scss";

const Features = () => {
  const videoRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 } // %50 si görünürse tetiklenir
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="features">
      <div className="container">
        <div className="item">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <div className="title">
            <img src="./img/check.png" alt="" />
            The best for every budget
          </div>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Quality work done quickly
          </div>
          <p>
            Find the right freelancer to begin working on your project within minutes.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Protected payments, every time
          </div>
          <p>
            Always know what you’ll pay upfront. Your payment isn’t released until you approve the work.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            24/7 support
          </div>
          <p>
            Have a question? Our support team is here to help — anytime.
          </p>
        </div>
        <div className="item">
          <video ref={videoRef} src="./img/video1.mp4" controls muted />
        </div>
      </div>
    </div>
  );
};

export default Features;
