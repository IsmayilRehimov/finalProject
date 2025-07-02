import React, { useEffect, useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import GigCard from "../../components/gigCard/GigCard";
import "./Favorites.scss";

const Favorites = () => {
  const { favorites, loading } = useFavorites();
  const [localFavorites, setLocalFavorites] = useState([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["favGigs", localFavorites],
    queryFn: () =>
      newRequest
        .get(`/gigs`, { params: { ids: localFavorites.join(",") } })
        .then((res) => res.data),
    enabled: false,
  });

  useEffect(() => {
    if (!loading && favorites.length > 0) {
      setLocalFavorites(favorites); // favorites hazır gələndə local state-ə ötür
    }
  }, [favorites, loading]);

  useEffect(() => {
    if (localFavorites.length > 0) {
      refetch();
    }
  }, [localFavorites]);

  return (
    <div className="favoritesPage">
      <div className="container">
        <h1>Your Liked Gigs</h1>
        {loading ? (
          <p>Loading your favorites...</p>
        ) : favorites.length === 0 ? (
          <p>You haven't liked any gigs yet.</p>
        ) : isLoading ? (
          <p>Loading gigs...</p>
        ) : error ? (
          <p>Something went wrong.</p>
        ) : (
          <div className="cards">
            {data?.map((gig) => (
              <GigCard key={gig._id} item={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
