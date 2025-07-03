import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useFavorites } from "../../context/FavoritesContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

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

  return (
    <div className="gigCard">
      <Link to={`/gig/${item._id}`} className="cardTop">
        <img src={item.cover || "/img/noimage.jpg"} alt="gig" className="cover" />
        <div className="userInfo">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : (
            <>
              <img src={data?.img || "/img/noavatar.jpg"} alt="user" />
              <span>{data?.username}</span>
            </>
          )}
        </div>
      </Link>

      <div className="cardContent">
        <p className="desc">{item.desc}</p>

        <div className="star">
          <img src="/img/star.png" alt="star" />
          <span>{averageRating}</span>
          <span className="count">({item.starNumber || 0})</span>
        </div>
      </div>

      <div className="cardBottom">
        <div className={`likeIcon ${liked ? "liked" : ""}`} onClick={() => toggleFavorite(item._id)}>
          {liked ? (
            <AiFillHeart size={22} />
          ) : (
            <AiOutlineHeart size={22} />
          )}
        </div>
        <div className="price">
          <span>Starting at</span>
          <h2>${item.price}</h2>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
