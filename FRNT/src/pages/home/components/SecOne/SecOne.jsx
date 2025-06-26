import React from "react";
import "./SecOne.scss";

const SecOne = () => {
  return (
    <div className="secOne">
      <video autoPlay loop muted className="backgroundVideo">
        <source src="./img/video3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <div className="content">
          <h1>Work smarter. Freelance anywhere, anytime.</h1>
          <p>
            Join the largest freelancing marketplace and find the job you love.
          </p>

          <div className="placeholders">
            <span>✔ Safe & Secure Platform</span>
            <span>✔ 24/7 Customer Support</span>
            <span>✔ Top Rated Services</span>
          </div>
        </div>

        <div className="trustedBy">
          <span>Trusted by:</span>
          <div className="logos">
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg"
              alt="Meta"
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg"
              alt="Google"
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg"
              alt="Netflix"
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg"
              alt="P&G"
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.d398de5.svg"
              alt="Paypal"
            />
            <img
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg"
              alt="Payoneer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecOne;
