import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./UserProfile.scss";
import GigCard from "../../components/gigCard/GigCard";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { FiMapPin, FiPhone, FiUser } from "react-icons/fi";

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

  // Calculate average rating with proper decimal places
  const validGigs = gigsData.filter((gig) => gig.starNumber > 0);
  const totalStars = validGigs.reduce((acc, gig) => acc + gig.totalStars, 0);
  const totalReviews = validGigs.reduce((acc, gig) => acc + gig.starNumber, 0);
  const averageRating = totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : null;

  // Render star rating component
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
    <div className="userProfile">
      {isLoading ? (
        <div className="loadingState">
          <div className="spinner"></div>
          <span>Loading profile...</span>
        </div>
      ) : error ? (
        <div className="errorState">
          <span>Error loading profile. Please try again.</span>
        </div>
      ) : (
        <div className="container">
          <div className="userInfo">
            <div className="profileHeader">
              <img
                src={userData.img || "/img/noavatar.jpg"}
                alt={userData.username}
                className="profilePic"
              />
              <div className="profileDetails">
                <h2>{userData.username}</h2>
                <p className="userDescription">
                  {userData.desc || "No description provided."}
                </p>
              </div>
            </div>

            <div className="userStats">
              <div className="statItem">
                <FiMapPin className="statIcon" />
                <div>
                  <span className="statLabel">From</span>
                  <span className="statValue">{userData.country || "Not specified"}</span>
                </div>
              </div>

              {userData.phone && (
                <div className="statItem">
                  <FiPhone className="statIcon" />
                  <div>
                    <span className="statLabel">Contact</span>
                    <span className="statValue">{userData.phone}</span>
                  </div>
                </div>
              )}

              {averageRating && (
                <div className="statItem">
                  <div className="ratingStars">
                    {renderStars(parseFloat(averageRating))}
                  </div>
                  <div>
                    <span className="statLabel">Rating</span>
                    <span className="statValue">
                      {averageRating} ({totalReviews} reviews)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="divider"></div>

          <div className="userGigs">
            <h2 className="sectionTitle">
              <FiUser className="titleIcon" />
              {userData.username}'s Services
            </h2>
            
            {isLoadingGigs ? (
              <div className="loadingState">
                <div className="spinner"></div>
                <span>Loading services...</span>
              </div>
            ) : errorGigs ? (
              <div className="errorState">
                <span>Error loading services. Please try again.</span>
              </div>
            ) : gigsData.length === 0 ? (
              <div className="emptyState">
                <span>No services found for this user.</span>
              </div>
            ) : (
              <div className="gigsGrid">
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