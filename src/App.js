import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faU } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const iconHouse = <FontAwesomeIcon icon={faHouse} />
const iconOut = <FontAwesomeIcon icon={faRightFromBracket} />
const iconWrite = <FontAwesomeIcon icon={faFilePen} />
const iconUser = <FontAwesomeIcon icon={faUser} />

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  }
  return (
    <Router> 
      <header>
        <nav>
          <Link to="/"> <button> {iconHouse} Home </button> </Link>
          {!isAuth ? ( <Link to="/login"> <button> {iconUser} LogIn</button> </Link> 
          ) : ( 
          <>
          <Link to="/createpost"> <button> {iconWrite} Report</button> </Link>
          <button onClick={signUserOut}> {iconOut} LogOut</button>
          </>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
