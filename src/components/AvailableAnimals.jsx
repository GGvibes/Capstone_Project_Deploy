import { useState, useEffect } from "react";

export default function AvailableAnimals({ token }) {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  console.log(token);

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
  
  if (error) {
    return <p style={{margin: "30px"}}>{error}</p>;
  }

  if (!animals) {
    return <p>Loading...</p>;
  }
  console.log(animals);

  return (
    <div>
      <div className="availableAnimalsPage">
        <h2>Available Animals:</h2>
        <div>
          {animals.length > 0 ? (
            animals.map((animal) => (
              <div key={animal.id}>
                <h3>{animal.type}</h3>
                <p>{animal.breed}</p>
                <p>Number of animals: {animal.num_animals}</p>
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
