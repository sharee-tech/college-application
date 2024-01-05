import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./routes/Search";
import Favorites from "./routes/Favorites";
import Account from "./routes/Account";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import EditFavorite from "./routes/Edit";
import Edit from "./routes/Edit";
import Login from "./components/Login";
import Register from "./components/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <Routes> */}
    {/* <Route path="/" element={<App />} />
      <Route path="search" element={<Search />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="favorites/:id" element={<Edit />} />
      <Route path="account" element={<Account />} />
      <Route path="*" element={<h1>Route does not exist</h1>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
       */}

    {/* </Routes> */}

    <App />
  </BrowserRouter>
  /* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
