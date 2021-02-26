import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import UserList from "../UserList";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiSittingDog } from "react-icons/gi";
import createChatRoomEvent from "../../utils/createChatRoomEvent";
import "./googlemap.css";

function UserDetailsBubble({ user }) {
  return (
    <div className="div__userDetailBubble">
      <div className="div__bubbleUsername">{user.username}</div>
      <Link to={`/user/${user.id}`}>
        <div className="div__bubbleUserStatus">{user.status}</div>
      </Link>
    </div>
  );
}

function Pin({ pinUser }) {
  const history = useHistory();
  const [showBubble, setShowBubble] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        if (showBubble) setShowBubble(false);
      }}
    >
      {showBubble && <UserDetailsBubble user={pinUser} />}
      {/* <Link key={pinUser.id} to={`/user/${pinUser.id}`}> */}
      <GiSittingDog
        onClick={(e) => {
          // e.preventDefault();
          setShowBubble(true);
        }}
        style={{ color: "black", fontSize: "3em" }}
      />
      {/* </Link> */}
    </div>
  );
}

function SimpleMap({ center, nearbyUsers }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const mappedUsers = nearbyUsers.map((user) => {
    const {
      UserDetail: { liveLocationLat: lat, liveLocationLng: lng, status },
      username,
      id,
    } = user;

    return { id, username, lat, lng, status };
  });

  // console.log("MAPPED USERS", mappedUsers[0]);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDT_KxxLpoLwmlk3sXLpayAvW9z9_RodME" }}
        // defaultCenter={center}
        center={center}
        defaultZoom={11}
      >
        {mappedUsers.length > 0 &&
          mappedUsers.map((user) => {
            return (
              <Pin
                sessionUser={sessionUser}
                pinUser={user}
                lat={user.lat}
                lng={user.lng}
              />
            );
          })}
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;
