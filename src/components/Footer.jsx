import { useNavigate } from "react-router-dom";



export default function Footer() {

    const navigate = useNavigate();


  return (
    <>
      <footer className="footer-container">
        <hr />
        <div className="footer-content">
          <h1 style={{color:"black"}} className="footer-title">Host-a-Herd</h1>
          <div className="footer-links">
            <ul className="column1">
              <li onClick={()=>navigate("/aboutcontact#contact-section")} style={{color:"black"}} >Contact Us</li>
              <li onClick={()=>navigate("/loginsignup")}>Log In</li>
              <li onClick={()=>navigate("/loginsignup")}>Sign Up</li>
              <li>View Account</li>
            </ul>
            <ul className="column2">
              <li onClick={()=>navigate("/aboutcontact#aboutPage")} style={{color:"black"}}>About Us</li>
              <li>Available Animals</li>
              <li>Learn About Hosting</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
