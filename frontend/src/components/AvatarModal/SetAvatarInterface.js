import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar, chooseExistingPic } from "../../store/avatar_actions";
import "./avatar.css";

function removeDogSelected() {
  const allDogDivs = document.querySelectorAll(".avatar__dog__container");
  allDogDivs.forEach((dogDiv) =>
    dogDiv.classList.remove("avatar__dog__selected")
  );
}

export default function SetAvatarInterFace() {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();
  const [dogAvatar, setDogAvatar] = useState();
  const [dogPics, setDogPics] = useState();

  useEffect(() => {
    removeDogSelected();
    if (dogAvatar) {
      const selectedPic = document.getElementById(`avatar__dog__${dogAvatar}`);
      selectedPic.classList.add("avatar__dog__selected");
    }
  }, [dogAvatar]);

  useEffect(() => {
    if (!dogPics) {
      fetch("/api/user/me/dogs/pics")
        .then((res) => res.json())
        .then((resBody) => {
          setDogPics(resBody);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (avatar) {
      dispatch(uploadAvatar(avatar));
    } else if (dogAvatar) {
      dispatch(chooseExistingPic(dogAvatar));
    }
  };

  return (
    <div className="avatar__interface">
      <form onSubmit={handleSubmit}>
        {avatar && (
          <img
            className="img__preview"
            alt="preview"
            src={avatar ? URL.createObjectURL(avatar) : null}
          />
        )}
        <label>
          <h3>Upload Image</h3>
          <div>
            <input
              name="avatar"
              type="file"
              onChange={(e) => {
                setAvatar(e.target.files[0]);
                setDogAvatar(null);
              }}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </div>
        </label>
        {dogPics && (
          <label>
            <h3>Or choose an existing photo</h3>
            {dogPics.map((dogURL) => {
              return (
                <div
                  key={dogURL}
                  id={`avatar__dog__${dogURL.id}`}
                  className="avatar__dog__container"
                  onClick={() => {
                    setDogAvatar(dogURL.id);
                    setAvatar(null);
                  }}
                >
                  <img className="avatar__dog__choose" src={dogURL.URL} />
                </div>
              );
            })}
          </label>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
