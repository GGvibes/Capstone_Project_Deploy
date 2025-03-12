import { useNavigate } from "react-router-dom";

export default function Footer({ token }) {
  const navigate = useNavigate();
  return (
    <>
      <footer className="footer-container">
        <hr />
        <div className="footer-content">
          <h1 style={{ color: "black" }} className="footer-title">
            Host-a-Herd
          </h1>
          <div className="footer-links">
            <ul className="column1">
              <li
                onClick={() => navigate("/aboutcontact#contact-section")}
                style={{ color: "black" }}
              >
                Contact Us
              </li>
              {!token && <li onClick={() => navigate("/login")}>Log In</li>}
              {!token && <li onClick={() => navigate("/signup")}>Sign Up</li>}
              {token && <li onClick={() => navigate("/account")}>Account</li>}
            </ul>
            <ul className="column2">
              <li
                onClick={() => navigate("/aboutcontact#aboutPage")}
                style={{ color: "black" }}
              >
                About Us
              </li>
              <li onClick={() => navigate("/availableanimals")}>Available Animals</li>
              <li>Learn About Hosting</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
