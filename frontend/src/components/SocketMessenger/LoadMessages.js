import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../store/csrf.js";

function Message({ message, i }) {
  console.log(message, "message");
  return (
    <div className={``} key={i + message}>
      @{message.User.username}: {message.message}
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

    console.log("MAPPED USER NAMES", mappedUserNames);
  }
  return (
    <div>
      {loadedMsgs.length > 0 &&
        loadedMsgs.slice(0, 16).map((msg) => {
          const classI = mappedUserNames.indexOf(msg.User.username);
          return <Message message={msg} classI={classI} />;
        })}
      {messageThread.length > 0 &&
        messageThread.map((message, i) => {
          return <Message message={message} i={i} />;
        })}
    </div>
  );
}
