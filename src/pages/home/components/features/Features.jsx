import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1>A whole world of freelance talent at your fingertips</h1>
          <div className={styles.title}>
            <img src="./img/check.png" alt="" />
            The best for every budget
          </div>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <div className={styles.title}>
            <img src="./img/check.png" alt="" />
            Quality work done quickly
          </div>
          <p>
            Find the right freelancer to begin working on your project within
            minutes.
          </p>
          <div className={styles.title}>
            <img src="./img/check.png" alt="" />
            Protected payments, every time
          </div>
          <p>
            Always know what you'll pay upfront. Your payment isn't released
            until you approve the work.
          </p>
          <div className={styles.title}>
            <img src="./img/check.png" alt="" />
            24/7 support
          </div>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
        </div>
        <div className={styles.item}>
          <video src="./img/video.mp4" controls />
        </div>
      </div>
    </div>
  );
};

export default Features;