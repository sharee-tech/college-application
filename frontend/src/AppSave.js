import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import data from "./data.json";
import Navbar from "./components/Navbar";
import axios from "axios";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <div className="bg-light p-5 rounded">
          <h1>College Explorer Platform</h1>
          <p className="lead">Blurb about College Explorer Platform...</p>
          <a className="btn btn-lg btn-primary" href="/search" role="button">
            Find Colleges Now &raquo;
          </a>
        </div>
      </main>
    </div>
  );
}
