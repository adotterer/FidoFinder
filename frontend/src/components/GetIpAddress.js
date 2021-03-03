import { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import SplashMap from "./SplashMap";
import "./SplashMap/splashmap.css";

function GetIpAddress() {
  const [ipAddress, setIpAddress] = useState();

  if (!ipAddress) {
    fetch("/api/ipAddress/").then((res) => setIpAddress(res.data));
  }

  useEffect(async () => {
    if (ipAddress) console.log("ipAddress, actually res.data", ipAddress);
  }, [ipAddress]);

  return ipAddress ? (
    <div className="div__splashmap ">
      {ipAddress.latlng ? (
        <SplashMap
          center={ipAddress.latlng}
          nearbyUsers={ipAddress.nearbyUsers}
        />
      ) : (
        "loading...."
      )}
    </div>
  ) : (
    "loading......."
  );
}

export default GetIpAddress;
