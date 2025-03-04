import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import Dropdown from "./components/Dropdown";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <>
      <Dropdown>
        <div>
          <div className="menu-item" >Log In</div>
          <div className="menu-item">Sign Up</div>
          <hr />
          <div className="menu-item">Learn More</div>
        </div>
      </Dropdown>

      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
