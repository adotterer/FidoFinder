import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../store/csrf.js";
import "./chatroom.css";

function Message({ message, classI }) {
  return (
    <div
      className={`div__messageBubble div__username${classI}`}
      key={classI + message}
    >
      <span className="span__username-bold">{message.User.username}:</span>
      <br />
      {message.message}
    </div>
  );
}

export default function LoadMessages({
  authorizedUsers,
  messageThread,
  chatRoomId,
}) {
  const [loadedMsgs, setLoadedMsgs] = useState([]);

  useEffect(() => {
    fetch(`/api/chatroom/${chatRoomId}/loadMessages`)
      .then((msgs) => {
        return setLoadedMsgs(msgs.data);
      })
      .catch((e) => console.error(e));
  }, []);

  let mappedUserNames;
  if (authorizedUsers) {
    mappedUserNames = authorizedUsers.map((user) => {
      return user.username;
    });
  }
  return (
    <div>
      {loadedMsgs.length > 0 &&
        mappedUserNames &&
        loadedMsgs.slice(loadedMsgs.length - 16).map((msg) => {
          const classI = mappedUserNames.indexOf(msg.User.username);
          return <Message message={msg} classI={classI} />;
        })}
      {messageThread.length > 0 &&
        mappedUserNames &&
        messageThread.map((message, i) => {
          const classI = mappedUserNames.indexOf(message.User.username);
          return <Message message={message} classI={classI} />;
        })}
    </div>
  );
}
