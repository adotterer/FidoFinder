import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

function NewDogForm() {
  const dispatch = useDispatch();

  const [dogName, setDogName] = useState("");
  const [birthday, setBirthday] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("here is dogName and birthday", dogName, birthday);
  };

  return (
    <div style={{ minWidth: "35rem" }}>
      <h1>Create a new dog profile</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Name
          <input
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewDogForm;
