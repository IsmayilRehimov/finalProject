import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFoundPage">
      <div className="content">
        <img
          src="./img/notFound.jpg"
          alt="Not Found"
          className="notFoundImage"
        />
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="homeButton">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
