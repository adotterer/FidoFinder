import { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import SplashMap from "./SplashMap";
import "./SplashMap/splashmap.css";

function GetIpAddress() {
  const [ipAddress, setIpAddress] = useState();

  const cityReelArr = [
    // new york
    {
      latlng: { lat: 40.71, lng: -74 },
      nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
    },
    // philadelphia
    {
      latlng: { lat: 39.95, lng: -75.17 },
      nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
    },
    // balitmore
    {
      latlng: { lat: 39.29, lng: -76.6 },
      nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
    },
    // dc
    {
      latlng: { lat: 38.9, lng: -77.03 },
      nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
    },
  ];

  if (!ipAddress) {
    fetch("/api/ipAddress/").then((res) => setIpAddress(res.data));
  }

  useEffect(() => {
    // cityReelArr.forEach((city, i) => {
    //   setTimeout(() => {
    //     setIpAddress(city);
    //   }, 6000 * i + 0.5);
    // });

    let i = 0;
    setInterval(() => {
      // setMapTransition({ opacity: 1, transition: "opacity 0.5s linear" });

      if (i === cityReelArr.length) i = 0;
      setIpAddress(cityReelArr[i]);
      i++;
      // setTimeout(
      //   () =>
      //     setMapTransition({ opacity: 0, transition: "opacity 0.5s linear" }),
      //   2000
      // );
    }, 6000);
  }, []);

  return ipAddress ? (
    <div className="div__splashmap">
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
