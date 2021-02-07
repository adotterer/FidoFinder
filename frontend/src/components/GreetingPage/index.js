import React, { useState, useEffect } from "react";
import { fetch } from "../../store/csrf.js";

async function getIpAddress() {
  const res = await fetch("/api/ipAddress/");
  console.log(res.data);
}

function GreetingPage() {
  var options = {
    enableHighAccuracy: false,
    timeout: 0,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  try {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } catch (e) {
    console.log(e);
  }
  // console.log(geolocation);
  getIpAddress();

  return (
    <div>
      <h1>GreetingPage</h1>

      <div>your lat: </div>
      <div>your lat: </div>
    </div>
  );
}

export default GreetingPage;
