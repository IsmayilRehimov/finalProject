import { createContext, useContext, useState, useEffect } from "react";
import newRequest from "../utils/newRequest";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Yükləmə izləmək üçün

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await newRequest.get("/favorites");
        const favoriteGigIds = res.data.map((f) => f.gigId);
        setFavorites(favoriteGigIds);
      } catch (err) {
        console.error("Error loading favorites:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (gigId) => {
  try {
    if (favorites?.includes(gigId)) {
      await newRequest.delete(`/favorites/${gigId}`);
      setFavorites((prev) => (Array.isArray(prev) ? prev.filter((id) => id !== gigId) : []));
    } else {
      await newRequest.post(`/favorites`, { gigId });
      setFavorites((prev) => (Array.isArray(prev) ? [...prev, gigId] : [gigId]));
    }
  } catch (err) {
    console.error("Error toggling favorite:", err.response?.data || err.message);
  }
};


  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
