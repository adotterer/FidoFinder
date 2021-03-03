import { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import SplashMap from "./SplashMap";
import "./SplashMap/splashmap.css";
const cityReelArr = [
  // philadelphia
  {
    latlng: { lat: 39.95, lng: -75.17 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
  // new york
  {
    latlng: { lat: 40.71, lng: -74 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
  // hawaii
  {
    latlng: { lat: 21.3, lng: -157.858 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
  // dc
  {
    latlng: { lat: 38.9, lng: -77.03 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
  // chicago
  {
    latlng: { lat: 41.8, lng: -87.6 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
  // los angeles
  {
    latlng: { lat: 34.0, lng: -118.2 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },

  // san fran
  {
    latlng: { lat: 37.77, lng: -122.41 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
  // balitmore
  {
    latlng: { lat: 39.29, lng: -76.6 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
  // denver
  {
    latlng: { lat: 39.7, lng: -105.0 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
  // seattle
  {
    latlng: { lat: 47.6, lng: -122.33 },
    nearbyUsers: new Array(Math.ceil(Math.random() * 290)),
  },
];

function GetIpAddress() {
  const [ipAddress, setIpAddress] = useState();
  const [cityReel, setCityReel] = useState(cityReelArr);
  const [userLoc, setUserLoc] = useState();

  useEffect(() => {
    if (!ipAddress) {
      fetch("/api/ipAddress/").then((res) => {
        setIpAddress(res.data);
        setUserLoc(res.data);
        setCityReel((reel) => [...reel, res.data]);
      });
    }
  }, []);

  useEffect(() => {
    if (userLoc && cityReel) {
      let i = 0;
      setInterval(() => {
        // console.log(cityReel, "cityReel", userLoc, "userLoc");
        if (i === cityReel.length) i = 0;

        setIpAddress(cityReel[i]);
        i++;
      }, 6000);
    }
  }, [cityReel]);

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
