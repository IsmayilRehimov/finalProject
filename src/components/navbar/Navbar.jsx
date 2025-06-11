import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'; // düzəldildi

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = {
    id:1,
    useranme:"Duben Laylay",
    isSeller:true
  }

  return (
    <div className={`${styles.navbar} ${active ? styles.active : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to='/'>
            <span className={styles.text}>fiverr</span>
          </Link>
          <span className={styles.dot}>.</span>
        </div>
        <div className={styles.links}>
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign in</span>
          {!currentUser ?.isSeller && <span>Become a Seller</span>}
          {!currentUser &&<button className={styles.joinBtn}>Join</button>}
          {currentUser && (
            <div className={styles.user} onClick={() => setOpen(!open)}>
              <img src="data:image/jpeg;base64,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" alt="" />
              <span>{currentUser?.useranme}</span>
              {open && <div className={styles.options}>
                {
                  currentUser ?.isSeller && (
                    <>
                    <span>Gigs</span>
                    <span>Add New Gig</span>
                    </>
                  )}
                  <span>Orders</span>
                  <span>Messages</span>
                  <span>Logout</span>
              </div>}
            </div>
          )}
        </div>
      </div>
      {active && (
        <>
          <hr />
          <div className={styles.menu}>
            <Link className={styles.menuLink} to="/">Graphics & Design</Link>
            <Link className={styles.menuLink} to="/">Video & Animation</Link>
            <Link className={styles.menuLink} to="/">Writing & Translation</Link>
            <Link className={styles.menuLink} to="/">AI Services</Link>
            <Link className={styles.menuLink} to="/">Digital Marketing</Link>
            <Link className={styles.menuLink} to="/">Music & Audio</Link>
            <Link className={styles.menuLink} to="/">Programming & Tech</Link>
            <Link className={styles.menuLink} to="/">Business</Link>
            <Link className={styles.menuLink} to="/">Lifestyle</Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
