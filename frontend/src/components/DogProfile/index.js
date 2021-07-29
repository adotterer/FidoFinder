import "./dogprofile.css";
import { fetch } from "../../store/csrf.js";
import { useSelector } from "react-redux";

function deleteDog(id) {
  return fetch(`/api/dogProfile/${id}/delete`, { method: "DELETE" }).then(
    (resBody) => {
      console.log(resBody.data);
      window.location.reload();
    }
  );
}

function DeleteDogButton({ dogId }) {
  return <button onClick={() => deleteDog(dogId)}>Delete Dog</button>;
}

export default function DogProfile({ dog, userProfile }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="div__dogcard">
      <div className="div__profileImg">
        <img
          className="img__dogProfileImg"
          alt={"dog"}
          src={dog.ProfileImage.URL}
        />
      </div>
      <div>
        <h2>{dog.name}</h2>
        <br />
        <p>
          <h4>
            <em>Interests: </em>
          </h4>
          {dog.DogProfile.interests}
        </p>
        {userProfile.id === sessionUser.id && (
          <DeleteDogButton dogId={dog.id} />
        )}
      </div>
    </div>
  );
}

// birthday: "2020-12-01T00:00:00.000Z";
// createdAt: "2021-02-17T08:35:37.206Z";
// id: 14;
// name: "Ciara";
// ownerId: 1;
// profileImageId: 2016;
// updatedAt: "2021-02-17T08:35:37.206Z";
// vaccination: null;
