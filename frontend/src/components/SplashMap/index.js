import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./splashmap.css";
import LoginFormModal from "../LoginFormModal";
import { Link } from "react-router-dom";

function InfoCircle({ numUsers }) {
  const [circleTransition, setCircleTransition] = useState({
    opacity: 0,
    transition: "opacity 1s linear",
  });

  useEffect(() => {
    setCircleTransition({ opacity: 0, transition: "opacity 0.4s linear" });
    setTimeout(() => {
      setCircleTransition({ opacity: 100, transition: "opacity 0.6s linear" });
    }, 200);

    setTimeout(() => {
      setCircleTransition({ opacity: 0, transition: "opacity 0.8s linear" });
    }, 4860);
  }, [numUsers]);

  return (
    <div className="div__bluecircle">
      <div className="div__transition--hidden" style={circleTransition}>
        <h2>{numUsers}</h2>
        <span>Dog owners in your area.</span>

        <div className="div__bluecircle_loginSignUp">
          <LoginFormModal />
          <Link to="/signup">
            <div>
              <button>Sign up</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SplashMap({ center, nearbyUsers }) {
  const [mapTransition, setMapTransition] = useState({
    opacity: 0,
    transition: "opacity .4s linear",
  });

  useEffect(() => {
    setMapTransition({
      opacity: "0",
      transition: "opacity .4s linear",
    });
    setMapTransition({
      opacity: "100",
      transition: "opacity .4s linear",
    });
    setTimeout(
      () =>
        setMapTransition({
          opacity: "0",
          transition: "opacity .5s linear",
        }),
      5700
    );
  }, [center]);
  return center ? (
    <div style={mapTransition} className="div__splashmap">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDT_KxxLpoLwmlk3sXLpayAvW9z9_RodME" }}
        center={center}
        zoom={12}
      >
        <InfoCircle
          lat={center.lat}
          lng={center.lng}
          numUsers={nearbyUsers.length}
        />
      </GoogleMapReact>
    </div>
  ) : (
    "loading....."
  );
}
