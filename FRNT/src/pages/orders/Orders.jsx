import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { FiMessageCircle, FiShoppingBag, FiLoader, FiAlertCircle, FiExternalLink } from "react-icons/fi";
import moment from "moment";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
    refetchInterval: 60000,
  });

  const handleGigRedirect = (gigId) => {
    navigate(`/gig/${gigId}`);
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="header">
          <div className="title">
            <FiShoppingBag className="icon" />
            <h1>My Orders</h1>
          </div>
          <div className="stats">
            {!isLoading && !error && (
              <div className="stats-container">
                <span className="count">
                  {data.length} {data.length === 1 ? "order" : "orders"}
                </span>
                {data.filter((order) => !order.isCompleted).length > 0 && (
                  <span className="pending">
                    {data.filter((order) => !order.isCompleted).length} pending
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner">
              <FiLoader className="loading-icon" />
            </div>
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <FiAlertCircle className="error-icon" />
            <p>Error loading orders. Please try again.</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-state">
            <p>You don't have any orders yet.</p>
            <Link to="/" className="browse-link">
              Browse services
            </Link>
          </div>
        ) : (
          <div className="orders-grid">
            {data.map((order) => (
              <div
                className={`order-card ${order.isCompleted ? "completed" : ""}`}
                key={order._id}
              >
                <Link to={`/gig/${order.gigId}`} className="gig-link">
                  <img
                    src={order.img || "/img/noimage.jpg"}
                    alt={order.title}
                    className="gig-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/img/noimage.jpg";
                    }}
                  />
                  {order.isCompleted && (
                    <div className="completed-badge">Completed</div>
                  )}
                </Link>
                <div className="order-details">
                  <Link to={`/gig/${order.gigId}`} className="gig-title">
                    {order.title}
                  </Link>
                  <div className="meta">
                    <span className="price">${order.price.toFixed(2)}</span>
                    <span className="date">
                      Ordered {moment(order.createdAt).fromNow()}
                    </span>
                    {order.deliveryDate && !order.isCompleted && (
                      <span className="delivery-date">
                        Due {moment(order.deliveryDate).fromNow()}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="gig-redirect-btn"
                  onClick={() => handleGigRedirect(order.gigId)}
                  title="View gig details"
                >
                  <FiExternalLink className="redirect-icon" />
                  <span>View Gig</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;