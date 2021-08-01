import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDog, toggleDogModal, submitNewDog } from "../../store/dog_actions";
import { useSelector } from "react-redux";

export default function NewDogForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [dogName, setDogName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [dogImage, setDogImage] = useState();
  const [interests, setInterests] = useState();

  // const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) return;

    dispatch(addDog({ dogName, birthday, interests, dogImage })).then(
      (newDog) => {
        dispatch(submitNewDog(newDog));
        setDogName("");
        setBirthday("");
        setInterests("");
        setDogImage(null);
        dispatch(toggleDogModal(false));
      }
    );
  };

  return (
    <div style={{ minWidth: "30rem" }}>
      <h1>Create a new dog profile</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
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
        <label>
          Interests
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </label>
        {dogImage && (
          <img
            className="img__preview"
            alt="preview"
            src={dogImage ? URL.createObjectURL(dogImage) : null}
          />
        )}
        <br />
        <label>
          <h3>Upload Image</h3>
          <div>
            <input
              name="sampleFile"
              type="file"
              onChange={(e) => setDogImage(e.target.files[0])}
              accept="image/x-png,image/gif,image/jpeg"
              required
            />
          </div>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
