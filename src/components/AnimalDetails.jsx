import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    
    async function fetchAnimalDetails() {
      try {
        const response = await fetch(`http://localhost:5000/api/animals/${id}`);
        if (!response.ok) throw new Error("Failed to fetch animal details.");

        const data = await response.json();
        setAnimal(data);
      } catch (err) {
        setError(err.message);
      }
    }

    if (id) {
      fetchAnimalDetails();
    }
  }, [id]);

  console.log(animal)

  if (error) return <p>Error: {error}</p>;
  if (!animal) return <p>Loading...</p>;

  return (
    <div className="animal-details-page">
      <h2>{animal.type}</h2>
      <p>Breed: {animal.breed}</p>
      <p>Number of Animals: {animal.num_animals}</p>
      <img src={animal.animal_img_url} alt={animal.type} style={{ width: "300px" }} />
    </div>
  );
}

export default AnimalDetails;
