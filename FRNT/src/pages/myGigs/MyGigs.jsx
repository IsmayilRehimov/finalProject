import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { FiPlus, FiTrash2, FiEdit2, FiDollarSign, FiShoppingCart } from "react-icons/fi";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="header">
          <div className="title">
            <h1><FiShoppingCart /> My Gigs</h1>
            {!isLoading && !error && data && (
              <span className="count">{data.length} {data.length === 1 ? 'gig' : 'gigs'}</span>
            )}
          </div>
          {currentUser.isSeller && (
            <Link to="/add" className="add-button">
              <FiPlus /> Add New Gig
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your gigs...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Error loading gigs. Please try again.</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : data?.length === 0 ? (
          <div className="empty-state">
            <p>You don't have any gigs yet.</p>
            {currentUser.isSeller && (
              <Link to="/add" className="add-button">
                <FiPlus /> Create Your First Gig
              </Link>
            )}
          </div>
        ) : (
          <div className="gigs-grid">
            {data.map((gig) => (
              <div className="gig-card" key={gig._id}>
                <Link to={`/gig/${gig._id}`} className="gig-image-link">
                  <img 
                    src={gig.cover || "/img/noimage.jpg"} 
                    alt={gig.title} 
                    className="gig-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/img/noimage.jpg";
                    }}
                  />
                </Link>
                <div className="gig-details">
                  <Link to={`/gig/${gig._id}`} className="gig-title">
                    {gig.title}
                  </Link>
                  <div className="gig-meta">
                    <div className="price">
                      <FiDollarSign /> {gig.price.toFixed(2)}
                    </div>
                    <div className="sales">
                      {gig.sales} {gig.sales === 1 ? 'sale' : 'sales'}
                    </div>
                  </div>
                </div>
                <div className="gig-actions">
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(gig._id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyGigs;