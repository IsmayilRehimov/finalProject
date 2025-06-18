import React from "react";
import Slider from "react-slick";
import styles from "./Gig.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gig = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.gig}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.breadCrumbs}>
            Fiverr {">"} Graphics & Design {">"}
          </span>
          <h1>I will create logo for you</h1>

          <div className={styles.user}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTssfcj1A3USUWOuPGnkgPUYSVDkWK1cp2KOQ&s"
              alt="User"
            />
            <span>Duben LAylay</span>
            <div className={styles.stars}>
              <img src="/img/star.png" alt="star" />
              <img src="/img/star.png" alt="star" />
              <img src="/img/star.png" alt="star" />
              <img src="/img/star.png" alt="star" />
              <img src="/img/star.png" alt="star" />
              <span>5</span>
            </div>
          </div>

          <Slider {...sliderSettings}>
            <img
              src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
          </Slider>

          <h2>Lorem, ipsum dolor sit amet consectetur adipisicing.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            repellat maxime eius fuga dignissimos dolore sit voluptatibus vel
            necessitatibus provident quod pariatur quis molestiae, reprehenderit
            quidem nihil asperiores perferendis cum quos. Exercitationem
            veritatis dolorum aspernatur saepe dolorem voluptates sapiente
            assumenda?
          </p>
          <div className={styles.seller}>
            <h2>About The Seller</h2>
            <div className={styles.user}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTssfcj1A3USUWOuPGnkgPUYSVDkWK1cp2KOQ&s"
                alt=""
              />
              <div className={styles.info}>
                <span>John Doe</span>
                <div className={styles.stars}>
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <span>5</span>
                  <button>Contact Me</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.items}>
              <div className={styles.item}>
                <span className={styles.title}>From</span>
                <span className={styles.desc}>Japan</span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Member since</span>
                <span className={styles.desc}>Aug 2022</span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Avg. response time</span>
                <span className={styles.desc}>4 hours</span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Last delivery</span>
                <span className={styles.desc}>1 day</span>
              </div>
              <div className={styles.item}>
                <span className={styles.title}>Languages</span>
                <span className={styles.desc}>English</span>
              </div>
            </div>
            <hr />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
              amet tempora perferendis quisquam ab, doloremque suscipit hic
              repudiandae consequuntur nam?
            </p>
          </div>
          <div className={styles.reviews}>
            <h2>Reviews</h2>
            <div className={styles.item}>
              <div className={styles.user}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTssfcj1A3USUWOuPGnkgPUYSVDkWK1cp2KOQ&s" alt="" />
                <div className={styles.info}>
                  <span>John Doe</span>
                  <div className={styles.country}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeZR1lnCe4br5qT32hFHtwwT1SXIbumPmR7g&s" alt="" />
                    <span>USA</span>
                  </div>
                </div>
              </div>
              <div className={styles.stars}>
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <span>5</span>
                  <button>Contact Me</button>
                </div>
            </div>
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};

export default Gig;
