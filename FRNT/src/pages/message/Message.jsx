import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
import { FiSend, FiTrash2, FiChevronLeft, FiUser } from "react-icons/fi";
import moment from "moment";

const Message = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
    refetchInterval: 5000, // Auto-refresh every 5 seconds
  });

  const { data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () => newRequest.get(`/conversations/single/${id}`).then((res) => res.data),
  });

  const otherId =
    conversation && currentUser._id === conversation.sellerId
      ? conversation.buyerId
      : conversation?.sellerId;

  const { data: otherUser } = useQuery({
    queryKey: ["otherUser", otherId],
    queryFn: () => newRequest.get(`/users/${otherId}`).then((res) => res.data),
    enabled: !!otherId && !state?.img,
  });

  const displayName = state?.username || otherUser?.username || "User";
  const displayImg = otherUser?.img || state?.img || null;

  const sendMutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (messageId) => newRequest.delete(`/messages/${messageId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = e.target[0].value.trim();
    if (!messageText) return;

    sendMutation.mutate({
      conversationId: id,
      desc: messageText,
    });
    e.target[0].value = "";
  };

  const handleDelete = (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate(messageId);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div className="message">
      <div className="container">
        <div className="header">
          <Link to="/messages" className="back-button">
            <FiChevronLeft className="icon" /> Messages
          </Link>
          <div className="user-info">
            {displayImg ? (
              <img src={displayImg} alt={displayName} className="avatar" />
            ) : (
              <div className="avatar-placeholder">
                <FiUser className="icon" />
              </div>
            )}
            <h2>{displayName}</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>Error loading messages. Please try again.</p>
          </div>
        ) : (
          <div className="messages-container">
            <div className="messages">
              {data.length === 0 ? (
                <div className="no-messages">
                  <p>Start your conversation with {displayName}</p>
                </div>
              ) : (
                data.map((m) => (
                  <div
                    className={`message-bubble ${m.userId === currentUser._id ? "owner" : ""}`}
                    key={m._id}
                  >
                    <div className="message-header">
                      {m.userId !== currentUser._id && (
                        displayImg ? (
                          <img src={displayImg} alt={displayName} className="avatar" />
                        ) : (
                          <div className="avatar-placeholder">
                            <FiUser className="icon" />
                          </div>
                        )
                      )}
                      <span className="timestamp">{moment(m.createdAt).format('h:mm A')}</span>
                    </div>
                    <div className="message-content">
                      <p>{m.desc}</p>
                      {m.userId === currentUser._id && (
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(m._id)}
                          title="Delete message"
                        >
                          <FiTrash2 className="icon" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <form className="message-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <textarea
              placeholder="Type your message here..."
              rows="1"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <button type="submit" disabled={sendMutation.isLoading}>
              <FiSend className="icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;