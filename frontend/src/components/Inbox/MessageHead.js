import { Link } from "react-router-dom";
import "./inbox.css";

export default function MessageHead([topMessage]) {
  const [otherUsers] = topMessage.otherUsers;

  return (
    <Link
      key={"inbox#" + topMessage.id}
      to={`/chatroom/${topMessage.chatRoomId}`}
    >
      <div
        className="inbox__messageHead"
        key={"inbox#" + topMessage.chatRoomId}
      >
        <div className="messageHead__avatar">
          {topMessage.avatarInfo && (
            <img src={topMessage.avatarInfo.URL} alt="avatar" />
          )}
        </div>
        <div className="messageHead__content">
          <h4>Your conversation with {otherUsers.username}:</h4>
          <div>
            <span>{topMessage.username}: </span>
            {topMessage.message}
          </div>
        </div>
      </div>
    </Link>
  );
}
