import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const logoClick = () => {
    navigate("/");
    setIsOpen(false);
  };

 

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="header">
        <img
          style={{ cursor: "pointer" }}
          onClick={logoClick}
          className="logo"
          src="favicon.ico"
          alt="goatlogo"
        ></img>
        <div ref={dropdownRef} className="dropdown-container">
          <div className="dropdown-menu" onClick={handleClick}>
            <img
              className="menu-image"
              src="/assets/Button.png"
              alt="menu-button"
            />

            {isOpen && (
              <div className="dropdown-content">
                <Link
                  to={"/loginsignup"}
                  onClick={handleLinkClick}
                  style={{ textDecoration: "none" }}
                >
                  <div className="menu-item">Sign Up</div>
                </Link>
                <Link
                  to={"/loginsignup"}
                  onClick={handleLinkClick}
                  style={{ textDecoration: "none" }}
                >
                  <div className="menu-item">Log In</div>
                </Link>
                <hr />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
