import React from "react";
import styles from './GigCard.module.css'
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  
  return (
    <Link to={`/gig/123`} className={styles.link}>
      <div className={styles.gigCard}>
        <img src={item.img} alt="" />
        <div className={styles.info}>
            <div className={styles.user}>
              <img src={item.pp} alt="" />
              <span>{item.username}</span>
            </div>
          <p>{item.desc}</p>
          <div className={styles.star}>
            <img src="./img/star.png" alt="" />
            <span>
              {item.star}
            </span>
          </div>
        </div>
        <hr />
        <div className={styles.detail}>
          <img src="./img/heart.png" alt="" />
          <div className={styles.price}>
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
