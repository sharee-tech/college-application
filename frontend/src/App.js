import React, { useState, useEffect } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserContext from "./UserContext";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Favorites from "./routes/Favorites";
import Search from "./routes/Search";
import EventBus from "./common/EventBus";
import Edit from "./routes/Edit";
import Contact from "./routes/Contact";
import Navbar from "./components/Navbar";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();

    setCurrentUser(undefined);
  };

  return (
    <div>
      <Navbar logout={logOut} user={currentUser} />
      <>
        <UserContext.Provider value={{ currentUser }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="favorites/:id" element={<Edit />} />
            <Route path="*" element={<h1>Route does not exist</h1>} />
          </Routes>
        </UserContext.Provider>
      </>
    </div>
  );
}

export default App;
