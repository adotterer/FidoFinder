import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { BsBell, BsLock } from "react-icons/bs";
import "./notifications.css";
import NotificationReel from "./Reel";

export default function Notifications() {
  const [liveSocket, setLiveSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const [showNotification, setShowNotification] = useState(false);
  const [styleBell, setStyleBell] = useState({
    fontSize: "1.8rem",
    color: "white",
  });
  const [fadeout, setFadeout] = useState({ opacity: 100 });

  useEffect(() => {
    if (notifications.length > 0) {
      setFadeout({
        opacity: 100,
        transitionProperty: "opacity",
        transitionDuration: "2000ms",
      });
      setStyleBell({
        fontSize: "1.8rem",
        color: "yellow",
        transitionDuration: "1000ms",
        transitionProperty: "color",
      });
      setTimeout(() => {
        setStyleBell({
          fontSize: "1.8rem",
          color: "white",
          transitionDuration: "1000ms",
          transitionProperty: "color",
        });
        setFadeout({
          opacity: 0,
          transitionProperty: "opacity",
          transitionDuration: "1000ms",
        });
      }, 5000);
      setTimeout(() => {
        setShowNotification(false);
      }, 5001);
    }
  }, [notifications]);

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
        <span
          style={
            notifications.length > 0
              ? {
                  display: "block",
                  transitionProperty: "display",
                  transitionDuration: "1s",
                }
              : {
                  display: "none",
                }
          }
          className="mail-status"
        ></span>
        <BsBell onClick={openNotifs} id="bs__bell" style={styleBell} />
      </div>

      {notifications && showNotification && (
        <div style={fadeout} className={"div__notifications"}>
          <NotificationReel notifications={notifications} />
        </div>
      )}
    </div>
  );
}
