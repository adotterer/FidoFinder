import React, { useEffect, useState } from "react";
import DogProfile from "../DogProfile";
import { useSelector } from "react-redux";

export default function DogProfileReel({ dogReel }) {
  // const [reel, setReel] = useState(dogProfiles);
  // const newDog = useSelector((state) => state.newDog);

  // useEffect(() => {
  //   console.log(newDog, "newDog--------!");

  //   newDog && setReel((dogsArr) => [...reel, newDog]);
  // }, [newDog]);

  // useEffect(() => {
  //   console.log("REEL", reel);
  // }, [reel]);

  return (
    <div className="div__dogprofileContainer">
      {dogReel.length > 0
        ? dogReel.map((dog) => <DogProfile dog={dog} />)
        : "NO DOG PROFILES YET! 🐶"}
    </div>
  );
}
