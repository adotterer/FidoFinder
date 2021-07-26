import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetch } from "../../store/csrf.js";
import SimpleMap from "../GoogleMap";

async function getNearbyUsersMyLocation(sessionUser) {
  const res = await fetch(`/api/users/nearby?userId=${sessionUser.id}`);
  const nearbyUsers = res.data;

  return nearbyUsers;
}

export default function NearbyUsers() {
  const [locationInfo, setLocationInfo] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    getNearbyUsersMyLocation(sessionUser).then((res) => {
      setLocationInfo(res);
    });
  }, [sessionUser]);

  return (
    <div>
      <h1>Users near you: </h1>

      {locationInfo.currentLocation ? (
        <SimpleMap
          center={locationInfo.currentLocation}
          nearbyUsers={locationInfo.nearbyUsers}
        />
      ) : (
        "loading...."
      )}
    </div>
  );
}
