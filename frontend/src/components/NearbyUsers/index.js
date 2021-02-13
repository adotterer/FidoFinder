import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf.js";
import UserList from "../UserList";
import SimpleMap from "../GoogleMap";

async function getNearbyUsersMyLocation(sessionUser) {
  const res = await fetch(`/api/users/nearby?userId=${sessionUser.id}`);
  const nearbyUsers = res.data;

  return nearbyUsers;
}

function NearbyUsers() {
  const [locationInfo, setLocationInfo] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const [center, setCenter] = useState();

  useEffect(async () => {
    setLocationInfo(await getNearbyUsersMyLocation(sessionUser));
  }, [sessionUser]);

  useEffect(async () => {
    setCenter(locationInfo.currentLocation);
  }, [locationInfo]);

  return (
    <div>
      <h1>Here are nearby users: </h1>

      {locationInfo.currentLocation ? (
        <SimpleMap
          center={locationInfo.currentLocation}
          nearbyUsers={locationInfo.nearbyUsers}
        />
      ) : (
        "no center"
      )}
    </div>
  );
}

export default NearbyUsers;
