import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect, Link } from "react-router-dom";
import io from "socket.io-client";
import LoadMessages from "./LoadMessages";
import "./chatroom.css";

export default function SocketMessenger() {
  const { chatRoomId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [msg, setMsg] = useState("");
  const [messageThread, setMessageThread] = useState([]);
  const [liveSocket, setLiveSocket] = useState(null);

  const [authorizedUsers, setAuthorizedUsers] = useState();

  function onSubmit(e) {
    e.preventDefault();
    console.log(chatRoomId, "<sending chatRoomId");
    liveSocket.emit("message", msg, chatRoomId);
    setMsg("");
  }

  useEffect(() => {
    if (!authorizedUsers) {
      return fetch(`/api/chatroom/${chatRoomId}/auth`)
        .then((res) => res.json())
        .then((authUsers) => setAuthorizedUsers(authUsers));
    }
  }, [authorizedUsers, chatRoomId]);

  useEffect(() => {
    const socket = io(undefined, {
      query: {
        type: "chat",
        payload: chatRoomId,
      },
    });
    setLiveSocket(socket);

    socket.on("broadcast message to all users", (message) => {
      setMessageThread((oldThread) => [...oldThread, message]);
    });

    return () => {
      socket.send("disconnect");
      socket.close();
    };
  }, [sessionUser, chatRoomId]);

  if (
    !sessionUser
    // !authorizedUsers
    // !authorizedUsers.find((authUser) => authUser.id === sessionUser.id)
  ) {
    return <Redirect to="/" />;
  } else if (
    authorizedUsers &&
    !!authorizedUsers.find((authUser) => authUser.id === sessionUser.id)
  ) {
    return (
      <div className="div__chatSession">
        <div className="div__authorizedUsers">
          {authorizedUsers ? (
            authorizedUsers.map((user, i) => {
              return (
                <Link key={`@${user.username}`} to={`/user/${user.id}`}>
                  <div className={`div__chatUsername div__username${i}`}>
                    @{user.username}
                  </div>
                </Link>
              );
            })
          ) : (
            <div>Loading....</div>
          )}
        </div>
        <div>
          <LoadMessages
            authorizedUsers={authorizedUsers}
            messageThread={messageThread}
            chatRoomId={chatRoomId}
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="div__msgSend">
            <input
              type="text"
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />

            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div>Loading....</div>;
  }
}
