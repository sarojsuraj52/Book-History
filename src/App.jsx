import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin";
import Index from "./components/Index";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Index /> : <Navigate replace to="/auth" />}
          />
          <Route path="/auth" element={<Signin />} />
        </Routes>
    </div>
  );
}

export default App;
