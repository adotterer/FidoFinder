import React from "react";
import GoogleMapReact from "google-map-react";
import UserList from "../UserList";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiSittingDog } from "react-icons/gi";
import createChatRoomEvent from "../../utils/createChatRoomEvent";
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Pin(props) {
  const history = useHistory();
  // console.log("pin", props);
  return (
    <Link key={props.pinUser.id} to={`/user/${props.pinUser.id}`}>
      <GiSittingDog style={{ color: "black", fontSize: "3em" }} />
    </Link>
  );
}

function SimpleMap({ center, nearbyUsers }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const mappedUsers = nearbyUsers.map((user) => {
    const {
      UserDetail: { liveLocationLat: lat, liveLocationLng: lng },
      username,
      id,
    } = user;

    return { id, username, lat, lng };
  });

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_API_SECRET }}
        // defaultCenter={center}
        center={center}
        defaultZoom={12}
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
