import React, { useState, useRef, useEffect } from "react";
import "./dogprofile.css";

export default function DogProfile({ dog }) {
  return (
    <div className="div__dogcard">
      <div className="div__profileImg">
        <img className="img__dogProfileImg" src={dog.ProfileImage.URL} />
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
