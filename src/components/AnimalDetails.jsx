import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function AnimalDetails({ token, userId }) {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (reservationid) => {
    const isSure = window.confirm(
      "Are you sure you want to create this reservation?"
    );

    if (isSure) {
      makeReservation(reservationid);
    } else {
      console.log("Reservation deletion canceled.");
    }
  };

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

  console.log(animal);

  if (error) return <p>Error: {error}</p>;
  if (!animal) return <p>Loading...</p>;

  async function makeReservation(event) {
    event.preventDefault();

    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          animal_id: animal.id,
          start_date: new Date(startDate).toISOString(), // Ensure it's an ISO string
          end_date: new Date(endDate).toISOString(),
        }),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        setError(result.message || "An error occurred making the reservation.");
        return;
      }

      setSuccessMessage("Reservation created Successfully!");
    } catch (error) {
      console.error("Reservation Error:", error);
      setError(
        "An unexpected error occurred. Please try again.",
        error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="animal-details-page">
      
      <h2>Animal Information:</h2>
      <p>{animal.type}</p>
      <p>Breed: {animal.breed}</p>
      <p>Number of Animals: {animal.num_animals}</p>
      <img
        src={animal.animal_img_url}
        alt={animal.type}
        style={{ width: "300px" }}
      />
      <p>Would you like to host these animals?</p>
      <p>Make a Reservation:</p>
      <form className="dates-form">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <br />
        <button
          style={{ margin: "20px" }}
          onClick={handleSubmit}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Save Reservation"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default AnimalDetails;
