import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import LoginSignup from "./components/LoginSignup";
import AboutPage from "./components/AboutPage";
import Success from "./components/Success";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header/>
      {isHomePage ? (
    <a className="learnMore" onClick={() => navigate('/aboutcontact')}>
      Learn More
    </a>
  ) : (
    <a className="home-link" onClick={() => navigate('/')}>
      Home
    </a>
  )}
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/loginsignup" element={<LoginSignup></LoginSignup>}></Route>
        <Route path="/aboutcontact" element={<AboutPage></AboutPage>}></Route>
        <Route path="/success" element={<Success></Success>}></Route>
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
