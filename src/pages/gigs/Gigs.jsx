import React, { useState } from 'react'
import styles from './Gigs.module.css'
import GigCard from '../../components/gigCard/GigCard';
import {gigs} from '../../data'

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");


  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }
  return (
     <div className={styles.gigs}>
      <div className={styles.container}>
        <span className={styles.breadcrumbs}>Liverr &gt; Graphics & Design &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr&apos;s AI artists
        </p>
        <div className={styles.menu}>
          <div className={styles.left}>
            <span>Budget</span>
            <input type="number" placeholder="min" />
            <input type="number" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className={styles.right}>
            <span className={styles.sortBy}>Sort by</span>
            <span className={styles.sortType}>
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className={styles.rightMenu}>
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.cards}>
          {gigs.map(gig => 
          <GigCard key={gig.id} item={gig} />)}
        </div>
      </div>
    </div>
  )
}

export default Gigs