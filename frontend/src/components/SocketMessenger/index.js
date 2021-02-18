import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

export default function SocketMessenger() {
  const { chatRoomId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [msg, setMsg] = useState("");
  const [liveSocket, setLiveSocket] = useState(null);
  const [username, setUserName] = useState(sessionUser.username);

  function onSubmit(e) {
    e.preventDefault();
    liveSocket.emit("message", msg, sessionUser, chatRoomId);
  }

  useEffect(() => {
    const socket = io(undefined, {
      query: {
        type: "chat",
        chatRoomId,
      },
    });
    setLiveSocket(socket);
    socket.on("message", (obj) => {
      console.log(obj.msg);
    });
    return () => {
      console.log("hello from return statement");
      socket.close();
    };
  }, [username]);

  return (
    <>
      <h1>Helloooooo</h1>
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
