import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "@pages/Login";
import SearchCity from "@pages/SearchCity";
import OneCity from "@pages/OneCity";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate replace to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/FindCity" element={<SearchCity />} />
          <Route path="/OneCity/:id" element={<OneCity />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
