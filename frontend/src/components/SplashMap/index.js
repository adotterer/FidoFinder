import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./splashmap.css";

export default function SplashMap({ center, nearbyUsers }) {
  console.log("center", center);
  return center ? (
    <div className="div__splashmap">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDT_KxxLpoLwmlk3sXLpayAvW9z9_RodME" }}
        center={center}
        defaultZoom={11}
      ></GoogleMapReact>
    </div>
  ) : (
    "loading....."
  );
}
