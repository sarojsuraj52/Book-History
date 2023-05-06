import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin";
import BookList from "./components/Book/BookList";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import BookStore from "./components/BookStore/BookStore";
import { AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  return (
    <div className="App">
       {location.pathname !== '/auth' && <Navbar />}
      <AnimatePresence>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Signin />} />
          <Route path="/bookList" element={<BookList />} />
          <Route path="/bookStore" element={<BookStore />} />
          <Route path="/bookStore/:id" element={<BookStore />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
