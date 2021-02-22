import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import io from "socket.io-client";

export default function NotificationReel() {
  // const { userId } = useParams();
  // console.log("userId", userId);
  // const dispatch = useDispatch();
  const [liveSocket, setLiveSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  useEffect(() => {
    const socket = io(undefined, {
      query: {
        type: "notif",
        chatRoomId: null,
      },
    });
    setLiveSocket(socket);

    socket.on("notification", (newNotification) => {
      console.log("RECEIVING NOTIFICATION");
      // console.log("here is notification for room #", chatRoomId);
      setNotifications((notif) => [...notif, newNotification]);
    });

    // socket.on(`chatRoom-${chatRoomId}`, (obj) => {
    //   console.log(obj);
    // });
    return () => {
      socket.send("disconnect");
      socket.close();
    };
  }, [sessionUser]);

  return (
    <div>
      <h1>Notifications: </h1>
      {notifications &&
        notifications.map((notification, i) => {
          return (
            <div key={`${notification.user.username}++${i}`}>
              {notification.user.username} : {notification.msg}
            </div>
          );
        })}
    </div>
  );
}
