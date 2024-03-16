import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  useEffect(() => {});

  return (
    <nav className="nav">
      <Link className="nav__link" to="/">
        Home
      </Link>
      <Link className="nav__link" to="/budget-app">
        Budget
      </Link>
    </nav>
  );
};

export default Navbar;
