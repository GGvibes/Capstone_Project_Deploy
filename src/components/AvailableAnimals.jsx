import { useState, useEffect } from "react";

export default function AvailableAnimals({ token }) {
  const [animals, setAnimals] = useState(null);
  const [error, setError] = useState(null);
  console.log(token)

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
        setAnimals(result);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchAnimals();
  }, [token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!animals) {
    return <p>Loading...</p>;
  }
  console.log(animals);
  return (
    <div>
      <div className="accountDetails">
        <h2>Available Animals:</h2>
        <p></p>
      </div>
    </div>
  );
}
