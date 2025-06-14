import React from 'react';
import styles from './Explore.module.css';

const Explore = () => {
  return (
    <div className={styles.explore}>
      <div className={styles.container}>
        <h1>Explore the marketplace</h1>
        <div className={styles.items}>
          {/* Marketplace items remain the same */}
        </div>
      </div>
    </div>
  );
};

export default Explore;