import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AvailableAnimals({ token }) {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchAnimals = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredAnimals = animals.filter((animal) => {
        return Object.values(animal)
          .join(" ")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredAnimals);
    } else {
      setFilteredResults(animals);
    }
  };

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/animals`, {
          headers: {
            "Content-Type": "application/json",
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
      <img
        className="header-img"
        alt="cows-grazing"
        src="https://www.publicdomainpictures.net/pictures/40000/velka/cows-grazing.jpg"
      ></img>
      <div className="availableAnimalsPage">
        <h2 style={{ marginLeft: "50px", marginTop: "200px" }}>
          Available Animals
        </h2>
        <h4 style={{ marginLeft: "50px" }}>Search Animals here:</h4>
        <input
          style={{ marginLeft: "50px" }}
          className="searchBox"
          icon="search"
          placeholder="Search..."
          onChange={(e) => searchAnimals(e.target.value)}
        ></input>
        {searchInput.trim() && filteredResults.length === 0 && (
          <h3 className="noAnimalsFound">No Animals match your search.</h3>
        )}
        <div className="animals-container">
          {(searchInput.trim() && filteredResults.length > 0
            ? filteredResults
            : animals
          ).map((animal) => (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/animals/${animal.id}`}
            >
              <div className="animals-card" key={animal.id}>
                <p style={{ paddingTop: "20px" }}>Type: {animal.type}</p>
                <p>Number of animals: {animal.num_animals}</p>
                <img
                  style={{ width: "200px", maxHeight: "200px", margin: "20px" }}
                  src={animal.animal_img_url}
                ></img>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
