import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../store/csrf.js";

export default function LoadMessages({ chatRoomId }) {
  const [loadedMsgs, setLoadedMsgs] = useState([]);

  useEffect(() => {
    fetch(`/api/chatroom/${chatRoomId}/loadMessages`)
      .then((msgs) => {
        return setLoadedMsgs(msgs.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      {loadedMsgs.length > 0 &&
        loadedMsgs.slice(0, 16).map((msg, i) => {
          console.log("msg", msg);
          return (
            <p key={i + msg}>
              {msg.User.username}: {msg.message}
            </p>
          );
        })}
    </div>
  );
}
