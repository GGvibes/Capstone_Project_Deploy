import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

export default function EditReservation() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const [animal, setAnimal] = useState(null)

  useEffect(() => {
    async function fetchReservation() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/reservations/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok)
          throw new Error("Failed to fetch reservation details.");

        const data = await response.json();
        setReservation(data);

        const animalResponse = await fetch(
            `http://localhost:5000/api/animals/${data.animal_id}`, 
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!animalResponse.ok) throw new Error("Failed to fetch animal details.");
  
          const animalData = await animalResponse.json();
          setAnimal(animalData); 
      } catch (err) {
        setError(err.message);
      }
    }

    if (id) {
      fetchReservation();
    }
  }, [id]);


  if (error) return <p>Error: {error}</p>;
  if (!reservation || !animal) return <p>Loading...</p>; 
  
  return (
    <div className="reservations-container" key={reservation.id}>
      <div className="reservation-card">
        {animal ? (
          <>
            <p>Type: {animal.type}</p>
            <p>Breed: {animal.breed}</p>
            <p>Number of Animals: {animal.num_animals}</p>
            <img src={animal.animal_img_url} alt={animal.type} width="150" />
          </>
        ) : (
          <p>Loading animal info...</p>
        )}
        <p>
          Start Date: {format(new Date(reservation.start_date), "MMMM d, yyyy")}
        </p>
        <p>
          End Date: {format(new Date(reservation.end_date), "MMMM d, yyyy")}
        </p>
        <button
          onClick={() => navigate(`/account`)}
          style={{ padding: "8px" }}
        >
          Back to Account Page
        </button>
      </div>
    </div>
  );
}
