import { Link } from "react-router-dom";

export default function MessageHead([topMessage]) {
  const [otherUsers] = topMessage.otherUsers;
  return (
    <Link to={`/chatroom/${topMessage.chatRoomId}`}>
      <div key={"inbox#" + topMessage.chatRoomId}>
        <h4>Your conversation with {otherUsers.username}:</h4>
        <div>
          <span>{topMessage.username}: </span>
          {topMessage.message}
        </div>
        <hr />
      </div>
    </Link>
  );
}
