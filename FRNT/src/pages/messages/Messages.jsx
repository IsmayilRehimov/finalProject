import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import { FiMessageSquare, FiUser, FiClock, FiCheck } from "react-icons/fi";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, error, data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
  });

  // Get all users in conversations
  const { data: users } = useQuery({
    queryKey: ["conversationUsers"],
    queryFn: async () => {
      if (!conversations) return [];
      const userIds = conversations.map(c => 
        currentUser.isSeller ? c.buyerId : c.sellerId
      );
      const uniqueIds = [...new Set(userIds)];
      const res = await newRequest.post("/users/batch", { ids: uniqueIds });
      return res.data;
    },
    enabled: !!conversations,
  });

  const markAsRead = useMutation({
    mutationFn: (id) => newRequest.put(`/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    markAsRead.mutate(id);
  };

  const getUsername = (id) => {
    const user = users?.find((u) => u._id === id);
    return user ? user.username : "Unknown User";
  };

  const getUserImg = (id) => {
    const user = users?.find((u) => u._id === id);
    return user?.img || "/img/noavatar.jpg";
  };

  useEffect(() => {
    // Refresh conversations every 30 seconds
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["conversations"]);
    }, 30000);
    return () => clearInterval(interval);
  }, [queryClient]);

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1><FiMessageSquare /> Messages</h1>
          {!isLoading && !error && (
            <span className="count">{conversations?.length} conversations</span>
          )}
        </div>

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading conversations...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>Error loading conversations. Please try again.</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : conversations?.length === 0 ? (
          <div className="empty">
            <p>No conversations yet</p>
            <Link to="/">Browse services</Link>
          </div>
        ) : (
          <div className="conversation-list">
            {conversations?.map((c) => {
              const otherId = currentUser.isSeller ? c.buyerId : c.sellerId;
              const isUnread = (currentUser.isSeller && !c.readBySeller) || 
                              (!currentUser.isSeller && !c.readByBuyer);
              
              return (
                <div 
                  className={`conversation-card ${isUnread ? 'unread' : ''}`}
                  key={c.id}
                  onClick={() => {
                    navigate(`/message/${c.id}`, {
                      state: { 
                        username: getUsername(otherId),
                        img: getUserImg(otherId)
                      }
                    });
                    if (isUnread) handleRead(c.id);
                  }}
                >
                  <div className="avatar">
                    <img src={getUserImg(otherId)} alt={getUsername(otherId)} />
                  </div>
                  <div className="content">
                    <div className="user-info">
                      <h3>{getUsername(otherId)}</h3>
                      <span className="time">
                        <FiClock /> {moment(c.updatedAt).fromNow()}
                      </span>
                    </div>
                    <div className="message-preview">
                      {c?.lastMessage?.substring(0, 80) || "No messages yet"}...
                    </div>
                  </div>
                  <div className="status">
                    {isUnread ? (
                      <button 
                        className="mark-read-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRead(c.id);
                        }}
                      >
                        <FiCheck /> Mark as read
                      </button>
                    ) : (
                      <FiCheck className="read-icon" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;