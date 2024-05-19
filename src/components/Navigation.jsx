import React from "react";
import { Link } from "react-router-dom";
import "./css/Navigation.css";

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul className="main-ul">
        <li className="main-list">
          <Link to="/">Home</Link>
        </li>
        <li className="main-list">
          <Link to="/add-scenario">Add Scenario</Link>
        </li>
        <li className="main-list">
          <Link to="/all-scenarios">All Scenarios</Link>
        </li>
        <li className="main-list">
          <Link to="/add-vehicle">Add Vehicle</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
