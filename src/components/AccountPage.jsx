import { useState, useEffect } from "react";

export default function AccountPage({ token }) {
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    async function fetchAccount() {
      if (!token) {
        setError("You need to log in to view your account details.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch account details.");
        }

        const result = await response.json();
        setAccountData(result);
        const userId = result.id;
        const reservationsResponse = await fetch(`http://localhost:5000/api/reservations/lookupbyuser/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Res response", reservationsResponse)
        const reservationsResult = await reservationsResponse.json();
        console.log ("Reservations in fetch account" ,reservationsResult)
        setReservations(reservationsResult.reservation);

      } catch (err) {
        setError(err.message);
      }
    }
    fetchAccount();
  }, [token]);



  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!accountData) {
    return <p>Loading...</p>;
  }
  console.log("Account Data", accountData);
  return (
    <div>
      <div className="accountDetails">
        <h2>Account Details</h2>
        <p>First Name: {accountData.firstname}</p>
        <p>Last Name: {accountData.lastname}</p>
        <p>Email: {accountData.email}</p>
        <p>Address: {accountData.address}</p>
        <p>Reservations: {reservations}</p>
      </div>
    </div>
  );
}
