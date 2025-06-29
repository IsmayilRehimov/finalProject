import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // Sohbetleri çekiyoruz
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
  });

  // Karşı taraf kullanıcı isimlerini topluca çekiyoruz
  const { data: userList } = useQuery({
    queryKey: ["conversationUsers"],
    queryFn: async () => {
      if (!data) return [];
      const ids = data.map((c) => currentUser.isSeller ? c.buyerId : c.sellerId);
      const uniqueIds = [...new Set(ids)];
      const res = await newRequest.post("/users/batch", { ids: uniqueIds });
      return res.data;
    },
    enabled: !!data,
  });

  // Okundu olarak işaretleme işlemi
  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  // Id'ye göre kullanıcı adını buluyoruz
  const getUsername = (id) => {
    const user = userList?.find((u) => u._id === id);
    return user ? user.username : id;
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error loading conversations"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => {
                const otherId = currentUser.isSeller ? c.buyerId : c.sellerId;
                return (
                  <tr
                    className={
                      ((currentUser.isSeller && !c.readBySeller) ||
                        (!currentUser.isSeller && !c.readByBuyer)) && "active"
                    }
                    key={c.id}
                  >
                    <td>{getUsername(otherId)}</td>
                    <td>
                      <Link
                        to={`/message/${c.id}`}
                        state={{ username: getUsername(otherId) }}
                        className="link"
                      >
                        {c?.lastMessage?.substring(0, 100) || "No message yet"}...
                      </Link>
                    </td>
                    <td>{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      {((currentUser.isSeller && !c.readBySeller) ||
                        (!currentUser.isSeller && !c.readByBuyer)) && (
                        <button onClick={() => handleRead(c.id)}>Mark as Read</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
