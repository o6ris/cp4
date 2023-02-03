import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@pages/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
