import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import MainPage from './components/MainPage';
import Dropdown from './components/Dropdown';

function App() {

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleClick = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    fetch ("http://localhost:5000/api/users")
    .then((res) => res.json())
    .then((data) => console.log(data))
  },[]) 
  return (
    <>
    <>
    <Dropdown>
      <Element/>
    </Dropdown>
    
    </>
    
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
      </Routes>
    </>
  )
}

export default App
