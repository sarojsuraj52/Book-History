import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin";
import BookList from "./components/Book/BookList";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import BookStore from './components/BookStore'

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate replace to="/auth" />}
        />
        <Route path="/auth" element={<Signin />} />
        <Route path="/bookList" element={<BookList />} />
        <Route path="/bookStore" element={<BookStore />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
