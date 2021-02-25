import React, { useState, useRef, useEffect } from "react";
import "./dogprofile.css";

export default function DogProfile({ dog }) {
  return (
    <div className="div__dogcard">
      <h3>{dog.name}</h3>
      <img src={dog.name} />
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
