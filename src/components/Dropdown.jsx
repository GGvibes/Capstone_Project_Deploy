import { useState, useRef, useEffect } from "react";

export default function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <div className="dropdown-menu" onClick={handleClick}>
        <img className="menu-image" src="/assets/Button.png" alt="menu-button" />
      </div>

      {isOpen && <div className="dropdown-content">{props.children}</div>}
    </div>
  );
}
