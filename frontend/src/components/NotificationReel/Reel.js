import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./notifications.css";
import createChatRoomEvent from "../../utils/createChatRoomEvent";

export default function NotificationReel({ notifications }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  
  return (
    <div>
      {notifications &&
        notifications.map((notification, i) => {
          return (
            <div
              onClick={async (event) => {
                event.preventDefault();
                const chatRoomNumber = await createChatRoomEvent(
                  event,
                  sessionUser,
                  notification.user
                );
                return history.push(`/chatroom/${chatRoomNumber}`);
              }}
              key={`${notification.user.username}++${i}`}
            >
              {notification.user.username}: {notification.msg}
            </div>
          );
        })}
    </div>
  );
}
