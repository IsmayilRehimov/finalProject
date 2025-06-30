import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./UserProfile.scss";
import GigCard from "../../components/gigCard/GigCard";

function UserProfile() {
  const { id } = useParams();

  const { isLoading, error, data: userData } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () =>
      newRequest.get(`/users/${id}`).then((res) => res.data),
  });

  const {
    isLoading: isLoadingGigs,
    error: errorGigs,
    data: gigsData = [],
  } = useQuery({
    queryKey: ["userGigs", id],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${id}`).then((res) => res.data),
  });

  // Ortalama ulduz hesablanması - sadəcə rəy olanlar üçün
  const validGigs = gigsData.filter((gig) => gig.starNumber > 0);
  const totalStars = validGigs.reduce((acc, gig) => acc + gig.totalStars, 0);
  const totalReviews = validGigs.reduce((acc, gig) => acc + gig.starNumber, 0);

  const averageRating =
    totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : null;

  return (
    <div className="userProfile">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="userInfo">
            <img
              src={userData.img || "/img/noavatar.jpg"}
              alt="profile"
              className="profilePic"
            />
            <div className="details">
              <h2>{userData.username}</h2>
              <p>{userData.desc || "No description provided."}</p>
              <div className="additionalInfo">
                <span><b>Country:</b> {userData.country}</span>
                {userData.phone && <span><b>Phone:</b> {userData.phone}</span>}
                {averageRating && (
                  <div className="averageRating">
                    <img src="/img/star.png" alt="star" style={{ width: "16px", marginRight: "5px" }} />
                    <span><b>Average Rating:</b> {averageRating} ({totalReviews} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <hr />

          <div className="userGigs">
            <h2>{userData.username}'s Gigs</h2>
            {isLoadingGigs ? (
              "Loading gigs..."
            ) : errorGigs ? (
              "Could not load gigs!"
            ) : gigsData.length === 0 ? (
              <p>No gigs found for this user.</p>
            ) : (
              <div className="gigsList">
                {gigsData.map((gig) => (
                  <GigCard item={gig} key={gig._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
