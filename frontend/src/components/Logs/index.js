import { useState, useEffect } from "react";
import { fetch } from "../../store/csrf.js";

export default function Logs() {
  const todaysDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todaysDate);

  // useEffect(() => {
  //   fetch(`/api/ipAddress/logs/${todaysDate}`).then((res) => {
  //     console.log("useEffect api call", res.data);
  //   });
  // }, []);

  useEffect(() => {
    if (!date) return;
    console.log("new date", date);
    fetch(`/api/ipAddress/logs/${date}`)
      .then((res) => {
        console.log("useEffect api call", res.data);
      })
      .catch((e) => console.log(e));
  }, [date]);

  return (
    <div>
      <h1>Logs</h1>
      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
    </div>
  );
}
