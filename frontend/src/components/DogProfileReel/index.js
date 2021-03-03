import DogProfile from "../DogProfile";

export default function DogProfileReel({ dogReel }) {
  return (
    <div className="div__dogprofileContainer">
      {dogReel.length > 0
        ? dogReel.map((dog) => <DogProfile dog={dog} />)
        : "NO DOG PROFILES YET! 🐶"}
    </div>
  );
}
