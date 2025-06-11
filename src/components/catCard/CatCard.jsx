import React from "react";
import { Link } from "react-router-dom";
import styles from './CatCard.module.css'

function CatCard( {item} ) {
  return (
    <Link to="/gigs?cat=design">
      <div className={styles.catCard}>
        <img src={item.img} alt="" />
        <span className={styles.desc}>{item.desc}</span>
        <span className={styles.title}>{item.title}</span>
      </div>
    </Link>
  );
}
export default CatCard;
