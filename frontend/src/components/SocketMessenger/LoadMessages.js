import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../store/csrf.js";

export default function LoadMessages({ chatRoomId }) {
  const [loadedMsgs, setLoadedMsgs] = useState([]);

  useEffect(() => {
    fetch(`/api/chatroom/${chatRoomId}/loadMessages`)
      .then((msgs) => {
        console.log("msgs", msgs.data);
        setLoadedMsgs(msgs.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      {loadedMsgs.length > 0 &&
        loadedMsgs.map((msg) => {
          console.log("msg", msg);
          return <p>msg</p>;
        })}
    </div>
  );
}
