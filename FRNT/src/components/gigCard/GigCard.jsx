import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useFavorites } from "../../context/FavoritesContext";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });

  const { favorites, toggleFavorite } = useFavorites();
  const liked = favorites.some((f) => f._id === item._id);

  const averageRating =
    item.starNumber > 0 ? (item.totalStars / item.starNumber).toFixed(1) : 0;

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover || "/img/noimage.jpg"} alt="gig" />

        <div className="info">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="user" />
              <span>{data.username}</span>
            </div>
          )}

          <p className="desc">{item.desc}</p>

          <div className="star">
            <img src="/img/star.png" alt="star" />
            <span>{averageRating}</span>
            <span className="count">({item.starNumber || 0})</span>
          </div>
        </div>

        <hr />

        <div className="detail">
          <img
            src="/img/heart.png"
            alt="like"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(item);
            }}
            className={liked ? "liked" : ""}
          />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
