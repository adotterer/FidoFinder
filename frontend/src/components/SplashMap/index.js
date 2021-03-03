import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./splashmap.css";
import LoginFormModal from "../LoginFormModal";
import { Link } from "react-router-dom";

function InfoCircle({ numUsers }) {
  return (
    <div className="div__bluecircle">
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
  );
}

export default function SplashMap({ center, nearbyUsers }) {
  console.log("center", center);
  return center ? (
    <div className="div__splashmap">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDT_KxxLpoLwmlk3sXLpayAvW9z9_RodME" }}
        center={center}
        defaultZoom={11}
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
