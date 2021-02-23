// import { set } from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import io from "socket.io-client";
import LoadMessages from "./LoadMessages";

export default function SocketMessenger() {
  const { chatRoomId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [msg, setMsg] = useState("");
  const [messageThread, setMessageThread] = useState([]);
  const [liveSocket, setLiveSocket] = useState(null);
  const [username, setUserName] = useState(sessionUser.username);

  function onSubmit(e) {
    e.preventDefault();
    liveSocket.emit("message", msg, chatRoomId);
    setMsg("");
  }

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

    // TODO: THIS HAS TO BE IN A SEPARATE COMPONENT...

    // socket.on(`notif_room${chatRoomId}`, (notification) => {
    //   console.log("here is notification for room #", chatRoomId);
    //   console.log("notification", notification);
    // });

    // socket.on(`chatRoom-${chatRoomId}`, (obj) => {
    //   console.log(obj);
    // });
    return () => {
      console.log("hello from return statement");
      socket.send("disconnect");
      socket.close();
    };
  }, [username]);

  if (!username) return <Redirect to="/" />;

  return (
    <>
      <h1>FidoMessenger</h1>
      <div>
        <LoadMessages chatRoomId={chatRoomId} />
        {messageThread.length >= 1
          ? messageThread.map((message, i) => {
              return (
                <p key={i + "+" + message.user.username}>
                  {message.user.username}: {message.msg}
                </p>
              );
            })
          : "no messages."}
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </>
  );
}
