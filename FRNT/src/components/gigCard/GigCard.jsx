import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useFavorites } from "../../context/FavoritesContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { FiClock } from "react-icons/fi";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });

  const { favorites, toggleFavorite } = useFavorites();
  const liked = favorites.includes(item._id);

  const averageRating =
    item.starNumber > 0 ? (item.totalStars / item.starNumber).toFixed(1) : 0;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<IoStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<IoStarHalf key={i} className="star filled" />);
      } else {
        stars.push(<IoStarOutline key={i} className="star" />);
      }
    }

    return stars;
  };

  return (
    <div className="gigCard">
      <div className="cardTop">
        <Link to={`/gig/${item._id}`} className="imageLink">
          <img
            src={item.cover || "/img/noimage.jpg"}
            alt={item.title}
            className="cover"
            loading="lazy"
          />
          <div className="deliveryBadge">
            <FiClock className="clockIcon" />
            <span>
              {typeof item.deliveryTime === "number" && item.deliveryTime > 0
                ? `${item.deliveryTime} day delivery`
                : "N/A delivery"}
            </span>
          </div>
        </Link>

        <button
          className={`likeButton ${liked ? "liked" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(item._id);
          }}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
        >
          {liked ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
        </button>
      </div>

      <div className="cardContent">
        <Link to={`/gig/${item._id}`} className="gigLink">
          <div className="userInfo">
            {isLoading ? (
              <div className="userLoading">Loading...</div>
            ) : error ? (
              <div className="userError">Error</div>
            ) : (
              <>
                <img
                  src={data?.img || "/img/noavatar.jpg"}
                  alt={data?.username}
                  className="userAvatar"
                />
                <span className="username">{data?.username}</span>
              </>
            )}
          </div>

          <h3 className="gigTitle" title={item.title}>
            {item.title}
          </h3>
          <p className="gigDesc" title={item.desc}>
            {item.desc}
          </p>
        </Link>

        <div className="ratingInfo">
          <div className="stars">
            {renderStars(averageRating)}
            <span className="ratingValue">{averageRating}</span>
          </div>
          <span className="reviewCount">({item.starNumber || 0})</span>
        </div>
      </div>

      <div className="cardBottom">
        <div className="priceInfo">
          <span className="startingAt">Starting at</span>
          <span className="price">${item.price}</span>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
