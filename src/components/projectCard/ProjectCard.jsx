import React from "react";
import { Link } from "react-router-dom";
import styles from './projectCard.module.css'

function ProjectCard({ item = {} }) {
  return (
    <Link to='/' className={styles.link}>
      <div className={styles.projectCard}>
      <img src={item.img} alt="" />
      <div className={styles.info}>
        <img src={item.pp} alt="" />
        <div className={styles.texts}>
          <h2>{item.cat}</h2>
          <span>{item.username}</span>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ProjectCard;