import { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";

function GetIpAddress() {
  const [ipAddress, setIpAddress] = useState();

  if (!ipAddress) {
    fetch("/api/ipAddress/").then((res) => setIpAddress(res.data));
  }

  useEffect(async () => {
    if (ipAddress) console.log("ipAddress, actually res.data", ipAddress);
  }, [ipAddress]);

  return (
    <div>
      <h1>GreetingPage</h1>

      <div>your ip address: </div>
    </div>
  );
}

export default GetIpAddress;
