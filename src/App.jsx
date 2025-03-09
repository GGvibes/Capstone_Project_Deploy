import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import AboutPage from "./components/AboutPage";
import Success from "./components/Success";
import AccountPage from "./components/AccountPage";
import Signup from "./components/Signup";
import Layout from "./components/Layout";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const [token, setToken] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setLoggedOut(true);
  };

  return (
    <div className="app-container">
      <main className="content">
      {loggedOut && <p style={{padding: "50px"}}>You have been logged out successfully</p>}
        <Routes>
          <Route path="/" element={<Layout token={token} logout={logout} />}>
            <Route index element={<MainPage />}></Route>
            <Route
              path="/login"
              element={<Login setToken={saveToken}></Login>}
            ></Route>
            <Route
              path="/aboutcontact"
              element={<AboutPage></AboutPage>}
            ></Route>
            <Route path="/success" element={<Success />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/account"
              element={
                token ? <AccountPage token={token} /> : <Navigate to="/" />
              }
            ></Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
