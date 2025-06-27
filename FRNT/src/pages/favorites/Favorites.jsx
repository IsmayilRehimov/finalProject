import React from "react";
import "./Favorites.scss";
import { useFavorites } from "../../context/FavoritesContext";
import GigCard from "../../components/gigCard/GigCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favoritesPage">
      <div className="container">
        <h1>Your Liked Gigs</h1>
        {favorites?.length === 0 ? (
          <p>You haven't liked any gigs yet.</p>
        ) : (
          <div className="cards">
            {favorites.map((gig) => (
              <GigCard key={gig._id} item={gig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;