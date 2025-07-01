import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import GigCard from "../../components/gigCard/GigCard";
import "./Favorites.scss"

const Favorites = () => {
  const { favorites } = useFavorites();

  const { data, isLoading, error } = useQuery({
    queryKey: ["favGigs", favorites],
    queryFn: () =>
      newRequest
        .get(`/gigs`, { params: { ids: favorites.join(",") } })
        .then((res) => res.data),
    enabled: favorites.length > 0,
  });

  return (
    <div className="favoritesPage">
      <div className="container">
        <h1>Your Liked Gigs</h1>
        {favorites.length === 0 ? (
          <p>You haven't liked any gigs yet.</p>
        ) : isLoading ? (
          <p>Loading your favorites...</p>
        ) : error ? (
          <p>Something went wrong.</p>
        ) : (
          <div className="cards">
            {data.map((gig) => (
              <GigCard key={gig._id} item={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
