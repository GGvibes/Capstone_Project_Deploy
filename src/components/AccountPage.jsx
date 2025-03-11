import { useState, useEffect } from "react";

export default function AccountPage({ token }) {
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);
  // console.log(token)

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
      } catch (err) {
        setError(err.message);
      }
      //   try {
      //     const booksResponse = await fetch(`${API_URL}/reservations`, {
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     });
      //     const booksResult = await booksResponse.json();

      //     setReservations(booksResult.reservation);
      //   } catch {
      //     console.error;
      //   }
    }
    fetchAccount();
  }, [token]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!accountData) {
    return <p>Loading...</p>;
  }
  console.log(accountData);
  return (
    <div>
      <div className="accountDetails">
        <h2>Account Details</h2>
        <p>First Name: {accountData.firstname}</p>
        <p>Last Name: {accountData.lastname}</p>
        <p>Email: {accountData.email}</p>
        <p>Location: {accountData.location}</p>
      </div>
    </div>
  );
}
