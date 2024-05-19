import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddScenario from "./components/AddScenario";
import AllScenario from "./components/AllScenarios";
import AddVehicle from "./components/AddVehicle";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import "./App.css";

const App = () => {
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const handleScenarioAdded = (newScenario) => {
    setScenarios([...scenarios, newScenario]);
  };

  const handleVehicleAdded = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
  };

  return (
    <Router>
      <div className="main">
        <Navigation />
        <Routes>
          <Route
            path="/add-scenario"
            element={<AddScenario onScenarioAdded={handleScenarioAdded} />}
          />
          <Route path="/all-scenarios" element={<AllScenario />} />
          <Route
            path="/add-vehicle"
            element={<AddVehicle onVehicleAdded={handleVehicleAdded} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
