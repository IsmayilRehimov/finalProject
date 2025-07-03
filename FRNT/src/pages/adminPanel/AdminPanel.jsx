import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import "./AdminPanel.scss";

const AdminPanel = () => {
  const [view, setView] = useState("users");
  const [users, setUsers] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/notfound");
    }
  }, []);

  useEffect(() => {
    if (view === "users") {
      newRequest
        .get("/admin/users")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    } else if (view === "gigs") {
      newRequest
        .get("/admin/gigs")
        .then((res) => setGigs(res.data))
        .catch((err) => console.log(err));
    } else if (view === "orders") {
      newRequest
        .get("/admin/orders")
        .then((res) => setOrders(res.data))
        .catch((err) => console.log(err));
    } else if (view === "reviews") {
      newRequest
        .get("/admin/reviews")
        .then((res) => setReviews(res.data))
        .catch((err) => console.log(err));
    }
  }, [view]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      newRequest
        .delete(`/admin/user/${id}`)
        .then(() => setUsers(users.filter((u) => u._id !== id)))
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteGig = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      newRequest
        .delete(`/admin/gig/${id}`)
        .then(() => setGigs(gigs.filter((g) => g._id !== id)))
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      newRequest
        .delete(`/admin/order/${id}`)
        .then(() => setOrders(orders.filter((o) => o._id !== id)))
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      newRequest
        .delete(`/admin/review/${id}`)
        .then(() => setReviews(reviews.filter((r) => r._id !== id)))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="adminPanel">
      <h1>Admin Panel</h1>

      <div className="buttons">
        <button onClick={() => setView("users")} disabled={view === "users"}>
          Users
        </button>
        <button onClick={() => setView("gigs")} disabled={view === "gigs"}>
          Gigs
        </button>
        <button onClick={() => setView("orders")} disabled={view === "orders"}>
          Orders
        </button>
        <button
          onClick={() => setView("reviews")}
          disabled={view === "reviews"}
        >
          Reviews
        </button>
      </div>

      {view === "users" && (
        <ul>
          {users
            .filter((user) => user._id !== currentUser._id) // Kendini listeleme
            .map((user) => (
              <li key={user._id}>
                <span>
                  {user.username} - {user.email}{" "}
                  {user.role === "admin" && "(Admin)"}
                </span>
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </li>
            ))}
        </ul>
      )}

      {view === "gigs" && (
        <ul>
          {gigs.map((gig) => (
            <li key={gig._id}>
              <span>
                <Link to={`/gig/${gig._id}`} className="gigLink">
                  {gig.title}
                </Link>{" "}
                - ${gig.price}
              </span>
              <button onClick={() => handleDeleteGig(gig._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {view === "orders" && (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <span>
                {order.title} - ${order.price} - Buyer: {order.buyerId} - Seller:{" "}
                {order.sellerId}
              </span>
              <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {view === "reviews" && (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <span>
                Gig: {review.gigId} - User: {review.userId} - Stars:{" "}
                {review.star} - {review.desc}
              </span>
              <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
