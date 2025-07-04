import React, { useEffect, useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import GigCard from "../../components/gigCard/GigCard";
import { FiHeart, FiLoader, FiAlertCircle } from "react-icons/fi";
import "./Favorites.scss";

const Favorites = () => {
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [localFavorites, setLocalFavorites] = useState([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["favGigs", localFavorites],
    queryFn: () =>
      newRequest
        .get(`/gigs`, { params: { ids: localFavorites.join(",") } })
        .then((res) => res.data),
    enabled: localFavorites.length > 0,
  });

  useEffect(() => {
    if (!favoritesLoading && favorites.length > 0) {
      setLocalFavorites(favorites);
    }
  }, [favorites, favoritesLoading]);

  return (
    <div className="favoritesPage">
      <div className="container">
        <div className="header">
          <h1><FiHeart /> Favorite Gigs</h1>
          {!favoritesLoading && (
            <span className="count">{favorites.length} {favorites.length === 1 ? 'gig' : 'gigs'}</span>
          )}
        </div>

        {favoritesLoading ? (
          <div className="loading-state">
            <div className="spinner">
              <FiLoader className="loading-icon" />
            </div>
            <p>Loading your favorites...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="empty-state">
            <FiHeart className="empty-icon" />
            <p>You haven't liked any gigs yet</p>
            <Link to="/" className="browse-link">
              Browse gigs
            </Link>
          </div>
        ) : isLoading ? (
          <div className="loading-state">
            <div className="spinner">
              <FiLoader className="loading-icon" />
            </div>
            <p>Loading gig details...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <FiAlertCircle className="error-icon" />
            <p>Something went wrong loading your favorites</p>
            <button 
              className="retry-btn"
              onClick={() => refetch()}
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="gigs-grid">
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