import { useState, useEffect } from "react";
import { fetch } from "../../store/csrf.js";
import "./logs.css";

export default function Logs() {
  const todaysDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todaysDate);
  const [logs, setLogs] = useState([]);

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
        setLogs(res.data);
      })
      .catch((e) => console.log(e));
  }, [date]);

  return (
    <div className="div__logs_container">
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
      <div className="div__logs">
        {logs &&
          logs.map((line) => (
            <>
              <p>{line}</p>
              <hr />
            </>
          ))}
      </div>
    </div>
  );
}
