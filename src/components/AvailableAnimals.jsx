import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AvailableAnimals({ token }) {
  const [animals, setAnimals] = useState([]);
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


  if (error) {
    return <p style={{ margin: "30px" }}>{error}</p>;
  }

  if (!animals) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="availableAnimalsPage">
        <h2 style={{marginLeft:"50px"}}>Available Animals:</h2>
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
                <Link to={`/animals/${animal.id}`}>
                  <button>See Details</button>
                </Link>
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
