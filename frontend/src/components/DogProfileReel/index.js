import DogProfile from "../DogProfile";

export default function DogProfileReel({ dogReel, userProfile }) {
  return (
    <div className="div__dogprofileContainer">
      {dogReel.length > 0
        ? dogReel.map((dog) => (
            <DogProfile
              key={"dogId-" + dog.id}
              dog={dog}
              userProfile={userProfile}
            />
          ))
        : "NO DOG PROFILES YET! 🐶"}
    </div>
  );
}
