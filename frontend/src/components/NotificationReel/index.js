import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { BsBell } from "react-icons/bs";
import "./notifications.css";
import NotificationReel from "./Reel";

export default function Notifications() {
  const [liveSocket, setLiveSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const [showNotification, setShowNotification] = useState(false);

  const openNotifs = () => {
    if (showNotification || notifications.length === 0) return;
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
      setNotifications((notif) => [...notif, newNotification]);
      setShowNotification(true);
    });

    return () => {
      socket.send("disconnect");
      socket.close();
    };
  }, [sessionUser]);

  return (
    <div>
      <div>
        <BsBell
          id="bs__bell"
          style={{
            fontSize: "1.8rem",
          }}
          onClick={openNotifs}
        />
        <span
          class={`mail-status ${notifications.length === 0 ? "unread" : null}`}
          style={notifications.length === 0 ? { display: "hidden" } : null}
        ></span>
      </div>

      {notifications && showNotification && (
        <div className="div__notifications">
          <NotificationReel notifications={notifications} />
        </div>
      )}
    </div>
  );
}
