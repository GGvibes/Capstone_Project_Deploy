import { useState } from "react";

export default function Signup({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submitting")
    setError(null);
    setSuccessMessage(null);

    const validationError = validateForm({
      firstname,
      lastname,
      email,
      password,
      location,
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          location,
        }),
      });
      console.log(response)
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "An error occurred during registration.");
        return;
      }

      setSuccessMessage("Registration successful! You are now logged in.");
      if (result.token) {
        setToken(result.token);
      }
    } catch (error) {
      setError(
        "An unexpected error occurred. Please try again.",
        error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="content">
      <div className="becomeHostInfo">
        <h2>Become a Host</h2>

        <p>
          Are you interested in hosting a pastured animal on your land? Becoming
          a Host-a-Herd member is a rewarding way to support sustainable
          agriculture, bring local food to your community, and contribute to
          ethical animal stewardship.
        </p>

        <h3>What is Community Supported Agriculture (CSA)?</h3>

        <p>
          CSA is a model of farming that connects consumers directly with local
          food production. Members of a CSA share in the benefits of sustainable
          agriculture by supporting farms in exchange for fresh, high-quality
          food. By hosting an animal, you become a vital part of this system,
          helping to raise pastured livestock in a way that benefits both the
          environment and the community.
        </p>

        <h3>Land Requirements</h3>

        <p>
          Each type of animal has different space and care needs. Below are the
          general guidelines for hosting:
        </p>
        <p>
          Chickens: Requires at least 500 sq. ft. of outdoor space with natural
          foraging opportunities. A secure coop is recommended for protection at
          night.
        </p>
        <p>
          Rabbits: Need at least 200 sq. ft. of well-drained grassy area with
          shaded spots. A predator-proof enclosure is required.
        </p>
        <p>
          Sheep or Goats: Requires ¼ to ½ acre per animal, with proper fencing
          (woven wire or electric). Access to shelter and clean water is
          essential.
        </p>
        <p>
          Pigs: Need at least ½ acre per pig, with sturdy fencing and a wallow
          area for cooling. Shade and access to fresh water are necessary.
        </p>
        <p>
          Cattle: Requires a minimum of 1 acre per cow, with rotational grazing
          preferred to maintain pasture health. A water source and windbreak for
          shelter are important.
        </p>
        <h3>Other Considerations</h3>
        <p>
          Fencing & Shelter: We will provide the necessary fencing and shelter
          for all animals. Proper fencing is crucial to protect animals and
          prevent escapes.
        </p>
        <p>
          Time Commitment: While Host-a-Herd handles major animal care aspects,
          hosts should monitor animals daily and report any concerns.
        </p>
        <p>
          Zoning & Local Regulations: Hosts must ensure compliance with local
          zoning laws and livestock regulations.
        </p>
        <h3> Benefits of Hosting</h3>
        <p>
          Receive high-quality pasture-raised meats based on your membership
          level. Contribute to sustainable and ethical farming practices. Enjoy
          the natural benefits of animal grazing, such as improved soil health
          and pasture management. Interested in becoming a host? Sign up today
          to learn more and start your journey with Host-a-Herd!
        </p>
      </div>
      
        <div style={{paddingBottom: "200px"}} className="login-container">
          <h2>Sign Up to Become a Host</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <div>
            <form className="signup-form" onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="First Name"
                />
              </label>
              <label>
                Last Name:
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last Name"
                />
              </label>
              <label>
                Email:
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </label>

              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
              </label>
              {/* <p>password must be between 8-20 characters</p> */}

              <button className="login-button" type="submit">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}
function validateForm({ firstname, lastname, email, password, location }) {
  if (!firstname) {
    return "First name is required.";
  }

  if (!lastname) {
    return "Last name is required.";
  }
  if (!email || !email.includes("@")) {
    return "Please enter a valid email";
  }

  if (!password || password.length < 8 || password.length > 20) {
    return "Password must be between 8 and 20 characters.";
  }

  if (!location) {
    return "Location is required to determine if you're eligible to host animals!";
  }

  return null;
}
