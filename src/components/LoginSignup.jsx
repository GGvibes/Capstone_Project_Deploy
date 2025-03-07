import { useState } from "react";

export default function LoginSignup({ setToken }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Login failed. Check your credentials."
        );
      }
      const result = await response.json();
      if (result.token) {
        setToken(result.token);
        setSuccessMessage("You are now logged in!");
        setFormData({ email: "", password: "" });
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
      setSuccessMessage(null);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3>Log in or Sign Up</h3>
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <label style={{ marginTop: "5px" }}>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button type="submit" className="continue-button">
          Continue
        </button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}
    </div>
  );
}
