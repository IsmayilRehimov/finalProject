import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import "./Review.scss";

const Review = ({ review }) => {
  const [helpful, setHelpful] = useState(null); // 'like' ya da 'dislike'

  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img
          src="/img/like.png"
          alt=""
          className={helpful === "like" ? "active" : ""}
          onClick={() => setHelpful("like")}
        />
        <span>Yes</span>
        <img
          src="/img/dislike.png"
          alt=""
          className={helpful === "dislike" ? "active" : ""}
          onClick={() => setHelpful("dislike")}
        />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
