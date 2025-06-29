import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const { data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () => newRequest.get(`/conversations/single/${id}`).then((res) => res.data),
  });

  const otherId =
    conversation && currentUser._id === conversation.sellerId
      ? conversation.buyerId
      : conversation?.sellerId;

  // Karşı taraf bilgisi, eğer state ile gelmediyse backend'den çek
  const { data: otherUser } = useQuery({
    queryKey: ["otherUser", otherId],
    queryFn: () => newRequest.get(`/users/${otherId}`).then((res) => res.data),
    enabled: !!otherId && !state?.img,
  });

  const displayName = state?.username || otherUser?.username || "Loading...";
  const displayImg = otherUser?.img || state?.img || "/img/noavatar.jpg";

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
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate(messageId);
    }
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; {displayName}
        </span>

        {isLoading ? (
          "Loading messages..."
        ) : error ? (
          "Error loading messages"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                
                <div className="profileSection">
                  <img
                    src={
                      m.userId === currentUser._id
                        ? currentUser.img || "/img/noavatar.jpg"
                        : displayImg
                    }
                    alt=""
                  />
                  {m.userId === currentUser._id && (
                    <button className="deleteBtn" onClick={() => handleDelete(m._id)}>
                      ✖
                    </button>
                  )}
                </div>

                <div className="messageContent">
                  <p>{m.desc}</p>
                </div>

              </div>
            ))}
          </div>
        )}

        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Write a message..." />
          <button type="submit" disabled={sendMutation.isLoading}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
