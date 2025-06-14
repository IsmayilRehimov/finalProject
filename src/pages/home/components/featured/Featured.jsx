import React from 'react'
import styles from './Featured.module.css'

const Featured = () => {
  return (
    <div className={styles.featured}>
        <div className={styles.container}>
            <div className={styles.left}>
                <h1>Our freelancers will take it from here</h1>
                <div className={styles.search}>
                    <div className={styles.searchInput}>
                        <img src="./img/search.png" alt="" />
                        <input type="text" placeholder='Seach for any service...'/>
                    </div>
                    <button>Search</button>
                </div>
                <div className={styles.popular}>
                    <span>Popular:</span>
                    <button>Website Development</button>
                    <button>AI Services</button>
                    <button>UCG Videos</button>
                    <button>Logo Design</button>
                </div>
            </div>
            <div className={styles.right}>
                <img src="./img/man.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Featured