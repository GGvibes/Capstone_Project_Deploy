import { useState, useEffect } from "react";

export default function AvailableAnimals({ token }) {
  const [animals, setAnimals] = useState([]);
  const [animalDetails, setAnimalDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnimals() {
      if (!token) {
        setError("Please sign up to be a host to view available animals!");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/animals", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch available animals.");
        }

        const result = await response.json();
        setAnimals(result.animals || []);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchAnimals();
  }, [token]);

  const handleClick = () => {

  }

//   useEffect(() => {
//     async function fetchAnimalDetails() {
//       try {
//         const response = await fetch("http://localhost:5000/api/animals/:id");

//         if (!response.ok) {
//           setError("Failed to fetch animal details.");
//         }

//         const result = await response.json();
//         console.log(result);
//         setAnimalDetails(result);
//         console.log("Animal Details", animalDetails);
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//     fetchAnimalDetails();
//   }, [handleClick]);

  if (error) {
    return <p style={{ margin: "30px" }}>{error}</p>;
  }

  if (!animals) {
    return <p>Loading...</p>;
  }
  
  return (
    <div>
      <div className="availableAnimalsPage">
        <h2>Available Animals:</h2>
        <div className="animals-container">
          {animals.length > 0 ? (
            animals.map((animal) => (
              <div className="animals-card" key={animal.id}>
                <p>Type: {animal.type}</p>
                <p>Number of animals: {animal.num_animals}</p>
                <img
                  style={{ width: "200px", margin: "20px" }}
                  src={animal.animal_img_url}
                ></img>
                <button onClick={handleClick}>See Details</button>
              </div>
            ))
          ) : (
            <p>No animals available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
