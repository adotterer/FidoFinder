import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

export default function NotificationReel() {
  const { userId } = useParams();
  // const dispatch = useDispatch();
  const [liveSocket, setLiveSocket] = useState(null);
  // const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const socket = io(undefined, {
      query: {
        type: "notif",
        chatRoomId: null,
      },
    });
    setLiveSocket(socket);

    // TODO: THIS HAS TO BE IN A SEPARATE COMPONENT...

    socket.on(`notif_user${userId}`, (notification) => {
      // console.log("here is notification for room #", chatRoomId);
      console.log("notification", notification);
    });

    // socket.on(`chatRoom-${chatRoomId}`, (obj) => {
    //   console.log(obj);
    // });
    return () => {
      console.log("hello from return statement");
      socket.send("disconnect");
      socket.close();
    };
  }, []);
}
