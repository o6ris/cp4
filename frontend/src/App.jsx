import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "@pages/Login";
import SearchCity from "@pages/SearchCity";
import OneCity from "@pages/OneCity";
import PostReview from "@pages/PostReview";

import User from "./contexts/UserContext";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(User.UserContext);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate replace to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          {user && (
            <>
              <Route path="/FindCity" element={<SearchCity />} />
              <Route path="/OneCity/:id" element={<OneCity />} />
              <Route path="/PostReview/:id" element={<PostReview />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
