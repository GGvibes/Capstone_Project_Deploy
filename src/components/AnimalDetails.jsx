import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AnimalDetails({ animalDetails }) {
  return (
    <div>
      <h2>Animal Details:</h2>
      <h3>Type: </h3>
      <p>Description: </p>
      <p></p>
      <img></img>
    </div>
  );
}
