import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { BsBell } from "react-icons/bs";
import "./notifications.css";
import NotificationReel from "./Reel";

export default function Notification() {
  const [liveSocket, setLiveSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const [showNotification, setShowNotification] = useState(false);

  const openNotifs = () => {
    if (showNotification) return;
    setShowNotification(true);
  };

  useEffect(() => {
    if (!showNotification) return;

    const closeNotif = () => {
      setShowNotification(false);
    };

    document.addEventListener("click", closeNotif);

    return () => document.removeEventListener("click", closeNotif);
  }, [showNotification]);

  useEffect(() => {
    const socket = io(undefined, {
      query: {
        type: "notif",
        chatRoomId: null,
      },
    });
    setLiveSocket(socket);

    socket.on("notification", (newNotification) => {
      // console.log("RECEIVING NOTIFICATION");
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
      <div>
        <h1>
          <BsBell onClick={openNotifs} />
        </h1>
      </div>

      {notifications && showNotification && (
        <div className="div__notifications">
          <NotificationReel notifications={notifications} />
        </div>
      )}
    </div>
  );
}
