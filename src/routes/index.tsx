import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";

import Navbar from "../layout/Navbar";
import Budget from "../pages/Budget";

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="budget-app" element={<Budget />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
