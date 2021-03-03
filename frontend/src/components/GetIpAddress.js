import { useState, useEffect } from "react";
import { fetch } from "../../store/csrf.js";

function GetIpAddress() {
  const [ipAddress, setIpAddress] = useState();

  const getIpAddress = async () => {
    const res = await fetch("/api/ipAddress/");
    return res.data;
  };

  useEffect(async () => {
    const { clientIp, geoObj } = await getIpAddress();
    console.log("CLIENT IP", clientIp);
    setIpAddress(clientIp);
  }, []);

  return (
    <div>
      <h1>GreetingPage</h1>

      <div>your ip address: {ipAddress && ipAddress} </div>
    </div>
  );
}

export default GetIpAddress;
