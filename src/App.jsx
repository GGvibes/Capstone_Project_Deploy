import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import LoginSignup from "./components/LoginSignup";
import AboutPage from "./components/AboutPage";
import Success from "./components/Success";
import Footer from "./components/Footer";
import AccountPage from "./components/AccountPage";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null);

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <Header token={token} logout={logout}></Header>
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
        <Route path="/loginsignup" element={<LoginSignup setToken={saveToken}></LoginSignup>}></Route>
        <Route path="/aboutcontact" element={<AboutPage></AboutPage>}></Route>
        <Route path="/success" element={<Success></Success>}></Route>
        <Route
          path="/account"
          element={token ? <AccountPage token={token} /> : <Navigate to="/" />}
        ></Route>
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
