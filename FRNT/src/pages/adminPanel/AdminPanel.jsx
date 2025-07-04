import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import "./AdminPanel.scss";
import { FiUsers, FiBriefcase, FiShoppingCart, FiStar, FiTrash2, FiEye } from "react-icons/fi";

const AdminPanel = () => {
  const [view, setView] = useState("users");
  const [users, setUsers] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/notfound");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = `/admin/${view}`;
        if (searchTerm) {
          endpoint += `?search=${searchTerm}`;
        }
        
        const res = await newRequest.get(endpoint);
        
        switch (view) {
          case "users":
            setUsers(res.data);
            break;
          case "gigs":
            setGigs(res.data);
            break;
          case "orders":
            setOrders(res.data);
            break;
          case "reviews":
            setReviews(res.data);
            break;
          default:
            break;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [view, searchTerm]);

  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        await newRequest.delete(`/admin/${type}/${id}`);
        
        switch (type) {
          case "user":
            setUsers(users.filter((u) => u._id !== id));
            break;
          case "gig":
            setGigs(gigs.filter((g) => g._id !== id));
            break;
          case "order":
            setOrders(orders.filter((o) => o._id !== id));
            break;
          case "review":
            setReviews(reviews.filter((r) => r._id !== id));
            break;
          default:
            break;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getViewIcon = () => {
    switch (view) {
      case "users":
        return <FiUsers className="view-icon" />;
      case "gigs":
        return <FiBriefcase className="view-icon" />;
      case "orders":
        return <FiShoppingCart className="view-icon" />;
      case "reviews":
        return <FiStar className="view-icon" />;
      default:
        return null;
    }
  };

  const filteredData = () => {
    const data = view === "users" ? users : 
                view === "gigs" ? gigs : 
                view === "orders" ? orders : 
                reviews;
    
    if (!searchTerm) return data;
    
    return data.filter(item => {
      if (view === "users") {
        return item.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
               item.email.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (view === "gigs") {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (view === "orders") {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               (item.buyerId && item.buyerId.toLowerCase().includes(searchTerm.toLowerCase())) ||
               (item.sellerId && item.sellerId.toLowerCase().includes(searchTerm.toLowerCase()));
      } else if (view === "reviews") {
        return item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    });
  };

  return (
    <div className="adminPanel">
      <div className="admin-header">
        <h1>
          {getViewIcon()}
          Admin Dashboard
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder={`Search ${view}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-nav">
        <button 
          onClick={() => setView("users")} 
          className={view === "users" ? "active" : ""}
        >
          <FiUsers /> Users
        </button>
        <button 
          onClick={() => setView("gigs")} 
          className={view === "gigs" ? "active" : ""}
        >
          <FiBriefcase /> Gigs
        </button>
        <button 
          onClick={() => setView("orders")} 
          className={view === "orders" ? "active" : ""}
        >
          <FiShoppingCart /> Orders
        </button>
        <button 
          onClick={() => setView("reviews")} 
          className={view === "reviews" ? "active" : ""}
        >
          <FiStar /> Reviews
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading {view}...</p>
          </div>
        ) : (
          <>
            <div className="stats-card">
              <p>Showing {filteredData().length} {view}</p>
            </div>
            
            {filteredData().length === 0 ? (
              <div className="no-results">
                <p>No {view} found</p>
              </div>
            ) : (
              <div className="data-grid">
                {view === "users" && (
                  filteredData()
                    .filter((user) => user._id !== currentUser._id)
                    .map((user) => (
                      <div key={user._id} className="data-card">
                        <div className="card-content">
                          <h3>{user.username}</h3>
                          <p>{user.email}</p>
                          {user.role === "admin" && (
                            <span className="badge admin">Admin</span>
                          )}
                        </div>
                        <div className="card-actions">
                          <button 
                            onClick={() => handleDelete("user", user._id)}
                            className="delete-btn"
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </div>
                    ))
                )}

                {view === "gigs" && (
                  filteredData().map((gig) => (
                    <div key={gig._id} className="data-card">
                      <div className="card-content">
                        <h3>{gig.title}</h3>
                        <p>${gig.price}</p>
                        <p className="description">{gig.desc}</p>
                      </div>
                      <div className="card-actions">
                        <Link to={`/gig/${gig._id}`} className="view-btn">
                          <FiEye /> View
                        </Link>
                        <button 
                          onClick={() => handleDelete("gig", gig._id)}
                          className="delete-btn"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {view === "orders" && (
                  filteredData().map((order) => (
                    <div key={order._id} className="data-card">
                      <div className="card-content">
                        <h3>{order.title}</h3>
                        <p>${order.price}</p>
                        <div className="order-details">
                          <span>Buyer: {order.buyerId?.slice(0, 8)}...</span>
                          <span>Seller: {order.sellerId?.slice(0, 8)}...</span>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button 
                          onClick={() => handleDelete("order", order._id)}
                          className="delete-btn"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {view === "reviews" && (
                  filteredData().map((review) => (
                    <div key={review._id} className="data-card">
                      <div className="card-content">
                        <div className="review-header">
                          <div className="stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={i < review.star ? "filled" : ""}>★</span>
                            ))}
                          </div>
                        </div>
                        <p className="review-text">{review.desc}</p>
                        <div className="review-meta">
                          <span>Gig: {review.gigId?.slice(0, 8)}...</span>
                          <span>User: {review.userId?.slice(0, 8)}...</span>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button 
                          onClick={() => handleDelete("review", review._id)}
                          className="delete-btn"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;